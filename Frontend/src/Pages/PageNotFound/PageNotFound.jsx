import React from 'react'
import './PageNotFound.css'

function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="not-found-icon">
        <i className="fas fa-exclamation-triangle"/>
      </div>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-message">The page you are looking for does not exist. Please check the URL or try again later.</p>
    </div>
  )
}

export default PageNotFound