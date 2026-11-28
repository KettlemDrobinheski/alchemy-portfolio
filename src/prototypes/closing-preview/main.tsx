import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../styles/global.css'
import { ClosingPreview } from './ClosingPreview'
import './preview.css'

createRoot(document.getElementById('root')!).render(<StrictMode><ClosingPreview /></StrictMode>)
