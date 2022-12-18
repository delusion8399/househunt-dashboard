import { useRef, useState, useEffect } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { AppBarProps } from "@mui/material";
import { Menu as MenuIcon } from "../../icons/menu";
import { AccountPopover } from "./account-popover";
import { ContentSearchDialog } from "./content-search-dialog";
import { NotificationsPopover } from "./notifications-popover";
import { LanguagePopover } from "./language-popover";
import { Bell as BellIcon } from "../../icons/bell";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { Search as SearchIcon } from "../../icons/search";
import { Users as UsersIcon } from "../../icons/users";
import { useAuth } from "src/hooks/use-auth";
import { useEntity } from "src/hooks/use-entity";
import environments from "src/environments";

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),
}));

const ContentSearchButton = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenSearchDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseSearchDialog = (): void => {
    setOpenDialog(false);
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton onClick={handleOpenSearchDialog} sx={{ ml: 1 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContentSearchDialog
        onClose={handleCloseSearchDialog}
        open={openDialog}
      />
    </>
  );
};

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { findOne, entity } = useEntity("user");
  const { user } = useAuth();

  const baseUrlForAvatar = `${environments.HOST}/public/images/`;

  useEffect(() => {
    findOne(user?._id);
  }, [user]);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          src={
            entity?.data?.avatar && `${baseUrlForAvatar}${entity?.data?.avatar}`
          }
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {/* <LanguageButton /> */}
          <ContentSearchButton />

          {/* <NotificationsButton /> */}
          <AccountButton />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
