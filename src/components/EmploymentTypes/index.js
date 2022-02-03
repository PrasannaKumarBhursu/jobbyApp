import './index.css'

const EmploymentTypes = props => {
  const {eachEmployment, changeEmployment} = props
  const {label, employmentTypeId} = eachEmployment

  const onChangeEmployment = () => {
    changeEmployment(employmentTypeId)
  }

  return (
    <li>
      <input
        id={employmentTypeId}
        type="checkbox"
        onChange={onChangeEmployment}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmploymentTypes
