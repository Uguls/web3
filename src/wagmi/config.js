import { mainnet, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';

import {getDefaultConfig} from '@rainbow-me/rainbowkit';

const projectId = '2add90493a43a868d7afeed7f50c1860';

export const config = getDefaultConfig({
	appName: "my web3 react project",
	projectId: projectId,
	chains: [mainnet, sepolia]
})