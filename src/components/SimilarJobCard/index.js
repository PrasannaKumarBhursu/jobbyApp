import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {CgShoppingBag} from 'react-icons/cg'

import './index.css'

const SimilarJobCard = props => {
  const {eachJob} = props
  const {
    title,
    companyLogoUrl,
    id,
    jobDescription,
    location,
    employmentType,
  } = eachJob

  return (
    <li key={id}>
      <div>
        <img src={companyLogoUrl} alt="job details company logo" />
        <div>
          <p>{title}</p>
          <div>
            <AiFillStar />
            <p>rating</p>
          </div>
        </div>
      </div>
      <p>Description</p>
      <p>{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobCard
