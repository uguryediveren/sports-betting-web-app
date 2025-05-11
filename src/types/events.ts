export interface Outcome {
  name: string;
  price: number;
}

export interface Market {
  key: string;
  last_update: string;
  outcomes: Outcome[];
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface Event {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

// export interface Sport {
//   key: string;
//   group: string;
//   title: string;
//   active: boolean;
//   has_outrights: boolean;
// }
