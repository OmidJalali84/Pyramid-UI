"use client";

import Logo from "./logo";
import { Web3Provider } from "../web3/Web3Provider";
import { ConnectButton } from "../web3/customConnectBtn";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openPDF = () => {
    window.open("/GWT_Whitepaper.pdf", "_blank");
  };

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Hamburger Menu */}
          <button
            className="block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-gray-300 text-2xl md:text-3xl">☰</span>
          </button>

          {/* Menu */}
          <nav
            className={`absolute right-0 top-14 z-20 w-full bg-gray-900/95 rounded-b-2xl shadow-lg md:relative md:top-auto md:w-auto md:bg-transparent md:shadow-none ${
              isMenuOpen ? "block" : "hidden"
            } md:flex`}
          >
            <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-0">
              <li>
                <Link
                  href="https://polygonscan.com/address/0x2a98a92dfcb0a6aa273d45622f15f35341d1d450#code"
                  target="_blank"
                  className="text-gray-300 hover:text-white"
                >
                  Smart Contract
                </Link>
              </li>
              <li>
                <a
                  href="/GWT_Whitepaper.pdf"
                  onClick={openPDF}
                  target="_blank"
                  className="text-gray-300 hover:text-white"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <Web3Provider>
                  <ConnectButton />
                </Web3Provider>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
