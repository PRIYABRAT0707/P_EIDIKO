import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalButton } from '../stylecomponent/GlobalButton';

//logout

import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import { ListItemButton, ListItemIcon, ListItemText, Modal } from '@mui/material';
import SideNavBar from './SideNavBar';
import userServiceModule from '../../Services/user-service/UserService';

//socialButton
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GoogleIcon from '@mui/icons-material/Google';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages=['Home','Service','About'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //LogOut
  const navigate = useNavigate()
  const logoutHandle = () => {
    sessionStorage.clear()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logout successfully completed ! Redirecting to Login page...',
        showConfirmButton: false,
        timer: 1500
      })
    navigate("/login")}

  //   const [nav,setNav]= React.useState(false);
  //   const handleNavOpen =() => setNav(true);
  //   const handleNavClose = () => setNav(false);

  //   const pages = [<Modal
  //     open={setNav}
  //     aria-labelledby="parent-modal-title"
  //      aria-describedby="parent-modal-description" >
  //     <SideNavBar onClose={()=>{setNav(false)}}/>
  //     </Modal>];
  const navigate1=useNavigate()

//socialButtons
const [value, setValue] = React.useState('recents');

const handleChange = (event, newValue) => {
  setValue(newValue);
};
//

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            EIDIKO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              // onClick={handleNavOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              // onClose={handleNavClose}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}

                {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleNavClose}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            EIDIKO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
      {/* {pages.map((page)=>(
            <Button key={page} size="small" onClick={handleNavOpen} 
            sx={{ my: 2, color: 'white', display: 'block'}}>
                {page}
            </Button>))} */}
            
           
          </Box>
          {/* social buttons */}

          {/* <Stack  direction="row" spacing={2}>
          <BottomNavigation sx={{backgroundColor:"transparent",}} value={value} onChange={handleChange}>
          <BottomNavigationAction
            sx={{":hover": {
            color: "whitesmoke"
            }}}
              label="EidikoMail"
              value="eidikomail"
              icon={<MailOutlineIcon />}
              target='_blank'
              
              component={Link} to='https://webmail.eidiko-india.com/'
            />
          </BottomNavigation>
          </Stack> */}



          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          <Stack  direction="row" spacing={2}>
         {userServiceModule.isLogedin() &&  <Button sx={{borderRadius:"40px"}} type='submit' 
          variant="contained"
          endIcon={<LogoutIcon />} onClick={logoutHandle} >
            Logout
          </Button>
         }
         
          {
            !userServiceModule.isLogedin() && <Button sx={{borderRadius:"40px"}} onClick={()=>{navigate1("/login")}} type='submit'
            variant="contained"
            endIcon={<LogoutIcon />} >
              Login
            </Button>
          }
         </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;