import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import classes from './Navbar.module.css';

const Navbar = () => {
  const [mobileLinks, setMobileLinks] = useState(false);
  const menuHandler = () => {
    setMobileLinks((prevState) => {
      return !prevState;
    });
  };
  const closeMenu = () => {
    setMobileLinks(false);
  };
  return (
    <div className={classes.navbarContainer}>
      <div className={classes.navbarContent}>
        <GroupsIcon sx={{ fontSize: '2.2rem' }} />
        <div className={classes.navbarDesktopLinks}>
          <NavLink to='/'>Reactivities</NavLink>
          <NavLink to='/activities'>Activities</NavLink>
          <NavLink to='/createActivity'>
            <button>Create Activity</button>
          </NavLink>
        </div>
        <div className={classes.navbarMobileContainer}>
          <button className={classes.menuButton} onClick={menuHandler}>
            Menu
          </button>
          {mobileLinks && (
            <div className={classes.navbarMobileLinks}>
              <NavLink to='/' onClick={closeMenu}>
                Reactivities
              </NavLink>
              <NavLink to='/activities' onClick={closeMenu}>
                Activities
              </NavLink>
              <NavLink to='/createActivity'>
                <button onClick={closeMenu} className={classes.activityMobileButton}>Create Activity</button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
