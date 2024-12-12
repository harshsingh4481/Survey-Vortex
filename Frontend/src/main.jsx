import React from 'react'
import ReactDOM from 'react-dom/client'
import DataProvider from './Component/Context/DataProvider.jsx'
import App from './App.jsx'
// import './index.css'
import 'react-bootstrap'
import 'react-bootstrap/dist/react-bootstrap.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'cdbootstrap'


ReactDOM.createRoot(document.getElementById('root')).render(

    <DataProvider>
    <App />
    </DataProvider>
 
)
