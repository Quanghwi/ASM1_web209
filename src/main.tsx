// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ProductProvider from './component/Context/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProductProvider>
    <App />
  </ProductProvider>
)
