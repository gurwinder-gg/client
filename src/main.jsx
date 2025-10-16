import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="13687229528-o6ffumhe0nv3ga7bn38kl8gmj33f4f6c.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
  </StrictMode>,
)
