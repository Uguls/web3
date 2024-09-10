import './styles/App.css';
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// 페이지 임포트
import Account from "./components/Account.jsx";
import GetNFT from "./components/GetNFT.jsx";
import SendEther from "./components/SendEther.jsx";

function App() {
  const { isConnected } = useAccount();

  return (
    <div className={"App"}>
      <div className={"top"}>
        <h1 className={"App_title"}>Web3-React</h1>
        <div className={"connect-button"}><ConnectButton /></div>
      </div>
      {isConnected ? (
        <>
          {/*Account Info, Addresses, Transactions*/}
          <Account />
          {/*NFT List*/}
          <GetNFT />
          {/*Send Transaction*/}
          <SendEther />
        </>
      ) : (
        <p><h1>지갑을 연결해주세요</h1></p>
      )}
    </div>
  );
}

export default App;
