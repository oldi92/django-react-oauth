import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export const TopNavigation = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
