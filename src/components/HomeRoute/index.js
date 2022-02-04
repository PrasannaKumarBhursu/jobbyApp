import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'
import JobbyHeader from '../JobbyHeader'

class HomeRoute extends Component {
  render() {
    return (
      <div>
        <JobbyHeader hideSpinner={this.hideSpinner} />
        <div className="home_route_container">
          <div className="p-4 homeroute__card" style={{color: 'white'}}>
            <h1 className="homeroute__title mt-3">
              Find The job That Fits Your Life
            </h1>
            <p className=" mt-3">
              Millions of people are searching for jobs,salary informations,
              company reviews.Find the job that fits your abilities and
              potential
            </p>
            <Link to="/jobs">
              <button type="button" className="mt-3">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default HomeRoute
