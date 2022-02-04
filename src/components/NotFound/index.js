import {Component} from 'react'

import JobbyHeader from '../JobbyHeader'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div>
        <JobbyHeader />
        <div className="notfound__container d-flex flex-column justify-content-center align-items-center">
          <img
            src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
            alt="not found"
          />
          <div className="p-4">
            <h1>Page Not Found</h1>
            <p>we're sorry, the page you requested could not be found</p>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound
