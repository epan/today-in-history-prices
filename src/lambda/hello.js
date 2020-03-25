import DJI from '../mocks/DJI-history'
import {
  getAllDatesOfPriceFromHistoryFromToday,
  getMostRecentDate,
  getOldestDate,
} from '../utils/historyFormatting'

// this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
export function handler(event, context, callback) {
  console.log('queryStringParameters', event.queryStringParameters)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      history: DJI.history,
      matchedDates: getAllDatesOfPriceFromHistoryFromToday(DJI),
      mostRecentDate: getMostRecentDate(DJI),
      oldestDate: getOldestDate(DJI),
    }),
  })
}
