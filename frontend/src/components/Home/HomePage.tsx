import { Link } from 'react-router-dom';
import classes from './HomePage.module.css';
import logo from '../../assets/logo.png';

const HomePage = () => {
  return (
    <div className={classes.homeContainer}>
      <div className={classes.header}>
        <img src={logo} alt='logo' />
        <h1>Reactivities</h1>
      </div>
      <div className={classes.navigation}>
        <h3>Welcome to Reactivities</h3>
        <Link to='/activities'>
          <button>Take me to the Activities</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
