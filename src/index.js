import api from 'binance'
import { curry, includes, flatMap, map, first, last } from 'lodash'
import { getEthPrice, getBtcPrice } from './coinbase'
require('dotenv').config()

import { fork } from './util'

const binance = new api.BinanceRest({
  key: process.env.KEY,
  secret: process.env.SECRET
})

const BUY = 'BUY'
const FILLED = 'FILLED'

let ethPrice
let btcPrice
const getBasePrices = () =>
  Promise.all([getBtcPrice(), getEthPrice()])
    .then(tokens => tokens.map(JSON.parse))
    .then(parsed => {
      btcPrice = parseFloat(first(parsed).data.amount)
      ethPrice = parseFloat(last(parsed).data.amount)
    })

const getSymbols = () =>
  binance
    .account()
    .then(({ balances }) =>
      balances
        .filter(({ asset, free }) => parseFloat(free) > 0)
        .map(({ asset: symbol, free: quantity }) => ({ symbol, quantity }))
    )

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
