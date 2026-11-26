import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

function grimoireDirectoryRedirect(): Plugin {
  return {
    name: 'grimoire-directory-redirect',
    configureServer(server) {
      server.middlewares.use(redirect)
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirect)
    },
  }
}

const redirect: import('vite').Connect.NextHandleFunction = (request, response, next) => {
  const location = new URL(request.url ?? '/', 'http://localhost')
  if (location.pathname !== '/grimorio-3d') {
    next()
    return
  }

  response.writeHead(307, { Location: `/grimorio-3d/${location.search}` })
  response.end()
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), grimoireDirectoryRedirect()],
  build: {
    rolldownOptions: {
      input: {
        portfolio: fileURLToPath(new URL('./index.html', import.meta.url)),
        grimoirePrototype: fileURLToPath(new URL('./grimoire-prototype.html', import.meta.url)),
        grimoireStageC: fileURLToPath(new URL('./grimorio-3d/index.html', import.meta.url)),
      },
    },
  },
})
