import DJI from '../mocks/DJI-history'

const PriceType = {
  open: 'open',
  close: 'close',
  high: 'high',
  low: 'low',
}

const getPrice = (dayInHistory, priceType = PriceType.close) => {
  return dayInHistory[priceType]
}

const isPriceWithinRange = (historicPrice, targetPrice, range = 100) => {
  if (Math.abs(Number(historicPrice) - Number(targetPrice)) <= range) {
    return true
  }
  return false
}

const getMostRecentPriceFromHistory = (symbol) => {
  const { history } = symbol
  const firstDate = Object.keys(history)[0]
  return getPrice(history[firstDate])
}

const getAllDatesOfAPriceFromHistory = (symbol, price) => {
  const matchedDays = []
  const { history } = symbol

  for (const date in history) {
    if (history.hasOwnProperty(date)) {
      const day = history[date]
      const historicPrice = getPrice(day)
      if (isPriceWithinRange(historicPrice, price)) {
        matchedDays.push(date)
      }
    }
  }
  return matchedDays
}

// this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
export function handler(event, context, callback) {
  console.log('queryStringParameters', event.queryStringParameters)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      results: getAllDatesOfAPriceFromHistory(
        DJI,
        getMostRecentPriceFromHistory(DJI)
      ),
    }),
  })
}
