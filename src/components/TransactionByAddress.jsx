import {getNormalTransactionList} from "../API/Etherscan.jsx";
import {useEffect, useState} from "react";
import Web3 from "web3"

const web3 = new Web3();

const TransactionByAddress = ({ address }) => {
	const [normalTransactions, setNormalTransactions] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [disableNextButton, setDisableNextButton] = useState(false)

	useEffect(() => {
		const fetchTransactionList = async () => {
			const list = await getNormalTransactionList(address, currentPage);
			if (list.length <= 0) {
				setDisableNextButton(true);
			} else {
				setDisableNextButton(false);
			}
			setNormalTransactions(list);
		}

		fetchTransactionList()
	}, [address, currentPage]);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	return (
		<div className={"transactions"}>
			{normalTransactions.length > 0 ? (
				<ul>
					{normalTransactions.slice().reverse().map((tx) => (
						<li className={"transactions_each"} key={tx.hash}>
							<div>
								<a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">Hash: {tx.hash}</a>
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
			<div className={"pagination_button"}>
				<button
					className={"pagination"}
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
				>
					이전
				</button>
				<span className={"currentPage"}> {currentPage} </span>
				<button
					className={"pagination"}
					onClick={handleNextPage}
					disabled={disableNextButton === true}
				>
					다음
				</button>
			</div>
		</div>
	);
};

export default TransactionByAddress;
