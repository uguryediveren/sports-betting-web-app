import type { Event } from '../types/events';

// Mock etkinlik verileri
export const mockEvents: Event[] = [
  {
    id: '15dd36d4b792afdf98130d232e927322d',
    sport_key: 'soccer_turkey_super_league',
    sport_title: 'Turkey Super League',
    commence_time: '2025-05-11T13:00:00Z',
    home_team: 'Sivasspor',
    away_team: 'Bodrum FK',
    bookmakers: [
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-11T04:59:35Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-11T04:59:35Z',
            outcomes: [
              {
                name: 'Bodrum FK',
                price: 3.25,
              },
              {
                name: 'Sivasspor',
                price: 2.24,
              },
              {
                name: 'Draw',
                price: 3.42,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '25dd36d4b792afdf98130d232e927322d',
    sport_key: 'soccer_turkey_super_league',
    sport_title: 'Turkey Super League',
    commence_time: '2025-05-11T13:00:00Z',
    home_team: 'izmirspor',
    away_team: 'istanbulspor',
    bookmakers: [
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-11T04:59:35Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-11T04:59:35Z',
            outcomes: [
              {
                name: 'Bodrum FK',
                price: 3.25,
              },
              {
                name: 'Sivasspor',
                price: 2.24,
              },
              {
                name: 'Draw',
                price: 3.42,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '35dd36d4b792afdf98130d232e927322d',
    sport_key: 'soccer_turkey_super_league',
    sport_title: 'Turkey Super League',
    commence_time: '2025-05-11T13:00:00Z',
    home_team: 'ankarasport',
    away_team: 'bursaspor',
    bookmakers: [
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-11T04:59:35Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-11T04:59:35Z',
            outcomes: [
              {
                name: 'Bodrum FK',
                price: 3.25,
              },
              {
                name: 'Sivasspor',
                price: 2.24,
              },
              {
                name: 'Draw',
                price: 3.42,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '45dd36d4b792afdf98130d232e927322d',
    sport_key: 'soccer_turkey_super_league',
    sport_title: 'Turkey Super League',
    commence_time: '2025-05-11T13:00:00Z',
    home_team: 'fethiyespor',
    away_team: 'trabzonspor',
    bookmakers: [
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-11T04:59:35Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-11T04:59:35Z',
            outcomes: [
              {
                name: 'Bodrum FK',
                price: 3.25,
              },
              {
                name: 'Sivasspor',
                price: 2.24,
              },
              {
                name: 'Draw',
                price: 3.42,
              },
            ],
          },
        ],
      },
    ],
  },
  //   {
  //     id: '1',
  //     sport_key: 'soccer',
  //     home_team: 'Galatasaray',
  //     away_team: 'Fenerbahçe',
  //     commence_time: new Date(Date.now() + 3600000).toISOString(),
  //     league: {
  //       id: '1',
  //       name: 'Süper Lig',
  //       country: 'Türkiye',
  //     },
  //     odds: [
  //       { id: '1', name: 'Galatasaray', value: 2.1, type: '1' },
  //       { id: '2', name: 'Beraberlik', value: 3.4, type: 'X' },
  //       { id: '3', name: 'Fenerbahçe', value: 3.2, type: '2' },
  //       { id: '4', name: 'Üst 2.5', value: 1.9, type: 'over' },
  //       { id: '5', name: 'Alt 2.5', value: 1.9, type: 'under' },
  //       { id: '6', name: 'KG Var', value: 1.8, type: 'btts' },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     sport_key: 'soccer',
  //     home_team: 'Beşiktaş',
  //     away_team: 'Trabzonspor',
  //     commence_time: new Date(Date.now() + 7200000).toISOString(),
  //     league: {
  //       id: '1',
  //       name: 'Süper Lig',
  //       country: 'Türkiye',
  //     },
  //     odds: [
  //       { id: '7', name: 'Beşiktaş', value: 2.5, type: '1' },
  //       { id: '8', name: 'Beraberlik', value: 3.2, type: 'X' },
  //       { id: '9', name: 'Trabzonspor', value: 2.7, type: '2' },
  //       { id: '10', name: 'Üst 2.5', value: 1.7, type: 'over' },
  //       { id: '11', name: 'Alt 2.5', value: 2.1, type: 'under' },
  //       { id: '12', name: 'KG Var', value: 1.6, type: 'btts' },
  //     ],
  //   },
  //   {
  //     id: '3',
  //     sport_key: 'basketball',
  //     home_team: 'Anadolu Efes',
  //     away_team: 'Fenerbahçe Beko',
  //     commence_time: new Date(Date.now() + 5400000).toISOString(),
  //     league: {
  //       id: '3',
  //       name: 'Basketbol Süper Ligi',
  //       country: 'Türkiye',
  //     },
  //     odds: [
  //       { id: '13', name: 'Anadolu Efes', value: 1.9, type: '1' },
  //       { id: '14', name: 'Fenerbahçe Beko', value: 1.9, type: '2' },
  //       { id: '15', name: 'Üst 160.5', value: 1.9, type: 'over' },
  //       { id: '16', name: 'Alt 160.5', value: 1.9, type: 'under' },
  //       { id: '17', name: 'Anadolu Efes -4.5', value: 1.9, type: 'handicap' },
  //       { id: '18', name: 'Fenerbahçe Beko +4.5', value: 1.9, type: 'handicap' },
  //     ],
  //   },
  //   {
  //     id: '4',
  //     sport_key: 'tennis',
  //     home_team: 'Marsel İlhan',
  //     away_team: 'Cem İlkel',
  //     commence_time: new Date(Date.now() + 10800000).toISOString(),
  //     league: {
  //       id: '4',
  //       name: 'ATP Antalya',
  //       country: 'Türkiye',
  //     },
  //     odds: [
  //       { id: '19', name: 'Marsel İlhan', value: 1.7, type: '1' },
  //       { id: '20', name: 'Cem İlkel', value: 2.2, type: '2' },
  //       { id: '21', name: 'Üst 22.5 Oyun', value: 1.9, type: 'over' },
  //       { id: '22', name: 'Alt 22.5 Oyun', value: 1.9, type: 'under' },
  //       { id: '23', name: 'İlhan 2-0', value: 3.5, type: 'correct_score' },
  //       { id: '24', name: 'İlkel 2-0', value: 5.0, type: 'correct_score' },
  //     ],
  //   },
  //   {
  //     id: '5',
  //     sport_key: 'soccer',
  //     home_team: 'Barcelona',
  //     away_team: 'Real Madrid',
  //     commence_time: new Date(Date.now() + 86400000).toISOString(),
  //     league: {
  //       id: '5',
  //       name: 'La Liga',
  //       country: 'İspanya',
  //     },
  //     odds: [
  //       { id: '25', name: 'Barcelona', value: 1.6, type: '1' },
  //       { id: '26', name: 'Beraberlik', value: 4.0, type: 'X' },
  //       { id: '27', name: 'Real Madrid', value: 5.0, type: '2' },
  //       { id: '28', name: 'Üst 3.5', value: 1.9, type: 'over' },
  //       { id: '29', name: 'Alt 3.5', value: 1.9, type: 'under' },
  //       { id: '30', name: 'KG Var', value: 1.7, type: 'btts' },
  //     ],
  //   },
  //   {
  //     id: '6',
  //     sport_key: 'volleyball',
  //     home_team: 'VakıfBank',
  //     away_team: 'Eczacıbaşı',
  //     commence_time: new Date(Date.now() + 43200000).toISOString(),
  //     league: {
  //       id: '6',
  //       name: 'Voleybol Ligi',
  //       country: 'Türkiye',
  //     },
  //     odds: [
  //       { id: '31', name: 'VakıfBank', value: 1.8, type: '1' },
  //       { id: '32', name: 'Eczacıbaşı', value: 2.0, type: '2' },
  //       { id: '33', name: 'VakıfBank 3-0', value: 3.5, type: 'correct_score' },
  //       { id: '34', name: 'Eczacıbaşı 3-0', value: 4.0, type: 'correct_score' },
  //       { id: '35', name: 'Üst 180.5 Sayı', value: 1.9, type: 'over' },
  //       { id: '36', name: 'Alt 180.5 Sayı', value: 1.9, type: 'under' },
  //     ],
  //   },
  //   {
  //     id: '7',
  //     sport_key: 'handball',
  //     home_team: 'Beşiktaş Aygaz',
  //     away_team: 'Spor Toto',
  //     commence_time: new Date(Date.now() + 129600000).toISOString(),
  //     league: {
  //       id: '7',
  //       name: 'Hentbol Süper Ligi',
  //       country: 'Türkiye',
  //     },
  //     odds: [
  //       { id: '37', name: 'Beşiktaş Aygaz', value: 1.5, type: '1' },
  //       { id: '38', name: 'Beraberlik', value: 7.0, type: 'X' },
  //       { id: '39', name: 'Spor Toto', value: 2.5, type: '2' },
  //       { id: '40', name: 'Üst 55.5', value: 1.9, type: 'over' },
  //       { id: '41', name: 'Alt 55.5', value: 1.9, type: 'under' },
  //       { id: '42', name: 'Beşiktaş -3.5', value: 1.85, type: 'handicap' },
  //     ],
  //   },
  //   {
  //     id: '8',
  //     sport_key: 'ice-hockey',
  //     home_team: 'Zeytinburnu Buz Hokeyi',
  //     away_team: 'İzmir Büyükşehir Belediyesi',
  //     commence_time: new Date(Date.now() + 172800000).toISOString(),
  //     league: {
  //       id: '8',
  //       name: 'Buz Hokeyi Süper Ligi',
  //       country: 'Türkiye',
  //     },
  //     odds: [
  //       { id: '43', name: 'Zeytinburnu', value: 1.65, type: '1' },
  //       { id: '44', name: 'Beraberlik', value: 4.5, type: 'X' },
  //       { id: '45', name: 'İzmir BB', value: 2.2, type: '2' },
  //       { id: '46', name: 'Üst 5.5 Gol', value: 1.85, type: 'over' },
  //       { id: '47', name: 'Alt 5.5 Gol', value: 1.95, type: 'under' },
  //       { id: '48', name: 'Zeytinburnu -1.5', value: 2.1, type: 'handicap' },
  //     ],
  //   },
  // ];

  // // Mock bahis geçmişi verileri
  // export const mockBetHistory = [
  //   {
  //     id: 'bet-001',
  //     date: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
  //     status: 'won',
  //     stake: 10,
  //     totalOdds: 3.5,
  //     selections: [
  //       {
  //         event: 'Galatasaray vs Fenerbahçe',
  //         selection: 'Galatasaray',
  //         odds: 2.1,
  //       },
  //       {
  //         event: 'Barcelona vs Real Madrid',
  //         selection: 'Üst 2.5',
  //         odds: 1.7,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'bet-002',
  //     date: new Date(Date.now() - 172800000).toISOString(), // 2 gün önce
  //     status: 'lost',
  //     stake: 20,
  //     totalOdds: 4.2,
  //     selections: [
  //       {
  //         event: 'Beşiktaş vs Trabzonspor',
  //         selection: 'Beşiktaş',
  //         odds: 2.5,
  //       },
  //       {
  //         event: 'Anadolu Efes vs Fenerbahçe Beko',
  //         selection: 'Fenerbahçe Beko',
  //         odds: 1.9,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'bet-003',
  //     date: new Date(Date.now() - 43200000).toISOString(), // 12 saat önce
  //     status: 'pending',
  //     stake: 15,
  //     totalOdds: 5.7,
  //     selections: [
  //       {
  //         event: 'VakıfBank vs Eczacıbaşı',
  //         selection: 'VakıfBank',
  //         odds: 1.8,
  //       },
  //       {
  //         event: 'Marsel İlhan vs Cem İlkel',
  //         selection: 'Marsel İlhan',
  //         odds: 1.7,
  //       },
  //       {
  //         event: 'Zeytinburnu vs İzmir BB',
  //         selection: 'Üst 5.5 Gol',
  //         odds: 1.85,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'bet-004',
  //     date: new Date(Date.now() - 259200000).toISOString(), // 3 gün önce
  //     status: 'won',
  //     stake: 50,
  //     totalOdds: 2.1,
  //     selections: [
  //       {
  //         event: 'Beşiktaş Aygaz vs Spor Toto',
  //         selection: 'Beşiktaş Aygaz',
  //         odds: 1.5,
  //       },
  //       {
  //         event: 'Barcelona vs Real Madrid',
  //         selection: 'Barcelona',
  //         odds: 1.4,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'bet-005',
  //     date: new Date(Date.now() - 345600000).toISOString(), // 4 gün önce
  //     status: 'lost',
  //     stake: 25,
  //     totalOdds: 6.8,
  //     selections: [
  //       {
  //         event: 'Galatasaray vs Fenerbahçe',
  //         selection: 'Beraberlik',
  //         odds: 3.4,
  //       },
  //       {
  //         event: 'Anadolu Efes vs Fenerbahçe Beko',
  //         selection: 'Üst 160.5',
  //         odds: 2.0,
  //       },
  //     ],
  //   },
];
