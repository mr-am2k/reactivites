import classes from './NotFound.module.css'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className = {classes.notFoundContainer}>
        <FaSearch className={classes.notFoundIcon}/>
        <h1>Oops - we've looked everywhere and could not find this.</h1>
        <Link to='/activities'><button>Return to activities page</button></Link>
    </div>
  )
}

export default NotFound