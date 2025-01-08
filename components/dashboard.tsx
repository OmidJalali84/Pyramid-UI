import { useAccount } from "wagmi";
import { writeContract, readContract } from "@wagmi/core";
import {
  contractAddress,
  usdtAddress,
  contractABI,
} from "./web3/helperContract";
import { config } from "./web3/Web3Provider";
import { useState, useEffect } from "react";
import UpgradePlanModal from "./upgradeplan";
import { erc20Abi, parseUnits } from "viem";
import toast from "react-hot-toast";
import Tree from "react-d3-tree";

function Dashboard() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [withdrawMessage, setWithdrawMessage] = useState<string | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  async function getUserInfo() {
    try {
      if (!address) return;

      const user = await readContract(config, {
        abi: contractABI,
        address: contractAddress,
        functionName: "getUser",
        args: [address],
      });

      setUserInfo(user as Record<string, any>);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError("Failed to fetch user information");
    }
  }

  async function approveToken(amount: number) {
    try {
      const result = await writeContract(config, {
        address: usdtAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [contractAddress, parseUnits(amount.toString(), 6)],
      });
      console.log("Approval successful:", result);
    } catch (error) {
      console.error("Approval failed:", error);
    }
  }

  async function handleUpgrade(amount: string) {
    if (!address || !amount) {
      setError("Invalid amount or address");
      return;
    }
    try {
      const tx = await writeContract(config, {
        abi: contractABI,
        address: contractAddress,
        functionName: "upgradePlan",
        args: [parseUnits(amount.toString(), 6)],
      });

      console.log("Transaction sent:", tx);
      console.log("Transaction confirmed");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error upgrading plan:", err);
      setError("Failed to upgrade plan. Please try again.");
    }
  }

  async function withdrawInterest() {
    try {
      if (!address) return;

      const tx = await writeContract(config, {
        abi: contractABI,
        address: contractAddress,
        functionName: "withdrawInterest",
      });

      console.log("Withdrawal successful:", tx);
      setWithdrawMessage(
        "🎉 Success! Your interest has been withdrawn and added to your GWT balance. Keep building your wealth!"
      );
    } catch (err) {
      console.error("Error withdrawing interest:", err);
      setWithdrawMessage(
        "❌ Not Eligible: You need to wait to withdraw again."
      );
    }
  }
  const formatTokens = (value: string) => {
    const numberValue = parseFloat(value);
    return numberValue / 10 ** 6;
  };
  const formatTime = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  useEffect(() => {
    if (address) {
      getUserInfo();
    }
  }, [address]);

  return (
    <div className="p-4 md:p-20 px-4 sm:px-6">
      {isConnecting && (
        <p className="animate-gradient bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 bg-clip-text text-transparent text-center text-2xl sm:text-3xl md:text-5xl font-bold">
          Connecting...
        </p>
      )}
      {isDisconnected && (
        <p className="animate-gradient bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 bg-clip-text text-transparent text-center text-2xl sm:text-3xl md:text-5xl font-bold">
          Wallet is disconnected
        </p>
      )}
      {address && !userInfo && !error && (
        <p className="animate-gradient bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 bg-clip-text text-transparent text-center text-2xl sm:text-3xl md:text-5xl font-bold">
          Fetching user information...
        </p>
      )}
      {error && (
        <p className="text-red-400 text-center text-sm sm:text-lg font-semibold">
          {error}
        </p>
      )}
      {userInfo && (
        <div className="p-6 sm:p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 text-center mb-6 sm:mb-8">
            User Information
          </h3>
          <ul className="space-y-4">
            {Object.entries(userInfo).map(([key, value]) => (
              <li
                className="sm:text-base text-indigo-200 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-indigo-900/50 rounded-lg px-3 py-3 shadow-md"
                key={key}
              >
                <span className="font-semibold text-indigo-300">{key}:</span>
                <span className="mt-1 sm:mt-0 sm:ml-4 text-indigo-100 text-[10px] sm:text-xs">
                  {key.toLowerCase().includes("time")
                    ? formatTime(String(value))
                    : key.toLowerCase().includes("token")
                    ? formatTokens(String(value))
                    : key.toLowerCase().includes("reward")
                    ? formatTokens(String(value))
                    : key.toLowerCase().includes("amount")
                    ? formatTokens(String(value))
                    : key.toLowerCase().includes("last")
                    ? formatTime(String(value))
                    : String(value)}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 text-center mb-6 sm:mb-9 mt-6 sm:mt-9">
            upgrade Your Wealth Plan
          </h3>
          <ul className="list-disc space-y-3 sm:space-y-4 px-5 sm:px-8 text-indigo-200/65 text-sm sm:text-xl">
            <li> Every upgrade brings you closer to your financial goals.</li>
            <li>
              {" "}
              Enhance your journey to financial growth by upgrading your plan!
            </li>
            <li>
              Increase your entry amount to unlock higher levels and maximize
              your rewards.
            </li>
          </ul>
          {isModalOpen && <UpgradePlanModal />}
        </div>
      )}
      <div className="p-6 sm:p-8 rounded-lg shadow-lg mt-6 sm:mt-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 text-center mb-6 sm:mb-9">
          Withdraw your rewards
        </h3>
        <ul className="list-disc space-y-3 sm:space-y-4 px-5 sm:px-8 text-indigo-200/65 text-sm sm:text-xl">
          <li> Claim the interest you’ve earned on your GWT tokens! </li>
          <li>
            {" "}
            Withdrawals are available once a month to keep your earnings
            growing.
          </li>
        </ul>
        <div className="text-center">
          <ul className="space-y-4 sm:space-y-4">
            <span className="mb-5 text-xl text-indigo-200/65">
              Next withdraw:{" "}
            </span>
            {userInfo &&
              Object.entries(userInfo).map(([key, value]) => (
                <span
                  key={key}
                  className="text-sm sm:text-xl text-indigo-200/65"
                >
                  {key.toLowerCase().includes("lastwithdrawal")
                    ? formatTime(String(value + BigInt(2592000)))
                    : null}
                </span>
              ))}
          </ul>

          <button
            onClick={withdrawInterest}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg mt-6 hover:bg-indigo-500 transition duration-200"
          >
            Claim Interest💰
          </button>
          {withdrawMessage && (
            <p
              className={`mt-4 text-center text-sm sm:text-base ${
                withdrawMessage.includes("success")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {withdrawMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
