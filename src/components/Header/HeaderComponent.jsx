import React, { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { numInArray } from "../../ultis/ultis";
import Cookies from "js-cookie";
import axios from "axios";
import { logoutApi } from "../../config/API";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../config/token";
import { toast } from "react-toastify";
import { toastCss } from "../StyleComponent/StyleCompoent";

const pages = [
    {
        title: 'Admin',
        href: '/admin/questions'
    },
    {
        title: 'Go to play',
        href: '/play'
    }
];
// const settings = ['Profile', 'Account', 'Logout'];


const HeaderComponent = () => {
    const userRoles = useSelector(state => state.user.user?.roles)
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const title = 'QuizzApp'
    const user = useSelector(state => state.user.user)
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
    const handleNavigate = (url) => {
        navigate(url)
    }
    const settings = [
        {
            label: 'Profile',
            onClick: () => {
                console.log('Profile')
            }
        },
        {
            label: 'Logout',
            onClick: async () => {
                try {
                    const res = await axios.post(logoutApi, {
                        "refresh_token": Cookies.get(REFRESH_TOKEN_KEY)
                    })
                    toast.success(res.data.message, toastCss)
                    Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' })
                    Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' })
                    localStorage.clear()
                    navigate('/login')
                } catch (error) {
                }
            }
        }
    ]
    return (
        <>
            <AppBar position="static" style={{backgroundColor : '#001529'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {title}
                        </Typography> */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
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
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {numInArray('admin', userRoles) && pages.map((page) => (
                                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={() => { handleNavigate(page.href) }}>{page.title}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {title}
                        </Typography> */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {numInArray('admin', userRoles) && pages.map((page) => (
                                // <Button
                                //     key={page.title}
                                //     onClick={() => {
                                //         handleCloseNavMenu()
                                //         handleNavigate(page.href)
                                //     }}
                                //     sx={{ my: 2, color: 'white', display: 'block' }}
                                // >
                                //     {page.title}
                                // </Button>
                                <NavLink to={page.href} key={page.title} style={{minHeight : '64px', display : 'flex', alignItems : 'center', padding : '0 20px', fontWeight : '500px'}}>{page.title}</NavLink>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={user.avatar_link} />
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
                                {settings.map((setting, index) => (
                                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={setting.onClick}>{setting.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default HeaderComponent