// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {each, clickLang, isClick} = props
  const {id, language} = each
  const style = isClick ? 'button' : 'style-button'

  const clickButton = () => {
    clickLang(id)
  }
  return (
    <li className="list-con">
      <button onClick={clickButton} className={`${style}`} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
