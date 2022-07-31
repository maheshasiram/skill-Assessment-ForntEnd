import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from "react";
import Configuration from "../Configuration/Configuration";
import Categories from "../Categories/Categoies";
import AlertDialog from "../../ReuseComponents/Dialogs/AlertDialog";
import UserManagement from "../UserManagement/UserManagement";
import ProfileHeader from "./ApplicationHeader";
import CustomTooltip from "../../ReuseComponents/CustomTooltip/CustomTooltip";
import Loader from "../../ReuseComponents/Loader/Loader";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DashBoard from "../DashBoard/DashBoard";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

function SideNavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('User Management');

  const handleDrawerOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const onTabClick = (e, tab) => {
    setActiveTab(tab)
  };

  return (
    <div className="sideNavBar">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <CustomTooltip title={!open ? 'Expand' : 'Close'}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5
                }}
              >
                {!open ? <MenuIcon /> : <CloseOutlinedIcon />}
              </IconButton>
            </CustomTooltip>
            <Typography variant="h6" noWrap component="div" sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}>
              Skill Assissment
            </Typography>
            <Box sx={{ justifyContent: 'end' }}>
              <ProfileHeader />
            </Box>

          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent" open={open} >
          <DrawerHeader>
          </DrawerHeader>
          <Divider />
          <List>
            {["DashBoard", "Categories", "Configuration", "User Management"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }} className={text === activeTab ? activeTab : ''}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                  }}
                  onClick={(e) => onTabClick(e, text)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center"
                    }}
                  >
                    {text === 'User Management' ? <PersonIcon /> : text === 'DashBoard' ? <DashboardIcon /> : text === 'Categories' ? <CategoryIcon /> : <SettingsSuggestIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AlertDialog />
          <Loader />
          <DrawerHeader />
          <div className="content">
            {activeTab === 'User Management' && <UserManagement />}
            {activeTab === 'Configuration' && <Configuration />}
            {activeTab === 'Categories' && <Categories />}
            {activeTab === 'DashBoard' && <DashBoard />}
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default SideNavBar;
