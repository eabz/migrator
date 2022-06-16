import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ConnectWalletButton } from "@gokiprotocol/walletkit";
import { PendingTransaction } from "@saberhq/solana-contrib";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import { useCallback, useEffect, useState } from "react";
export const UpdateSection = () => {
    const { walletProviderInfo, disconnect, providerMut, network, setNetwork } =
      useSolana();
    const wallet = useConnectedWallet();
    const [balance, setBalance] = useState(null);
  
    const refetchSOL = useCallback(async () => {
      if (wallet && providerMut) {
        setBalance(await providerMut.connection.getBalance(wallet.publicKey));
      }
    }, [providerMut, wallet]);
  
    useEffect(() => {
      void refetchSOL();
    }, [refetchSOL]);

    const updateInfo = () => {
        console.log("here!")
    }
  
    return (
      <AppWrapper>
        {wallet ? (
          <WalletInfo>
            <h3>You will be linking the following wallets</h3>
            <ul>
              <li>{wallet?.publicKey?.toString()} Solana</li>
              <li>Ethereum</li>
            </ul>
            <Buttons>
              {/* <Button onClick={() => void disconnect()}>Disconnect</Button> */}
              <Button onClick={updateInfo}>Update Info</Button>
            </Buttons>
          </WalletInfo>
        ) : (
          <WalletInfo>
            <p>Link Wallets</p>
          </WalletInfo>
        )}
      </AppWrapper>
    );
  };
  
  const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    text-align: center;
  `;
  
  const WalletInfo = styled.div`
    padding: 12px 24px;
    font-size: 16px;
    text-align: left;
    color:#000000
  `;
  
  const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    border: none;
    outline: none;
    height: 40px;
    mix-blend-mode: normal;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 0 12px;
    background: #000;
    color: #fff;
    &:hover {
      background: #000;
    }
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
  `;
  
  const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
  `;