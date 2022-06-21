import { useState } from "react";
import {
  ConnectWalletButton,
  WalletKitProvider,
} from "@gokiprotocol/walletkit";
import { UpdateSection } from "./components/UpdateSection/UpdateSection";
import logo from './Images/Logo.png'

function App() {
  const [selected, setSelected] = useState("");


  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setSelected(window.ethereum.selectedAddress);
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <WalletKitProvider
      defaultNetwork="mainnet-beta"
      app={{
        name: "My App",
        icon: (
          <img
            src="https://goki.so/assets/android-chrome-256x256.png"
            alt="icon"
          />
        ),
      }}
      debugMode={true}
    >
      <div>
          <img src={logo} style={{ width:"5%", padding:"6px"}}/>
        </div>
      <div style={{ textAlign: "center" }}>
        <h1>Solana Migrator</h1>
        <p>Connect Solana wallet</p>
        <div style={{ margin: "auto", width: "170px" }}>
          <ConnectWalletButton />
        </div>
        <p>Connect Ethereum wallet</p>
        {!window.ethereum ? (
          <p>Install MetaMask</p>
        ) : selected ? (
          <>
            <p>{selected}</p>
            <button onClick={async () => await connectWallet()}>
              Change Address
            </button>
          </>
        ) : (
          <button onClick={async () => await connectWallet()}>Connect</button>
        )}
        <UpdateSection></UpdateSection>
      </div>
    </WalletKitProvider>
  );
}

export default App;
