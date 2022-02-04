import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {CgShoppingBag} from 'react-icons/cg'
import {BiSearch} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Profile from '../Profile'
import EmploymentTypes from '../EmploymentTypes'
import SalaryRanges from '../SalaryRanges'
import JobbyHeader from '../JobbyHeader'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobApiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPRORESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    employmentTypes: [],
    salaryRange: '',
    searchInput: '',
    apiStatus: jobApiStatusConstants.initial,
    profileApiStatus: jobApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
    this.getProfileDetails()
  }

  getJobDetails = async () => {
    const {employmentTypes, salaryRange, searchInput} = this.state
    this.setState({apiStatus: jobApiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    console.log('trigger')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {jobs} = data
      const formattedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(formattedData)

      this.setState({
        jobsList: formattedData,
        apiStatus: jobApiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: jobApiStatusConstants.failure,
      })
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: jobApiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const profileDetails = data.profile_details
    if (response.ok === true) {
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileDetails,
        profileApiStatus: jobApiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: jobApiStatusConstants.failure,
      })
    }
  }

  renderProfileComponent = () => {
    const {profileDetails} = this.state
    return <Profile {...profileDetails} />
  }

  changeEmployment = employmentId => {
    const {employmentTypes} = this.state

    if (employmentTypes.includes(employmentId)) {
      const updatedEmploymentTypes = employmentTypes.filter(
        eachEmployment => eachEmployment !== employmentId,
      )
      this.setState(
        {employmentTypes: updatedEmploymentTypes},
        this.getJobDetails,
      )
    } else {
      employmentTypes.push(employmentId)
      this.setState({employmentTypes: [...employmentTypes]}, this.getJobDetails)
    }
  }

  renderEmploymentTypes = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul>
        {employmentTypesList.map(eachEmployment => (
          <EmploymentTypes
            key={eachEmployment.employmentTypeId}
            eachEmployment={eachEmployment}
            changeEmployment={this.changeEmployment}
          />
        ))}
      </ul>
      <hr />
    </div>
  )

  changeSalaryRange = salaryRangeId => {
    console.log(salaryRangeId)
    this.setState({salaryRange: salaryRangeId}, this.getJobDetails)
  }

  renderSalaryRangesTypes = () => {
    const {salaryRange} = this.state
    return (
      <div>
        <h1>Salary Ranges </h1>
        <ul>
          {salaryRangesList.map(eachSalary => (
            <SalaryRanges
              key={eachSalary.salaryRangeId}
              eachSalary={eachSalary}
              activeSalaryId={salaryRange}
              changeSalaryRange={this.changeSalaryRange}
            />
          ))}
        </ul>
      </div>
    )
  }

  changeSearchInput = event => {
    const inputValue = event.target.value
    this.setState({searchInput: inputValue})
  }

  onClickEnter = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  renderSearchinput = () => {
    const {searchInput} = this.state
    return (
      <div>
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          onKeyDown={this.onClickEnter}
          onChange={this.changeSearchInput}
        />

        <button
          testid="searchButton"
          type="button"
          onClick={this.getJobDetails}
        >
          {' '}
          <BiSearch />
        </button>
      </div>
    )
  }

  renderNojobsView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNojobsView()
    }
    return (
      <ul>
        {jobsList.map(eachJob => {
          const {
            companyLogoUrl,
            employmentType,
            id,
            jobDescription,
            location,
            packagePerAnnum,
            rating,
            title,
          } = eachJob

          return (
            <Link key={id} to={`jobs/${id}`}>
              <li>
                <div>
                  <img src={companyLogoUrl} alt="company logo" />
                  <div>
                    <h1>{title}</h1>
                    <div>
                      <AiFillStar />
                      <p>{rating}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <IoLocationOutline />
                      <p>{location}</p>
                    </div>
                    <div>
                      <CgShoppingBag />
                      <p>{employmentType}</p>
                    </div>
                  </div>
                  <p>{packagePerAnnum}</p>
                </div>
                <hr />
                <h1>Description</h1>
                <p>{jobDescription}</p>
              </li>
            </Link>
          )
        })}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobDetails()
  }

  onClickProfileRetry = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderProfileFailureView = () => (
    <button type="button" onClick={this.onClickProfileRetry}>
      Retry
    </button>
  )

  renderJobsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobApiStatusConstants.success:
        return this.renderJobsList()
      case jobApiStatusConstants.inprogress:
        return this.renderLoadingView()
      case jobApiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderProfilePage = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case jobApiStatusConstants.success:
        return this.renderProfileComponent()
      case jobApiStatusConstants.inprogress:
        return this.renderLoadingView()
      case jobApiStatusConstants.failure:
        return this.renderProfileFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <JobbyHeader />
        <div>
          {this.renderProfilePage()}
          {this.renderEmploymentTypes()}
          {this.renderSalaryRangesTypes()}
        </div>
        <div>
          {this.renderSearchinput()}
          {this.renderJobsPage()}
        </div>
      </div>
    )
  }
}

export default JobsRoute
