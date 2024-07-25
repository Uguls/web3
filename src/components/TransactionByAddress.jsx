import {getNormalTransactionList} from "../API/Etherscan.jsx";
import {useEffect, useState} from "react";
import Web3 from "web3"

const web3 = new Web3();

const TransactionByAddress = ({ address }) => {
	const [normalTransactions, setNormalTransactions] = useState([]);

	useEffect(() => {
		const fetchTransactionList = async () => {
			const list = await getNormalTransactionList(address);
			setNormalTransactions(list);
		}

		fetchTransactionList()
	}, [address]);



	return (
		<div className={"transactions"}>
			{normalTransactions.length > 0 ? (
				<ul>
					{normalTransactions.slice().reverse().map((tx) => (
						<li className={"transactions_each"} key={tx.hash}>
							<div>
								<a href={`https://sepolia.etherscan.io/tx/${tx.hash}`}>Hash: {tx.hash}</a>
							</div>
							<div>Block: {tx.blockNumber}</div>
							<div>From: {tx.from}</div>
							<div>To: {tx.to}</div>
							<div>Value: {web3.utils.fromWei(tx.value, 'ether')} ETH</div>
							<div>Gas Used: {tx.gasUsed}</div>
							<div>Timestamp: {new Date(tx.timeStamp * 1000).toLocaleString()}</div>
						</li>
					))}
				</ul>
			) : (
				<div>No normal transactions found</div>
			)}
		</div>
	);
};

export default TransactionByAddress;