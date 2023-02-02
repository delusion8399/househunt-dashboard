import type { FC, FormEvent } from "react";
import React, { useRef } from "react";
import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import emailjs from "@emailjs/browser";
import environments from "src/environments";

export const ContactForm: FC = ({ listing }) => {
  const form = useRef();
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    emailjs
      .sendForm(
        environments.services.emailJS.serviceId,
        "template_19lghz6",
        form.current,
        environments.services.emailJS.publicKey
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    // form.current.reset();
  };

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Full Name*
          </Typography>
          <TextField fullWidth name="name" required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Budget*
          </Typography>
          <TextField fullWidth name="phone" required type="tel" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Email*
          </Typography>
          <TextField fullWidth name="email" type="email" required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Phone Number *
          </Typography>
          <TextField fullWidth name="phone" required type="tel" />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Address*
          </Typography>
          <TextField fullWidth name="address" required />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Message
          </Typography>
          <TextField fullWidth name="message" required multiline rows={6} />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button type="submit" fullWidth size="large" variant="contained">
          Send
        </Button>
      </Box>
    </form>
  );
};
