import { throttle } from 'lodash'
import https from 'https'

const PRICES_API = 'https://api.coinbase.com/v2/prices'
const BTC_SPOT_API = `${PRICES_API}/BTC-USD/spot`
const ETH_SPOT_API = `${PRICES_API}/ETH-USD/spot`

const get = api => () =>
  new Promise(resolve => {
    https.get(api, res => {
      let _data = ''
      res.on('data', data => (_data += data))
      res.on('end', () => resolve(_data))
    })
  })

export const getEthPrice = throttle(get(ETH_SPOT_API), 5000)
export const getBtcPrice = throttle(get(BTC_SPOT_API), 5000)
