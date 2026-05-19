export type GamesWithCurrentPrices = {
  versionName: string;
  regular: number | null;
  discounted: number | null;
};

export type GamesWithCurrentPricesDatabase = {
  [gameNames: string]: GamesWithCurrentPrices[]
}