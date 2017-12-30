const { throttle } = require('lodash')
const fetch = require('node-fetch')

const PRICES_API = 'https://api.coinbase.com/v2/prices'
const BTC_SPOT_API = `${PRICES_API}/BTC-USD/spot`
const ETH_SPOT_API = `${PRICES_API}/ETH-USD/spot`

const get = api => async () => {
  const request = await fetch(api)
  const json = await request.json()
  return parseFloat(json.data.amount)
}

exports.getEthPrice = throttle(get(ETH_SPOT_API), 5000)
exports.getBtcPrice = throttle(get(BTC_SPOT_API), 5000)
