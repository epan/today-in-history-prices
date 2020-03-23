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

const getMostRecentDate = (symbol) => Object.keys(symbol.history)[0]

const getMostRecentDay = (symbol) => {
  return symbol.history[getMostRecentDate(symbol)]
}

const getOldestDate = (symbol) => {
  const { history } = symbol
  const dates = Object.keys(history)
  const oldestDate = dates[dates.length - 1]
  return oldestDate
}

const getOldestDay = (symbol) => {
  return symbol.history[getOldestDate(symbol)]
}

const getMostRecentPriceFromHistory = (symbol) => {
  return getPrice(getMostRecentDay(symbol))
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
      history: DJI.history,
      matchedDates: getAllDatesOfAPriceFromHistory(
        DJI,
        getMostRecentPriceFromHistory(DJI)
      ),
      mostRecentDate: getMostRecentDate(DJI),
      oldestDate: getOldestDate(DJI),
    }),
  })
}
