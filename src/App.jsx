import './styles/App.css';
import {useAccount} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";

// 페이지 임포트
import Account from "./components/Account.jsx";
import GetNFT from "./components/GetNFT.jsx";
import SendEther from "./components/SendEther.jsx";

function ConnectWallet() {
  const {isConnected} = useAccount();
  if (isConnected) return <Account />
}

function App() {
  return (
    <div className={"App"}>
      <div className={"top"}>
        <h1 className={"App_title"}>Web3-React</h1>
        <div className={"connect-button"}><ConnectButton/></div>
      </div>
      {/*Account Info, Addresses, Transactions*/}
      <Account/>
      {/*NFT List*/}
      <GetNFT />
      {/*Send Transaction*/}
      <SendEther />
    </div>
  );
}

export default App;
