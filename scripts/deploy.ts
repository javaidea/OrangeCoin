import fs from 'fs';
import { ethers } from 'hardhat';

async function main() {
  const args = process.argv;
  const i = args.findIndex((x) => x === '--network');
  const network = i >= 0 && i < args.length ? args[i + 1] : undefined;

  const OrangeCoin = await ethers.getContractFactory('OrangeCoin');

  const coin = await OrangeCoin.deploy();

  await coin.deployed();
  console.log(`OrangeCoin deployed to ${coin.address}`);

  // Save the result into the cache folder
  const deployed = { address: coin.address };
  fs.writeFileSync(
    `./cache/deployed${network ? '_' + network : ''}.json`,
    JSON.stringify(deployed, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
