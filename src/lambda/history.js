import axios from 'axios'

import {
  getAllDatesOfPriceFromHistoryFromToday,
  getMostRecentDate,
  getOldestDate,
} from '../utils/historyFormatting'

export async function handler(event, context) {
  try {
    const response = await axios.get(
      `https://api.worldtradingdata.com/api/v1/history?symbol=^DJI&api_token=${process.env.API_TOKEN}`,
      {
        headers: { Accept: 'application/json' },
      }
    )
    const data = response.data
    return {
      statusCode: 200,
      body: JSON.stringify({
        history: data.history,
        matchedDates: getAllDatesOfPriceFromHistoryFromToday(data),
        mostRecentDate: getMostRecentDate(data),
        oldestDate: getOldestDate(data),
      }),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
