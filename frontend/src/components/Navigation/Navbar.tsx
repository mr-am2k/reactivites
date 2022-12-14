import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import classes from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
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
          <NavLink to='/errors'>Errors</NavLink>
          <button
            onClick={() => {
              navigate('/createactivity');
            }}
          >
            Create Activity
          </button>
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
              <NavLink to='/errors'>Errors</NavLink>
              <NavLink to='/createActivity'>
                <button
                  onClick={closeMenu}
                  className={classes.activityMobileButton}
                >
                  Create Activity
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
