import type { FC } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon } from "../icons/menu";
import { Logo } from "./logo";
import { useAuth } from "src/hooks/use-auth";

interface MainNavbarProps {
  onOpenSidebar?: () => void;
}

export const MainNavbar: FC<MainNavbarProps> = (props) => {
  const { onOpenSidebar } = props;
  const { user } = useAuth();

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottomColor: "divider",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        color: "text.secondary",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <NextLink href="/" passHref>
            <a>
              <Logo
                sx={{
                  display: {
                    md: "inline",
                    xs: "none",
                  },
                  height: 40,
                  width: 40,
                }}
              />
            </a>
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            onClick={onOpenSidebar}
            sx={{
              display: {
                md: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              alignItems: "center",
              display: {
                md: "flex",
                xs: "none",
              },
            }}
          >
            {user?._id && (
              <>
                <Button
                  component="a"
                  size="medium"
                  sx={{ ml: 2 }}
                  target="_blank"
                  variant="contained"
                >
                  <NextLink href="/dashboard/properties/new" passHref>
                    <Link color="white" underline="none" variant="subtitle2">
                      Add new property
                    </Link>
                  </NextLink>
                </Button>
                <NextLink href="/dashboard" passHref>
                  <Link
                    color="textSecondary"
                    underline="none"
                    variant="subtitle2"
                    style={{ marginRight: 10, marginLeft: 10 }}
                  >
                    Dashboard
                  </Link>
                </NextLink>
              </>
            )}
            {!user?._id && (
              <NextLink href="/dashboard" passHref>
                <Link
                  color="textSecondary"
                  underline="none"
                  variant="subtitle2"
                  style={{ marginRight: 10, marginLeft: 10 }}
                >
                  Login
                </Link>
              </NextLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
