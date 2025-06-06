"use client";

import Overview from "../../src/layouts/dashboard";
import { Web3Provider } from "@/components/web3/Web3Provider";
import { VisionUIControllerProvider } from "../../src/context";
import { ThemeProvider } from "@mui/material/styles";
import themeRTL from "assets/theme/theme-rtl";

export default function overview() {
  return (
    <ThemeProvider theme={themeRTL}>
      <VisionUIControllerProvider>
        <Web3Provider>
          <Overview />
        </Web3Provider>
      </VisionUIControllerProvider>
    </ThemeProvider>
  );
}
