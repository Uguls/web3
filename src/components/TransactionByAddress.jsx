import {getNormalTransactionList} from "../API/Etherscan.jsx";
import {useEffect, useState} from "react";

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
					{normalTransactions.map((tx) => (
						<li className={"transactions_each"} key={tx.hash}>
							<div>Hash: {tx.hash}</div>
							<div>Block: {tx.blockNumber}</div>
							<div>From: {tx.from}</div>
							<div>To: {tx.to}</div>
							<div>Value: {tx.value} WEI</div>
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