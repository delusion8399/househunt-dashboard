import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

interface LogoProps {
  variant?: "light" | "primary";
}

export const Logo = styled((props: LogoProps) => {
  const { variant, ...other } = props;

  const color = variant === "light" ? "#C1C4D6" : "#5048E5";

  return (
    <svg
      data-name="Layer 2"
      id="Layer_2"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <style>{`.cls-1{fill:${color}}`}</style>
      </defs>
      <title />
      <path
        className="cls-1"
        d="M30 15a1 1 0 0 1-.58-.19L16 5.23 2.58 14.81a1 1 0 0 1-1.16-1.62l14-10a1 1 0 0 1 1.16 0l14 10A1 1 0 0 1 30 15ZM5 9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H6v3a1 1 0 0 1-1 1Z"
      />
      <path
        className="cls-1"
        d="M25 29h-5a1 1 0 0 1-1-1v-7h-6v7a1 1 0 0 1-1 1H7a3 3 0 0 1-3-3V16a1 1 0 0 1 2 0v10a1 1 0 0 0 1 1h4v-7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7h4a1 1 0 0 0 1-1V16a1 1 0 0 1 2 0v10a3 3 0 0 1-3 3Z"
      />
    </svg>
  );
})``;

Logo.defaultProps = {
  variant: "primary",
};

Logo.propTypes = {
  variant: PropTypes.oneOf(["light", "primary"]),
};
