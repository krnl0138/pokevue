import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { URLS, PROJECT_LOGO, APP_NAME } from "../../../utils/constants";

export const CornerLogo = () => {
  return (
    <>
      <Link href={URLS.home}>
        <a>
          <Image src={PROJECT_LOGO} width="40" height="40" alt="Project Logo" />
        </a>
      </Link>
      <Typography
        variant="h5"
        noWrap
        sx={{
          ml: 2,
          display: { xs: "none", md: "flex", alignItems: "center" },
          fontWeight: 300,
          letterSpacing: ".25rem",
          fontSize: "1.1rem",
          color: "inherit",
          textDecoration: "none",
          textTransform: "capitalize",
        }}
      >
        <Link href={URLS.home}>{APP_NAME}</Link>
      </Typography>
    </>
  );
};
