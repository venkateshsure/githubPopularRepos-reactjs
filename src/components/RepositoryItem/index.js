// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {each} = props
  const {name, forksCount, starsCount, issuesCount, avatarUrl} = each
  return (
    <li className="list-repo-item">
      <img className="image-repo-item" src={avatarUrl} alt={name} />
      <h1>{name}</h1>
      <div className="head">
        <div className="body">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="body">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="body">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
