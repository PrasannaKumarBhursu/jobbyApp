import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {CgShoppingBag} from 'react-icons/cg'
import {BiSearch} from 'react-icons/bi'

import Profile from '../Profile'
import EmploymentTypes from '../EmploymentTypes'
import SalaryRanges from '../SalaryRanges'

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

class JobsRoute extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    employmentTypes: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
    this.getProfileDetails()
  }

  getJobDetails = async () => {
    const {employmentTypes, salaryRange, searchInput} = this.state
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

      this.setState({jobsList: formattedData})
    }
  }

  getProfileDetails = async () => {
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
    const updatedProfileDetails = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    this.setState({profileDetails: updatedProfileDetails})
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
      <h1>Employment Types</h1>
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
        <BiSearch />
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state
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
            <li key={id}>
              <div>
                <img src={companyLogoUrl} alt="company logo" />
                <div>
                  <p>{title}</p>
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
              <p>{jobDescription}</p>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <div>
          {this.renderProfileComponent()}
          {this.renderEmploymentTypes()}
          {this.renderSalaryRangesTypes()}
        </div>
        <div>
          {this.renderSearchinput()}
          {this.renderJobsList()}
        </div>
      </div>
    )
  }
}

export default JobsRoute
