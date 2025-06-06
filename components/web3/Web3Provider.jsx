import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [arbitrumSepolia],
    transports: {
      [arbitrumSepolia.id]: http(
        `https://arb-sepolia.g.alchemy.com/v2/7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz`
      ),
    },
    walletConnectProjectId: " 7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz",
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
