import type { FC, FormEvent } from "react";
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

export const ContactForm: FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <TextField fullWidth name="company" required />
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
        <Button fullWidth size="large" variant="contained">
          Let&apos;s Talk
        </Button>
      </Box>
      <Typography color="textSecondary" sx={{ mt: 3 }} variant="body2">
        By submitting this, you agree to the{" "}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Cookie Policy
        </Link>
        .
      </Typography>
    </form>
  );
};
