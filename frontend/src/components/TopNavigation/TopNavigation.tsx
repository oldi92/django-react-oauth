import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { useAuthentication } from "../../hooks";

export const TopNavigation = () => {
  const { user, logout, isLogoutLoading } = useAuthentication();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            flex={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Calendar</Typography>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleClick}>
                <AccountCircle />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Typography sx={{ p: "6px 16px" }}>
                  Hello, {user.email}
                </Typography>
                <Divider sx={{ m: "8px 0" }} />
                <MenuItem onClick={logout} disabled={isLogoutLoading}>
                  {isLogoutLoading ? "Loading..." : "Logout"}
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
