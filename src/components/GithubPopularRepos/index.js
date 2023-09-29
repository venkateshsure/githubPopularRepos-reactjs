import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    getData: [],
    selectedLanguage: languageFiltersData[0].id,
    selectedApi: apiConstants.inProgress,
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {selectedLanguage} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${selectedLanguage}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const camelCaseData = {popularRepos: data.popular_repos}
      const getCamelCaseData = camelCaseData.popularRepos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      // console.log(getCamelCaseData)
      this.setState({
        getData: getCamelCaseData,
        selectedApi: apiConstants.success,
      })
    } else {
      this.setState({selectedApi: apiConstants.failure})
    }
  }

  clickLang = value => {
    this.setState({selectedLanguage: value}, this.getData)
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepository = () => {
    const {getData} = this.state
    return (
      <ul className="ul-repository-item">
        {getData.map(each => (
          <RepositoryItem each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLanguageFilter = () => {
    const {selectedLanguage} = this.state
    return (
      <ul className="ul-con">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            isClick={each.id === selectedLanguage}
            clickLang={this.clickLang}
            each={each}
            key={each.id}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  filterList = () => {
    const {selectedApi} = this.state
    switch (selectedApi) {
      case apiConstants.success:
        return this.renderRepository()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="con">
        <div className="responsive-container">
          <h1>Popular Repos</h1>
          {this.renderLanguageFilter()}
          {this.filterList()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
