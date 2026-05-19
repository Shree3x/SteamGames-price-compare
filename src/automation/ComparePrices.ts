import { GamesWithCurrentPrices, GamesWithCurrentPricesDatabase } from '../types/gamesCurrentPrices';
import { GamesDatabase } from '../types/gamesDatabase';
import { readJson, saveJson } from '../utils/fileUtils';

const gamesWithCurrentPricesDatabase: GamesWithCurrentPricesDatabase = readJson("games_current_price.json");
const gamesDatabase: GamesDatabase = readJson("games_database.json");

const result: GamesDatabase = {} //results will look like GamesDatabase type

//compare prices
for (const game in gamesWithCurrentPricesDatabase) {

  const versions = gamesWithCurrentPricesDatabase[game]
  const databaseVersion = gamesDatabase[game]

  // skips the game and print the game name in console so can be added later
  if (!databaseVersion) {
    console.log(`${game} does not exist in Database`)
    continue
  }

for (const version of versions) {
  const currentVersionName = version.versionName

  const currentPrice = version.discounted ?? version.regular
  if (currentPrice == null) continue

  const recordedLowestPrice = databaseVersion[currentVersionName]
  if (recordedLowestPrice == null) continue 

  if (currentPrice <= recordedLowestPrice) {
    if (!result[game]) result[game] = {} //make an empty object if game does not exist in result
    result[game][currentVersionName] = currentPrice
  }
}
}

saveJson("low_price_hit.json", result)
console.log("Filtered low-price games and saved it in low_price_hit.json")