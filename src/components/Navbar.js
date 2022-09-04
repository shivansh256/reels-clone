import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {createUseStyles} from 'react-jss';
import insta from '../Assets/Instagram_logo.svg.png';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';



export default function Navbar({userData}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate=useNavigate();
  const {logout}=React.useContext(AuthContext);
  

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

//   const useStyles=createUseStyles({
//     aapb:{
//         color:'pink'
//     }
// })
//   const classes=useStyles();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile=()=>{
    navigate(`/Profile/${userData.userId}`, { replace: true });
      //  navigate.push(`/Profile/${userData.uid}`)
  }

  const handleLogout=async()=>{
    await logout();
    navigate("/login", { replace: true });
  }

  const handleBannerClick=()=>{
    navigate("/login", { replace: true });
  }

  const handleExplore=()=>{
      let win=window.open('https://www.intagram.com/','_blank');
      win.focus();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircleIcon/>&nbsp;&nbsp;Profile</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon/>&nbsp;&nbsp;Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircleIcon/>&nbsp;&nbsp;Profile</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon/>&nbsp;&nbsp;Logout</MenuItem> 
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{background:'white'}}>
        <Toolbar>
          <div style={{marginLeft:'4%'}}>
            <img src={insta} style={{width:'20vh',height:'75%'}} onClick={handleBannerClick}/>
          </div>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' },alignItems:'center' ,color:'black',marginRight:'4rem' }}>
            <HomeIcon onClick={handleBannerClick} sx={{marginRight:'1.5rem',cursor:'pointer'}}/>
            <ExploreIcon onClick={handleExplore} sx={{marginRight:'1rem',cursor:'pointer'}}/>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={userData.profileUrl} sx={{width:'2rem',height:'2rem'}}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}