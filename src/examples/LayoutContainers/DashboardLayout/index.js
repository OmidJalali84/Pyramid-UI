"use client"; // Important if you're using App Router

// components/layouts/DashboardLayout.tsx  (or .jsx)
// ↑ in Next’s App Router, any file that uses `usePathname` must be a client component.
"use client";

import { useEffect } from "react";

import PropTypes from "prop-types";
import VuiBox from "../../../components/VuiBox";
import { useVisionUIController, setLayout } from "../../../context";

// Next.js App Router hook to read the current pathname
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav } = controller;

  const pathname = usePathname();

  useEffect(() => {
    // This will run on every client‐side navigation (pathname change)
    setLayout(dispatch, "dashboard");
  }, [pathname, dispatch]);

  return (
    <VuiBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </VuiBox>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
