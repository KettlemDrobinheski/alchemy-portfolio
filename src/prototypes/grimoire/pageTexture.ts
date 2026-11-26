import { CanvasTexture, SRGBColorSpace } from 'three'


export const LEAF_WIDTH = 1.84
export const LEAF_LENGTH = 2.43

export function createPageTexture(title?: string, pageNumber?: number) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 672
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const paper = ctx.createRadialGradient(256, 300, 80, 256, 336, 420)
    paper.addColorStop(0, '#f3dfb6')
    paper.addColorStop(1, '#ba8550')
    ctx.fillStyle = paper
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#985a36'
    ctx.lineWidth = 2
    ctx.strokeRect(28, 28, 456, 616)

    if (title) {
      ctx.fillStyle = '#3b1a39'
      ctx.font = 'bold 39px Georgia, serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(title, 256, 317, 406)
      ctx.fillStyle = '#713a59'
      ctx.font = '23px Georgia, serif'
      ctx.fillText(String(pageNumber), 256, 603)
    }
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}
