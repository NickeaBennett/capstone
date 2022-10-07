import {
  AddBox,
  Home,
  InsertEmoticon,
  Search,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
// import Profile from "../profile/Profile";

function SideBar() {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/explore">
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Explore" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/me">
            <ListItemIcon>
              <InsertEmoticon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/new">
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Project" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/me/edit">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default SideBar;
