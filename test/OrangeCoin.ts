import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';

describe('OrangeCoin', function () {
  async function deployOrangeCoin() {
    const totalSupply = ethers.utils.parseUnits('1000000000000', 6);

    const [owner, sam] = await ethers.getSigners();

    const OrangeCoin = await ethers.getContractFactory('OrangeCoin');
    const coin = await OrangeCoin.deploy();

    return { coin, owner, sam, totalSupply };
  }

  describe('Deployment', function () {
    it('Should deploy and has correct totalSupply', async () => {
      const { coin, totalSupply } = await loadFixture(deployOrangeCoin);

      const supply = await coin.totalSupply();

      expect(supply).to.equal(totalSupply);
    });
  });

  describe('Transfer', function () {
    it('Should transfer with correct amount', async () => {
      const { coin, owner, sam, totalSupply } = await loadFixture(
        deployOrangeCoin
      );

      await coin.transfer(sam.address, BigNumber.from(100));

      let balance = await coin.balanceOf(sam.address);

      expect(balance).to.equal(100);

      balance = await coin.balanceOf(owner.address);
      expect(balance).to.equal(totalSupply.sub(100));
    });
  });
});
