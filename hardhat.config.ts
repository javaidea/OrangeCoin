import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

if (!process.env.PRIVATE_KEY) {
  throw new Error(
    'Please configure the PRIVATE_KEY environment variable in .env!'
  );
}

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url:
        'https://eth-goerli.g.alchemy.com/v2/' +
        process.env.ALCHEMY_ETHEREUM_GOERLI_API_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

export default config;
