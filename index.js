import binance from 'node-binance-api'
import { curry, each, includes } from 'lodash'
require('dotenv').config()

const BTC = 'https://api.coinbase.com/v2/prices/BTC-USD/spot'

binance.options({
  APIKEY: process.env.KEY,
  APISECRET: process.env.SECRET
})

let symbols = []
const filterFn = curry(includes, 2)(['BTC', 'LTC', 'ETH'])

function populateSymbols() {
  binance.balance(balances => {
    each(balances, ({ available }, key) => {
      const value = parseFloat(available)
      if (value > 0 && !filterFn(key)) symbols.push({ [key]: value })
    })
    console.log(symbols)
  })
}

populateSymbols()
