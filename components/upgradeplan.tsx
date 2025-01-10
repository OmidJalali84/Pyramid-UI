import React, { useState } from "react";
import { useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";
import {
  contractAddress,
  contractABI,
  usdtAddress,
} from "./web3/helperContract";
import { config } from "./web3/Web3Provider";
import { erc20Abi, parseUnits } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import toast from "react-hot-toast";

const UpgradePlanModal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [amount, setAmount] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setActiveStep(0);
  };

  async function approveUpgrade(amount: number) {
    try {
      const result = await writeContract(config, {
        address: usdtAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [contractAddress, parseUnits(amount.toString(), 6)],
      });
      await waitForTransactionReceipt(config, {
        hash: result,
      });
      toast.success("Approval successful");
      setActiveStep(1);
    } catch (error) {
      toast.error("Approval failed");
      setError("Approval failed. Please try again.");
    }
  }

  // Step 2: Confirm upgrade
  async function confirmUpgrade() {
    try {
      const result = await writeContract(config, {
        address: contractAddress,
        abi: contractABI,
        functionName: "upgradePlan",
        args: [parseUnits(amount.toString(), 6)],
      });

      await waitForTransactionReceipt(config, {
        hash: result,
      });

      toast.success("Upgrade successful");
      setActiveStep(2);
    } catch (error) {
      toast.error("Upgrade failed");
      setError("Upgrade failed. Please try again.");
    }
  }

  return (
    <>
      <button
        onClick={toggleModal}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg mt-6 hover:bg-indigo-500 transition duration-200"
      >
        Upgrade Plan 🚀
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center">
              <h2 className="animate-gradient bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 bg-clip-text text-transparent text-center text-4xl md:text-5xl font-bold mb-3">
                Upgrade Plan
              </h2>
              <button onClick={toggleModal} className="text-2xl">
                ×
              </button>
            </div>

            <div className="my-6">
              <div className="flex justify-between mb-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full ${
                      activeStep > 0 ? "bg-indigo-600" : "bg-gray-400"
                    } flex justify-center items-center`}
                  >
                    {activeStep > 0 ? "✔" : "1"}
                  </div>
                  <span className="text-sm mt-2">Approve</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full ${
                      activeStep > 1 ? "bg-indigo-600" : "bg-gray-400"
                    } flex justify-center items-center`}
                  >
                    {activeStep > 1 ? "✔" : "2"}
                  </div>
                  <span className="text-sm mt-2">Confirm</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full ${
                      activeStep > 2 ? "bg-indigo-600" : "bg-gray-400"
                    } flex justify-center items-center`}
                  >
                    {activeStep > 2 ? "✔" : "3"}
                  </div>
                  <span className="text-sm mt-2">Success</span>
                </div>
              </div>

              {activeStep === 0 && (
                <div className="rounded-lg p-8 shadow-md text-center">
                  <h3 className="animate-gradient bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 bg-clip-text text-transparent text-center text-2xl md:text-3xl font-bold mb-2">
                    Approve the Amount
                  </h3>
                  <input
                    type="number"
                    value={amount === 0 ? "" : amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setAmount(0); // Allow empty input temporarily
                      } else if (/^\d*$/.test(value)) {
                        setAmount(Number(value)); // Update only if the value is numeric
                      }
                    }}
                    className="w-full px-4 py-2 mb-4 rounded-md text-black"
                  />
                  <button
                    onClick={() => approveUpgrade(amount)}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 mb-4"
                  >
                    Approve
                  </button>

                  {error && <p className="text-red-400 mt-4">{error}</p>}
                </div>
              )}

              {/* Step 2: Confirm Upgrade */}
              {activeStep === 1 && (
                <div className="rounded-lg p-8 shadow-md text-center">
                  <h3 className="animate-gradient bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 bg-clip-text text-transparent text-center text-3xl md:text-5xl font-bold mb-2">
                    Confirm the Upgrade
                  </h3>
                  <p className="mb-4 text-lg text-indigo-200">
                    Please confirm your upgrade of {amount} tokens.
                  </p>
                  <button
                    onClick={confirmUpgrade}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200"
                  >
                    Confirm
                  </button>
                </div>
              )}

              {/* Step 3: Success */}
              {activeStep === 2 && (
                <div className="bg-green-700/50 rounded-lg p-8 shadow-md text-center">
                  <h3 className="text-3xl font-bold text-green-100 mb-4">
                    Upgrade Successful!
                  </h3>
                  <p className="text-lg text-green-200">
                    Your plan has been successfully upgraded to {amount} tokens.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpgradePlanModal;
