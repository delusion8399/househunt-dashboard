import type { FC } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { MinusOutlined as MinusOutlinedIcon } from "../icons/minus-outlined";
import { Logo } from "./logo";

const sections = [
  {
    title: "Properties",
    links: [
      {
        title: "Properties in Hyderabad",
        href: "/listing/search?search=hyderabad",
      },
      {
        title: "Properties in Dehradun",
        href: "listing/search?search=dehradun",
      },
      {
        title: "Properties in Mohali",
        href: "listing/search?search=mohali",
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        title: "Instagram",
        href: "#",
      },
      {
        title: "LinkedIn",
        href: "#",
      },
    ],
  },
];

export const Footer: FC = (props) => (
  <Box
    sx={{
      backgroundColor: "background.default",
      borderTopColor: "divider",
      borderTopStyle: "solid",
      borderTopWidth: 1,
      pb: 6,
      pt: {
        md: 15,
        xs: 6,
      },
    }}
    {...props}
  >
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid
          item
          md={3}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            order: {
              md: 1,
              xs: 4,
            },
          }}
          xs={12}
        >
          <Logo />
          <Typography color="textSecondary" sx={{ mt: 1 }} variant="caption">
            © 2023 Househunt.
          </Typography>
        </Grid>
        {sections.map((section, index) => (
          <Grid
            item
            key={section.title}
            md={3}
            sm={4}
            sx={{
              order: {
                md: index + 2,
                xs: index + 1,
              },
            }}
            xs={12}
          >
            <Typography color="textSecondary" variant="overline">
              {section.title}
            </Typography>
            <List disablePadding>
              {section.links.map((link) => (
                <ListItem
                  disableGutters
                  key={link.title}
                  sx={{
                    pb: 0,
                    pt: 1,
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      minWidth: 0,
                      mr: 0.5,
                    }}
                  >
                    <MinusOutlinedIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link
                        href={link.href}
                        color="textPrimary"
                        variant="subtitle2"
                      >
                        {link.title}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
      <Divider
        sx={{
          borderColor: (theme) =>
            alpha(theme.palette.primary.contrastText, 0.12),
          my: 6,
        }}
      />
      <Typography color="textSecondary" variant="caption">
        All Rights Reserved.
      </Typography>
    </Container>
  </Box>
);
