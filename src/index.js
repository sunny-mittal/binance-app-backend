const api = require('binance')
const { curry, includes, flatMap, map, first, last } = require('lodash')
const { getEthPrice, getBtcPrice } = require('./coinbase')
require('dotenv').config()

const { fork } = require('./util')

const binance = new api.BinanceRest({
  key: process.env.KEY,
  secret: process.env.SECRET
})

const BUY = 'BUY'
const FILLED = 'FILLED'

let ethPrice
let btcPrice
const getBasePrices = async () => {
  btcPrice = await getBtcPrice()
  ethPrice = await getEthPrice()
}

const getSymbols = async () => {
  const { balances } = await binance.account()
  return balances
    .filter(({ asset, free }) => parseFloat(free) > 0)
    .map(({ asset: symbol, free: quantity }) => ({ symbol, quantity }))
}

const getEthHistory = symbol => binance.myTrades(`${symbol}ETH`)
const getBtcHistory = symbol => binance.myTrades(`${symbol}BTC`)
const joinPrices = (eth, btc) => Promise.all([eth, btc])

const getOrderHistory = symbols =>
  Promise.all(
    flatMap(symbols, ({ symbol }) =>
      fork(joinPrices, getEthHistory, getBtcHistory)(symbol)
    )
  )

const logInvalid = (err = {}) => {
  if (err.msg !== 'Invalid symbol.') console.error(err)
}
