import { formatEther, parseEther, encodePacked, keccak256, etherUnits } from "viem";
import { contractAddress, usdtAddress, contractABI } from "./helperContract";
import { useReadContract } from "wagmi";
import { readContract, writeContract } from "wagmi/actions";
import { config } from "./Web3Provider";
import { BigNumber } from "ethers";
import {ethers} from "ethers"

export function getUser(address: any): { data: any } {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "getUser",
    args: [address],
  });
}

export function getUserByUsername(username: any): { data: any } {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "getUserByUsername",
    args: [username],
  });
}

export function registerUser(
  userAddress: any,
  referrer: any,
  amount: any,
  username: string,
  forToken: boolean
) {
  console.log(userAddress, referrer, amount, username, forToken);
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "register",
    args: [userAddress, referrer, ethers.utils.parseEther(amount.toString()), username, forToken],
  });
}

export function getStackerInfo(address: any): { data: any } {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "stakerInfo",
    args: [address],
  });
}
