import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  StepIconProps,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "../app/css/additional-styles/register.module.css";
import { Web3Provider } from "@/components/web3/Web3Provider";
import { ConnectButton } from "@/components/web3/customConnectBtn";
import {
  contractAddress,
  usdtAddress,
  contractABI,
} from "./web3/helperContract";
import { config } from "@/components/web3/Web3Provider";
import { writeContract, readContract } from "wagmi/actions";
import { erc20Abi, getAddress, parseUnits, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { waitForTransactionReceipt } from "@wagmi/core";
import { getUserByUsername, registerUser } from "./web3/actions";

function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [amount, setAmount] = useState(10);
  const [referralId, setReffralId] = useState("");
  const { address, isConnecting, isDisconnected } = useAccount();
  const [connectError, setConnectError] = useState("");
  const [approveError, setApproveError] = useState("");
  const [showReferralInput, setShowReferralInput] = useState(false);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [username, setUsername] = useState("");
  const [forToken, setForToken] = useState(false);

  const { data: userInfo } = getUserByUsername(referralId);

  // Fetch user's USDT balance
  async function getUserUsdtBalance() {
    if (!address) return;

    try {
      const balance = await readContract(config, {
        address: usdtAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      });
      console.log(balance.toString());
      setUsdtBalance(Number(balance.toString()) / 1e18); // Assuming USDT has 6 decimals
    } catch (error) {
      console.error("Failed to fetch USDT balance:", error);
      toast.error("Failed to fetch USDT balance.");
    }
  }

  useEffect(() => {
    getUserUsdtBalance();
  }, [address]);

  async function register() {
    if (!amount || amount < 10) {
      toast.error("Amount must be greater than 10");
      return;
    } else if (!referralId) {
      toast.error("Invalid referrerl ID");
      return;
    } else if (!address) {
      toast.error("Please first connect your wallet");
      return;
    } else if (username === "") {
      toast.error("Invalid username Entered");
      return;
    }

    try {
      const tx = await registerUser(
        address,
        userInfo?.userAddress,
        amount,
        username,
        forToken
      );

      await waitForTransactionReceipt(config, {
        hash: tx,
      });
      toast.success("Transaction successful");
    } catch (error) {
      toast.error("Transaction failed: " + error);
    }
  }
  async function approveToken(amount: number) {
    if (!amount || amount < 10) {
      toast.error("Amount must be greater than 10 USDT");
      return;
    }
    if (usdtBalance < 10) {
      toast.error("You're balance is less than 10 USDT");
      return;
    }
    try {
      const amountToApprove = (amount * 105) / 100;
      const result = await writeContract(config, {
        address: usdtAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [contractAddress, parseUnits(amountToApprove.toString(), 18)],
      });

      await waitForTransactionReceipt(config, {
        hash: result,
      });

      toast.success("Approval successful:");
      setActiveStep(2);
    } catch (error) {
      toast.error("Approval failed:");
    }
  }

  function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    // Only update if the value is a valid number or empty
    if (!isNaN(Number(value))) {
      setAmount(value === "" ? 0 : Number(value));
    }
  }
  async function handleReffralId(e: React.ChangeEvent<any>) {
    let rfrid = e.target.value;
    setReffralId(String(rfrid));
  }
  async function handleSetUsername(e: React.ChangeEvent<any>) {
    let username = e.target.value;
    setUsername(String(username));
  }
  const [referralError, setReferralError] = useState<string | null>(null);

  async function handleReferralContinue() {
    if (!referralId) {
      toast.error("Referral ID is required.");
      return;
    }
    if (userInfo?.userAddress === zeroAddress) {
      toast.error("Invalid referral ID. Please check and try again.");
    } else {
      setReferralError(null);
      setActiveStep(3);
    }
  }
  async function handleConnectBTN() {
    if (!address) {
      toast.error("wallet is not connected");
      toast.error("you have to connect your wallet to go to the next step!");
      return;
    } else {
      setConnectError("");
      setActiveStep(1);
    }
  }
  async function handleApproveContinue() {
    if (!amount || amount < 10) {
      setApproveError("you cant enter with less than 10 USDT");
      toast.error("you cant enter with less than 10 USDT");
      return;
    } else {
      setApproveError("");
      setActiveStep(2);
    }
  }

  const CustomStepIcon = (props: StepIconProps) => {
    const { active, completed, icon } = props;

    return (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: completed ? "#4F46E5" : active ? "#4F46E5" : "gray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {completed ? <span> &#x2713; </span> : icon}
      </div>
    );
  };
  React.useEffect(() => {
    console.log("Amount updated:", amount);
  }, [amount]);

  React.useEffect(() => {
    console.log("Referral ID updated:", referralId);
  }, [referralId]);

  return (
    <main className={"mx-auto max-w-screen-xl"}>
      <div className={"flex flex-col gap-6 pt-12 px-10 mb-10"}>
        <div className={"py-4"}>
          <span className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            Register
          </span>
          <br />
          <span>
            Please connect your wallet and then go through the registeration
            process
          </span>
        </div>

        <Stepper activeStep={activeStep} orientation="vertical">
          <Step key={0}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <span className={styles.label}>Connect Wallet</span>
            </StepLabel>
            <StepContent className="flex">
              <Typography className="mb-2 pb-5 block text-sm font-medium text-indigo-200/65">
                Connect your wallet
              </Typography>
              <div className="flex items-center justify-center flex-col pl-5">
                <ConnectButton />
                <button
                  className={"btn btn-primary w-full mt-3"}
                  onClick={handleConnectBTN}
                >
                  Continue
                </button>
              </div>
            </StepContent>
          </Step>

          <Step key={1}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <span className={styles.label}>Approve Register</span>
            </StepLabel>
            <StepContent>
              <Typography className="mb-1 block text-sm font-medium text-indigo-200/65">
                Approve the amount for it
              </Typography>

              <input
                onChange={handleAmount}
                className="form-input w-full"
                value={amount === 0 ? "" : amount}
              />
              <button
                className="btn btn-primary"
                onClick={() => approveToken(amount)}
              >
                Approve
              </button>
            </StepContent>
          </Step>

          <Step key={2}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <span className={styles.label}>Referral</span>
            </StepLabel>
            <StepContent>
              <Typography className="mb-1 block text-sm font-medium text-indigo-200/65">
                Enter Referral ID
              </Typography>

              <>
                <input
                  onChange={(e) => handleReffralId(e)}
                  className="form-input w-full"
                  value={referralId}
                  placeholder="Enter referral ID"
                />
                <button
                  className={"btn btn-primary mt-3"}
                  onClick={handleReferralContinue}
                >
                  Continue
                </button>
              </>
              {referralError && (
                <Typography className="text-red-500 text-sm mt-1">
                  {referralError}
                </Typography>
              )}
            </StepContent>
          </Step>

          <Step key={3}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <span className={styles.label}>Register</span>
            </StepLabel>
            <StepContent>
              <div className="flex items-center gap-4 mb-4">
                <button
                  className={`btn ${"btn-primary"}`}
                  onClick={() => setForToken(true)}
                >
                  Token
                </button>
                <button
                  className={`btn ${"btn-primary"}`}
                  onClick={() => setForToken(false)}
                >
                  Point
                </button>
              </div>
              <input
                onChange={(e) => handleSetUsername(e)}
                className="form-input w-full"
                value={username}
                placeholder="Enter username"
              />
              <button
                type="submit"
                className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[10px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                onClick={() => register()}
              >
                Register
              </button>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    </main>
  );
}

export default Register;
