"use client";

import StakeDashboard from "../../vision-ui-dashboard-react/src/layouts/dashboard";
import { Web3Provider } from "@/components/web3/Web3Provider";
import { VisionUIControllerProvider } from "../../vision-ui-dashboard-react/src/context/index";

export default function overview() {
  return (
    <VisionUIControllerProvider>
      <Web3Provider>
        <StakeDashboard />
      </Web3Provider>
    </VisionUIControllerProvider>
  );
}
