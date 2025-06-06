"use client";

import { useEffect } from "react";
import PropTypes from "prop-types";
import { usePathname } from "next/navigation";
import Link from "next/link";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavCard from "examples/Sidenav/SidenavCard";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

import {
  useVisionUIController,
  setMiniSidenav,
  setTransparentSidenav,
} from "context";

import SimmmpleLogo from "examples/Icons/SimmmpleLogo";

function Sidenav({ color, brandName, routes, ...rest }) {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const pathname = usePathname();
  const collapseName = pathname.split("/")[1]; // e.g. "/dashboard" → "dashboard"

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch]);

  useEffect(() => {
    if (window.innerWidth < 1440) {
      setTransparentSidenav(dispatch, false);
    }
  }, []);

  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, route, href }) => {
      if (type === "collapse") {
        if (href) {
          return (
            <MuiLink
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavCollapse
                color={color}
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
              />
            </MuiLink>
          );
        } else if (route) {
          return (
            <Link href={route} key={key} passHref>
              <VuiBox component="a" sx={{ textDecoration: "none" }}>
                <SidenavCollapse
                  color={color}
                  name={name}
                  icon={icon}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                />
              </VuiBox>
            </Link>
          );
        } else {
          // Safeguard for items missing both href and route
          console.warn(
            `Missing route/href for Sidenav item: ${name} (key: ${key})`
          );
          return null;
        }
      } else if (type === "title") {
        return (
          <VuiTypography
            key={key}
            color="white"
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </VuiTypography>
        );
      } else if (type === "divider") {
        return <Divider light key={key} />;
      }

      return null;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, miniSidenav }}
    >
      <VuiBox pt={3.5} pb={0.5} px={4} textAlign="center">
        <VuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <VuiTypography variant="h6" color="text">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </VuiTypography>
        </VuiBox>

        <Link href="/" passHref>
          <VuiBox component="a" display="flex" alignItems="center">
            <VuiBox
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "0 auto",
              }}
            >
              <VuiBox
                display="flex"
                sx={{
                  mr:
                    miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                }}
              >
                <SimmmpleLogo size="24px" />
              </VuiBox>
              <VuiTypography
                variant="button"
                textGradient
                color="logo"
                fontSize={14}
                letterSpacing={2}
                fontWeight="medium"
                sx={{
                  opacity:
                    miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                  maxWidth:
                    miniSidenav || (miniSidenav && transparentSidenav)
                      ? 0
                      : "100%",
                  margin: "0 auto",
                }}
              >
                {brandName}
              </VuiTypography>
            </VuiBox>
          </VuiBox>
        </Link>
      </VuiBox>

      <Divider light />
      <List>{renderRoutes}</List>

      <VuiBox
        my={2}
        mx={2}
        mt="auto"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: { pt: 2 },
          [breakpoints.only("xl")]: { pt: 1 },
          [breakpoints.down("xl")]: { pt: 2 },
        })}
      >
        <SidenavCard color={color} />
        <VuiBox mt={2}></VuiBox>
      </VuiBox>
    </SidenavRoot>
  );
}

Sidenav.defaultProps = {
  color: "info",
};

Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
