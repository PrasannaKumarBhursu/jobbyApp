import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {CgShoppingBag} from 'react-icons/cg'
import {FiExternalLink} from 'react-icons/fi'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import SimilarJobCard from '../SimilarJobCard'
import JobbyHeader from '../JobbyHeader'

import './index.css'

const jobApiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPRORESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetailsRoute extends Component {
  state = {
    jobDetailsList: [],
    apiStatus: jobApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: jobApiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      let formattedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }

      let {jobDetails, similarJobs} = formattedData
      jobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
      }

      let {lifeAtCompany, skills} = jobDetails

      lifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      skills = skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      jobDetails = {...jobDetails, lifeAtCompany, skills}

      similarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      formattedData = {
        jobDetails,
        similarJobs,
      }

      this.setState({
        jobDetailsList: formattedData,
        apiStatus: jobApiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: jobApiStatusConstants.failure,
      })
    }
  }

  renderSkill = eachSkill => {
    const {imageUrl, name} = eachSkill
    return (
      <li key={name}>
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </li>
    )
  }

  renderCompanyDescription = () => {
    const {jobDetailsList} = this.state
    const {jobDetails, similarJobs} = jobDetailsList
    console.log(jobDetails)

    const {
      companyLogoUrl,
      title,
      location,
      employmentType,
      packagePerAnnum,
      rating,
      companyWebsiteUrl,
      lifeAtCompany,
      jobDescription,
      skills,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div>
        <div>
          <img src={companyLogoUrl} alt="job details company logo" />
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
        <div>
          <h1>Description</h1>
          <div>
            <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
              Visit
              <FiExternalLink />
            </a>
          </div>
        </div>
        <p>{jobDescription}</p>
        <div>
          <h1>Skills</h1>
          <ul>{skills.map(eachSkill => this.renderSkill(eachSkill))}</ul>
        </div>
        <div>
          <h1>Life at Company</h1>
          <p>{description}</p>
          <img src={imageUrl} alt="life at company" />
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(eachJob => (
              <SimilarJobCard key={eachJob.id} eachJob={eachJob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobItemDetails()
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

  renderJobDetailsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobApiStatusConstants.success:
        return this.renderCompanyDescription()
      case jobApiStatusConstants.inprogress:
        return this.renderLoadingView()
      case jobApiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <JobbyHeader />
        {this.renderJobDetailsPage()}
      </div>
    )
  }
}

export default JobItemDetailsRoute
