import { useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import classes from './Navbar.module.css'


const Navbar = () => {
    const [mobileLinks, setMobileLinks] = useState(false)
    const menuHandler = () => {
        setMobileLinks((prevState) => { return !prevState })
    }
    const closeMenu = () => {
        setMobileLinks(false)
    }
    return (
        <div className={classes.navbarContainer}>
            <div className={classes.navbarContent}>
                <GroupsIcon sx={{ fontSize: "2.2rem" }} />
                <div className={classes.navbarDesktopLinks}>
                    <a href='#home'> Reactivities </a>
                    <a href='#activities'> Activities </a>
                    <button>Create Activity</button>
                </div>
                <div className={classes.navbarMobileContainer}>
                    <button className={classes.menuButton} onClick={menuHandler}>Menu</button>
                    {
                        mobileLinks && (
                            <div className={classes.navbarMobileLinks}>
                                <a href='#home' onClick={closeMenu}> Reactivities </a>
                                <a href='#activities' onClick={closeMenu} > Activities </a>
                                <button className={classes.activityMobileButton} onClick={closeMenu}>Create Activity</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar