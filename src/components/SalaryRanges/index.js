import './index.css'

const SalaryRanges = props => {
  const {eachSalary, changeSalaryRange, activeSalaryId} = props

  const {salaryRangeId, label} = eachSalary
  const isChecked = salaryRangeId === activeSalaryId
  const onChangeSalaryRange = () => changeSalaryRange(salaryRangeId)

  return (
    <li>
      <input
        type="radio"
        id={salaryRangeId}
        onChange={onChangeSalaryRange}
        checked={isChecked}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRanges
