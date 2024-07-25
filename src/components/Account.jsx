import '../styles/Account.css'
import {useAccount, useDisconnect, useBalance} from "wagmi";
import {getTransactionCount} from "../API/Etherscan.jsx";
import TransactionByAddress from "./TransactionByAddress.jsx";
import {useEffect, useState} from "react";

const Account = () => {
	const {address, addresses, chain, status} = useAccount();
	const {disconnect} = useDisconnect();
	const [transactionCount, setTransactionCount] = useState(null);
	const [showTransactions, setShowTransactions] = useState(null);

	useEffect(() => {
		if (status === 'connected' && address) {
			const fetTransactionCount = async () => {
				const count = await getTransactionCount(address);
				setTransactionCount(count);
			};

			fetTransactionCount();
		}
	}, [status, address]);

	const handleToggleTransactions = () => {
		setShowTransactions(prevState => !prevState);
	}

	return (
		<>
			{status === 'connected' && (
				<div className={"Account"}>

					<div className={"Info_addresses"}>

						<div className={"Account_info"}>
							<div className={"title"}>
								<h2>Account Info</h2>
							</div>
							<div className={"network detail"}>
								<div>ChainId: {chain?.id}</div>
								<div>Network: {chain?.name}</div>
								<div>연결된 지갑 Address: {address}</div>
								<div>TransactionCount: {transactionCount}</div>
							</div>
						</div>

						<div className={"Account_addresses"}>
							<div className={"title"}>
								<h2>Addresses</h2>
							</div>
							<div className={"addresses detail"}>
								{addresses?.map((addr, index) => (
									<AccountBalance key={index} address={addr}/>
								))}
							</div>
						</div>

					</div>

					<div className={"Account_transactions"}>
						<div className={"title"}>
							<h2>Transactions</h2>
						</div>
						<button className={"showButton"} onClick={handleToggleTransactions}>
							{showTransactions ? "Hide Transactions" : "Show Transactions"}
						</button>
						{showTransactions && (
							<div className={"transactions detail"}>
								<TransactionByAddress address={address}/>
							</div>
						)}
					</div>

				</div>
			)}
			{status === 'disconnected' && (
				<div>Not connected</div>
			)}
		</>
	);
};

const AccountBalance = ({address}) => {
	const {data: balanceData, isError, isLoading } = useBalance({
		address,
	});

	return (
		<section>
			<div>
				Address: {address}
			</div>
			{balanceData && (
				<div>
					Balance: {balanceData.formatted} {balanceData.symbol}
				</div>
			)}
			{isLoading && <div>Loading balance...</div>}
			{isError && <div>Error fetching balance</div>}
		</section>
	);
}

export default Account;