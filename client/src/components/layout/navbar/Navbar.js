import * as React from "react";
import { Link } from 'react-router-dom'
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { To, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store";
import { AppBar, styled, Toolbar } from "@mui/material";
import { Home } from "@mui/icons-material";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
})

function Navbar({ user, setUser }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

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

    function handleNavigate(route, event) {
        event === null || event === void 0 ? void 0 : event.preventDefault();
        navigate(route);
    }

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        })
        handleCloseUserMenu();
        navigate("/logout");
    }

    function handleUpdateProfileAccount(event) {
        event === null || event === void 0 ? void 0 : event.preventDefault();
        handleCloseUserMenu();
        navigate("/update-profile");
    }


    // let sessionLinks;
    // if (user.username) {
    //     sessionLinks = (
    //         <Box sx={{ flexGrow: 0 }}>
    //             <Box sx={{ display: "flex" }}>
    //                 <Typography marginRight={2} marginTop={1} textAlign="center" sx={{ display: { xs: "none", sm: "flex" } }}>
    //                     {user?.username}
    //                 </Typography>
    //                 <Tooltip title="Open settings">
    //                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //                         <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
    //                     </IconButton>
    //                 </Tooltip>
    //             </Box>
    //             <Menu
    //                 sx={{ mt: "45px" }}
    //                 id="menu-appbar"
    //                 anchorEl={anchorElUser}
    //                 anchorOrigin={{
    //                     vertical: "top",
    //                     horizontal: "right",
    //                 }}
    //                 keepMounted
    //                 transformOrigin={{
    //                     vertical: "top",
    //                     horizontal: "right",
    //                 }}
    //                 open={Boolean(anchorElUser)}
    //                 onClose={handleCloseUserMenu}
    //             >
    //                 <MenuItem onClick={(event) => handleUpdateProfileAccount(event)}>
    //                     <Typography textAlign="center">Update Profile</Typography>
    //                 </MenuItem>
    //                 <MenuItem onClick={(event) => handleLogout(event)}>
    //                     <Typography textAlign="center">Logout</Typography>
    //                 </MenuItem>
    //             </Menu>
    //         </Box>
    //     );
    // } else if (!user.username && !loading) {
    //     sessionLinks = (
    //         <>
    //             <Button
    //                 onClick={(event) => handleNavigate("/signup", event)}
    //                 sx={{ my: 2, color: "white", display: "block" }}
    //             >
    //                 Create Account
    //             </Button>
    //             <Button
    //                 onClick={(event) => handleNavigate("/login", event)}
    //                 sx={{ my: 2, color: "white", display: "block" }}
    //             >
    //                 Login
    //             </Button>
    //         </>
    //     );
    // }

    return (
        <AppBar position="sticky">
            <StyledToolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
                >
                    ViralNFT.art
                </Typography>

                <Box>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        sx={{ display: { xs: "block", sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", sm: "none" },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}
                >
                    ViralNFT.art
                </Typography>
                <Home />
                <Box sx={{ flexGrow: 1, display: { xs: "block", md: "flex" } }}>
                    <Button
                        onClick={(event) => handleNavigate("/", event)}
                        sx={{ my: 2, color: "white", display: "block" }}
                    >
                        Home
                    </Button>
                </Box>
                {/* {sessionLinks} */}
            </StyledToolbar>
        </AppBar >
        // <>
        //     <nav>
        //         <div className='div-header'>
        //             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        //                 <Link to="/new" className='btn'>
        //                     New Post
        //                 </Link>
        //                 <h2>ViralNFT.art {user.username}</h2>
        //             </div>
        //             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        //                 <Link to="/posts" className='btn'>
        //                     Main Feed
        //                 </Link>
        //                 <Link to="/me" className='btn'>
        //                     User Profile
        //                 </Link>
        //                 <button onClick={handleLogout} className='btn'>
        //                     Logout
        //                 </button>
        //             </div>
        //         </div>
        //     </nav>
        // </>
    )
}

export default Navbar;
