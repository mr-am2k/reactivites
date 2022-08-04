import { useState } from 'react';
import { AppBar, Container, Toolbar, MenuItem, Typography, Button, Menu } from "@mui/material"
import GroupsIcon from '@mui/icons-material/Groups';
import classes from './Navbar.module.css'

const MenuItems = (props) => (
    <Container className={props.navbarLinks}>
        <MenuItem className={props.navbarLink} >
            <Typography variant='h6'>Reactivites</Typography>
        </MenuItem>
        <MenuItem className={props.navbarLink}>
            <Typography variant='h6'>Activities</Typography>
        </MenuItem>
        <MenuItem className={props.navbarButton} >
            <Button className={props.navbarButtonText}>Create Activity</Button>
        </MenuItem>
    </Container>
)

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='static'>
            <Container className={classes.navbarContainer}>
                <Toolbar disableGutters className={classes.navbarToolbar}>
                    <GroupsIcon />
                    <div className={classes.menuDesktop}>
                        <MenuItems navbarLinks={classes.navbarLinks} navbarLink={classes.navbarLink} navbarButton={classes.navbarButton} navbarButtonText={classes.navbarButtonText} />
                    </div>
                    <div className={classes.menuMobile}>
                        <Button
                            className={classes.menuButton}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Menu
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItems navbarLinks={classes.navbarMobileLinks} navbarLink={classes.navbarMobileLink} navbarButton={classes.navbarMobileButton} navbarButtonText={classes.navbarMobileButtonText} />
                        </Menu>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar