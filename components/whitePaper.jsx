import React from 'react';

const Whitepaper = () => {
  return (
    <div className="whitepaper-container bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6">GWT User Interface Whitepaper</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p className="text-gray-300 mt-4">
          The Global Wealth Trade (GWT) project introduces a decentralized blockchain-based ecosystem that incentivizes users through a tiered structure and rewards program. This whitepaper outlines the proposed User Interface (UI) design for interacting with the GWT smart contract.
        </p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Key Features of the GWT Smart Contract</h2>
        <ul className="list-disc pl-6 mt-4 text-gray-300">
          <li>User Registration</li>
          <li>Three-Tiered System</li>
          <li>Reentrancy Guards</li>
          <li>Interest Withdrawal</li>
          <li>Plan Upgrades</li>
          <li>Frozen Tokens Management</li>
          <li>Dynamic Reward Distribution</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">UI Design Goals</h2>
        <ol className="list-decimal pl-6 mt-4 text-gray-300">
          <li>Ease of Use</li>
          <li>Transparency</li>
          <li>Security</li>
          <li>Scalability</li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">UI Components</h2>
        <ul className="list-disc pl-6 mt-4 text-gray-300">
          <li>Dashboard</li>
          <li>Registration Page</li>
          <li>Rewards Section</li>
          <li>Frozen Tokens Tracker</li>
          <li>Transaction History</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">User Flow</h2>
        <p className="text-gray-300 mt-4">
          Registration, monthly interest withdrawal, and plan upgrades are designed to be intuitive and secure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Future Enhancements</h2>
        <ul className="list-disc pl-6 mt-4 text-gray-300">
          <li>Mobile Compatibility</li>
          <li>Analytics Dashboard</li>
          <li>Multi-Language Support</li>
          <li>Referral Tracking</li>
          <li>Gamification Features</li>
        </ul>
      </section>
    </div>
  );
};

export default Whitepaper;
