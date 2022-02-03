import './index.css'

const Profile = props => {
  const {name, profileImageUrl, shortBio} = props
  return (
    <>
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
      <hr />
    </>
  )
}

export default Profile
