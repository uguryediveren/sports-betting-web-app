export interface League {
  id: string;
  name: string;
  country: string;
}

export interface Odd {
  id: string;
  name: string;
  value: number;
  type: string;
}

export interface Event {
  id: string;
  sport_key: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  league: League;
  odds: Odd[];
}
