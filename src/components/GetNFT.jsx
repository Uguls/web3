import '../styles/GetNFT.css'
import {getNFTList} from "../API/Etherscan.jsx";
import {useAccount} from "wagmi";
import {useEffect, useState} from "react";
import useNFTTransfer from "./useNFTTransfer.jsx";
import NFTDetailModal from "../modal/NFTDetailModal.jsx";

const GetNFT = () => {
	const {address} = useAccount();
	const [nftList, setNftList] = useState([]);
	const [selectedNFT, setSelectedNFT] = useState(null);
	const [transferAddress, setTransferAddress] = useState('');
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchNFTList = async () => {
			if (address) {
				try {
					const list = await getNFTList(address);
					setNftList(list);
				} catch (e) {
					console.error(e)
				}
			}
		};

		fetchNFTList()
	}, []);

	const handleDetailClick = (nft) => {
		setSelectedNFT(nft);
		setIsDetailModalOpen(true);
	};

	const handleTransferClick = (nft) => {
		setSelectedNFT(nft);
	};

	const handleCancel = () => {
		setSelectedNFT(null);
		setTransferAddress('');
		setIsDetailModalOpen(false);
	};
	
	return (
		<div className={"NFT_LIST"}>
			<div className={"title"}>
				<h2>NFT List</h2>
			</div>
			{nftList.length > 0 ? (
				<div>
					{nftList.map((nft) => (
						<div className={"detail"} key={`${nft.tokenID}-${nft.hash}`}>
							<div><strong>Token ID:</strong> {nft.tokenID}</div>
							<div><strong>Token Name:</strong> {nft.tokenName}</div>
							<button className="nft_send" onClick={() => handleDetailClick(nft)}>상세보기</button>
						</div>
					))}
				</div>
			) : (
				<p>No NFT transfers found</p>
			)}
			{error && <p className="error">Error: {error.message}</p>}

			<NFTDetailModal
				isOpen={isDetailModalOpen}
				onRequestClose={handleCancel}
				nft={selectedNFT}
			/>

		</div>
	);
};

export default GetNFT;