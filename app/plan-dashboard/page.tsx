"use client";

import PlanDashboard from "../../src/layouts/tables";
import { Web3Provider } from "@/components/web3/Web3Provider";

export default function overview() {
  return (
    <Web3Provider>
      <PlanDashboard />
    </Web3Provider>
  );
}
