// NFTDetailModal.js
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import useNFTTransfer from "../components/useNFTTransfer.jsx";
import GetNftMetadata from "../components/GetNFTMetadata.jsx";
import {useAccount} from "wagmi";

Modal.setAppElement('#root'); // root 엘리먼트를 설정합니다.

const NFTDetailModal = ({ isOpen, onRequestClose, nft }) => {
	const { address } = useAccount();
	const [isLoading, setIsLoading] = useState(true);
	const [transferAddress, setTransferAddress] = useState('');
	const [error, setError] = useState('')

	const { transferNFT } = useNFTTransfer();

	const handleTransfer = async () => {
		if (nft && transferAddress) {
			const result = await transferNFT(nft.contractAddress, address, transferAddress, nft.tokenID);
			if (result.success) {
				alert('NFT 전송 요청이 완료되었습니다. Metamask에서 컨펌을 눌러주세요');
			} else {
				setError(result.error);
			}
		} else {
			alert('Recipient Address를 입력해주세요.');
		}
	};

	useEffect(() => {
		if (nft) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [nft]);

	if (!nft) return null; // nft가 없을 때는 모달을 렌더링하지 않습니다.

	// console.log(nft)

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="NFT Detail Modal"
			style={{
				content: {
					top: '50%',
					left: '50%',
					right: 'auto',
					bottom: 'auto',
					marginRight: '-50%',
					transform: 'translate(-50%, -50%)',
					padding: '20px',
					maxWidth: '500px',
					width: '100%',
				},
				overlay: {
					backgroundColor: 'rgba(0, 0, 0, 0.75)',
				},
			}}
		>
			<h2>NFT 상세 정보</h2>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<div>
						<GetNftMetadata tokenID={nft.tokenID} contractaddress={nft.contractAddress}/>
					</div>
					<div>
						<div><strong>Token ID:</strong> {nft.tokenID}</div>
						<div><strong>Token Name:</strong> {nft.tokenName}</div>
						<div><strong>Token Symbol:</strong> {nft.tokenSymbol}</div>
						<div><strong>Timestamp:</strong> {new Date(nft.timeStamp * 1000).toLocaleString()}</div>
						<div><strong>From:</strong> {nft.from}</div>
						<div><strong>To:</strong> {nft.to}</div>
					</div>
					<input
						className="nft_input"
						type="text"
						placeholder="Recipient Address"
						value={transferAddress}
						onChange={(e) => setTransferAddress(e.target.value)}
					/>
					<p>
						<button className="nft_send" onClick={handleTransfer}>전송</button>
					</p>
				</>
			)}
			<button onClick={onRequestClose} style={{marginTop: '20px', padding: '10px 20px'}}>닫기</button>
		</Modal>
	);
};

export default NFTDetailModal;
