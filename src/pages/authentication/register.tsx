import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { AuthBanner } from "../../components/authentication/auth-banner";
import { JWTRegister } from "../../components/authentication/jwt-register";
import { Logo } from "../../components/logo";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";

const Register: NextPage = () => {
  const router = useRouter();
  const { platform } = useAuth() as any;
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Register- HouseHunt</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "neutral.900" : "neutral.100",
              borderColor: "divider",
              borderRadius: 1,
              borderStyle: "solid",
              borderWidth: 1,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              mb: 4,
              p: 2,
              "& > img": {
                height: 32,
                width: "auto",
                flexGrow: 0,
                flexShrink: 0,
              },
            }}
          >
            <Typography color="textSecondary" variant="caption">
              Register using email.
            </Typography>
          </Box>
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">Register</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Register to start listing properties
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {platform === "JWT" && <JWTRegister />}
            </Box>
            <Divider sx={{ my: 3 }} />
            <NextLink
              href={
                disableGuard
                  ? `/authentication/login?disableGuard=${disableGuard}`
                  : "/authentication/login"
              }
              passHref
            >
              <Link color="textSecondary" variant="body2">
                Having an account
              </Link>
            </NextLink>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Register.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Register;
