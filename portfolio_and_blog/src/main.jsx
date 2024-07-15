import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true

const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)

root.render(<App/>)
