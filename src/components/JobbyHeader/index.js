import {Component} from 'react'
import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

class JobbyHeader extends Component {
  redirectTologin = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')

    console.log("it's")
    history.replace('/login')
  }

  render() {
    return (
      <nav>
        <div className="ml-3">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="image"
            />
          </Link>
        </div>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/jobs">
            <li>Jobs</li>
          </Link>
          <li>
            <button type="button" onClick={this.redirectTologin}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(JobbyHeader)
