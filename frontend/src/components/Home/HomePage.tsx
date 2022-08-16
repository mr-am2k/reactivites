import { Link } from 'react-router-dom'
import classes from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={classes.homeContainer}>
        <h1>Home page</h1>
        <h3>Go to <Link to='/activities'>Activities</Link></h3>
    </div>
  )
}

export default HomePage