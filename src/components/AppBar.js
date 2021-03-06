import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import ExploreRoundedIcon from "@material-ui/icons/ExploreRounded";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";
import { fade, InputBase, Tooltip } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
const useStyles = makeStyles((theme) => ({
  logo: {
    textDecoration: "none",
    color: red[500],
  },
  icons: {
    textDecoration: "none",
    color: "#000",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function PrimarySearchBar({ props }) {
  const classes = useStyles();
  const location = useLocation().pathname;

  let searchValue, setSearchValue;
  if (location === "/") {
    searchValue = props.searchValue;
    setSearchValue = props.setSearchValue;
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { currentUser, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const history = useHistory();
  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Error logging out");
    }
  }

  function handleProfile() {
    history.push("/profile");
  }

  function badgeChanges() {
    db.collection("userData")
      .doc(currentUser.email)
      .onSnapshot((snapshot) => {
        setCartCount(snapshot.data().cart.length);
        setFavCount(snapshot.data().favorites.length);
      });
  }

  useEffect(() => {
    badgeChanges();
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const handleHome = () => {
    history.push("/");
  };
  const handleExplore = () => {
    history.push("/explore");
  };
  const handleFavorites = () => {
    history.push("/favorites");
  };
  const handleCart = () => {
    history.push("/cart");
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleHome}>
        <IconButton color="inherit">
          {location === "/" ? <HomeRoundedIcon /> : <HomeOutlinedIcon />}
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleExplore}>
        <IconButton color="inherit">
          {location === "/explore" ? (
            <ExploreRoundedIcon />
          ) : (
            <ExploreOutlinedIcon />
          )}
        </IconButton>
        <p>Explore</p>
      </MenuItem>
      <MenuItem onClick={handleFavorites}>
        <IconButton color="inherit">
          <Badge badgeContent={favCount} color="secondary">
            {location === "/favorites" ? (
              <FavoriteRoundedIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>
      <MenuItem onClick={handleCart}>
        <IconButton color="inherit">
          <Badge badgeContent={cartCount} color="secondary">
            {location === "/cart" ? (
              <ShoppingCartRoundedIcon />
            ) : (
              <ShoppingCartOutlinedIcon />
            )}
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfile}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} style={{ marginBottom: 80 }}>
      <AppBar position="fixed" color="inherit" elevation={1}>
        <Toolbar>
          <Link to="/" className={classes.icons}>
            {/* <img
              style={{ width: 150 }}
              src="https://firebasestorage.googleapis.com/v0/b/tomato-30cb2.appspot.com/o/logo.png?alt=media&token=3fe3fe56-1e60-4b05-9d97-f83d3dbb3b65"
            /> */}
            <h1 style={{ color: "#f00", fontFamily: "Work Sans" }}>tomato</h1>
          </Link>
          <div className={classes.grow} />
          {location === "/" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search???"
                value={searchValue}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(event) => setSearchValue(event.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          )}
          <div className={classes.sectionDesktop}>
            <Link to="/" className={classes.icons}>
              <Tooltip title="Home">
                <IconButton color="inherit">
                  {location === "/" ? (
                    <HomeRoundedIcon />
                  ) : (
                    <HomeOutlinedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/explore" className={classes.icons}>
              <Tooltip title="Explore">
                <IconButton color="inherit">
                  {location === "/explore" ? (
                    <ExploreRoundedIcon />
                  ) : (
                    <ExploreOutlinedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/favorites" className={classes.icons}>
              <Tooltip title="Favorites">
                <IconButton color="inherit">
                  <Badge badgeContent={favCount} color="secondary">
                    {location === "/favorites" ? (
                      <FavoriteRoundedIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/cart" className={classes.icons}>
              <Tooltip title="Cart">
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={cartCount} color="secondary">
                    {location === "/cart" ? (
                      <ShoppingCartRoundedIcon />
                    ) : (
                      <ShoppingCartOutlinedIcon />
                    )}
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/orders" className={classes.icons}>
              <Tooltip title="Order history">
                <IconButton color="inherit">
                  {location === "/orders" ? (
                    <DashboardRoundedIcon />
                  ) : (
                    <DashboardOutlinedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Link>
            {/* <Link to="/add" className={classes.icons}>
              <IconButton color="inherit">
                {location === "/add" ? (
                  <AddBoxRoundedIcon />
                ) : (
                  <AddBoxOutlinedIcon />
                )}
              </IconButton>
            </Link> */}
            <Tooltip title="Profile">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
