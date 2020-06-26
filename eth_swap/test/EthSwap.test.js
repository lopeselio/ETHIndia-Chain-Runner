const Token = artifacts.require('Token')
const EthSwap = artifacts.require('EthSwap')

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('EthSwap', (accounts) => {
    let token, ethSwap

    before(async () => {
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address)
        //Transfer all tokens to EthSwap 1 million
        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    describe('Token deployment', async () => {
        it('contract has a name' , async () => {
            // let token = await Token.new()
            const name = await token.name()
            assert.equal(name, 'DApp Token')
        })
    })

    describe('EthSwap deployment', async () => {
        it('contract has a name' , async () => {
            // let ethSwap = await EthSwap.new()
            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap Instant Exchange')
        })

        it('contract has tokens', async () => {
            // let token = await Token.new()
            // const name = await token.name()
            // let ethSwap = await EthSwap.new()
            // await token.transfer(ethSwap.address, '1000000000000000000000000')
            // const name = await ethSwap.name()
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(),tokens('1000000'))
        })

        describe('buyTokens()', async () => {
            it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
                ethSwap.buyTokens({from: accounts[1], value: '1000000000000000000'})
            })
        })
    })
})