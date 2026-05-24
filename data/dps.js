// =====================================================================
// ADD NEW DPs HERE
// =====================================================================
// To add someone to the directory:
// 1. Copy one of the entries below (everything between { and },)
// 2. Paste it at the bottom of the list (before the closing ])
// 3. Fill in their details
// 4. Save the file, push to GitHub, the site rebuilds automatically
//
// The "id" field must be unique — just use the next number.
// Leave "died" blank (null) for living DPs.
// "status" is either "historical" or "active".
// =====================================================================

export const dps = [
  {
    id: 1,
    name: 'James Wong Howe',
    lifespan: '1899–1976',
    born: 1899,
    died: 1976,
    heritage: 'Chinese American',
    origin: 'Taishan, Guangdong → Pasco, WA',
    status: 'historical',
    credits: 142,
    society: 'ASC',
    awards: [
      'Oscar — The Rose Tattoo (1955)',
      'Oscar — Hud (1963)',
      '10 Academy Award nominations',
    ],
    notable: ['The Rose Tattoo', 'Hud', 'Body and Soul', 'Sweet Smell of Success', 'Funny Lady'],
    contribution: 'Pioneer of deep-focus cinematography, low-hung ceilings, and handheld camera (famously shot the Body and Soul boxing sequence on roller skates). First Asian American to win an Oscar in cinematography — twice.',
    era: 'Golden Age',
    source: 'ASC archive, American Cinematographer (1941), Wikipedia',
  },
  {
    id: 2,
    name: 'Michael Goi',
    lifespan: 'b. 1959',
    born: 1959,
    died: null,
    heritage: 'Japanese American',
    origin: 'Chicago, IL',
    status: 'active',
    credits: 80,
    society: 'ASC, ISC',
    awards: ['ASC President 2009–2012'],
    notable: ['American Horror Story', 'Salem', 'The Rookie', 'Glee'],
    contribution: 'First Asian American president of the ASC (2009–2012). Prolific television cinematographer who also directs.',
    era: 'Contemporary',
    source: 'Wikipedia, ASC',
  },
  {
    id: 3,
    name: 'Matthew Libatique',
    lifespan: 'b. 1968',
    born: 1968,
    died: null,
    heritage: 'Filipino American',
    origin: 'New York, NY',
    status: 'active',
    credits: 91,
    society: 'ASC',
    awards: ['2× Oscar nominee (Black Swan, A Star Is Born)', '3× ASC Award nominee'],
    notable: ['Pi', 'Requiem for a Dream', 'Black Swan', 'A Star Is Born', 'Maestro', 'Iron Man'],
    contribution: 'Longtime collaborator with Darren Aronofsky since Pi (1998). First Filipino American to be nominated for the Best Cinematography Oscar.',
    era: 'Contemporary',
    source: 'Wikipedia, ASC, Rappler',
  },
  {
    id: 4,
    name: 'Larry Fong',
    lifespan: 'b. ~1959',
    born: 1959,
    died: null,
    heritage: 'Chinese American',
    origin: 'Los Angeles, CA',
    status: 'active',
    credits: 60,
    society: 'ASC',
    awards: ['ASC nomination — Lost pilot (2005)', '3× MTV Video of the Year'],
    notable: ['300', 'Watchmen', 'Super 8', 'Lost (pilot)', 'Kong: Skull Island', 'Damsel'],
    contribution: 'Defined the look of Zack Snyder\'s early career. Started in music videos including R.E.M.\'s "Losing My Religion."',
    era: 'Contemporary',
    source: 'Wikipedia, ASC, AsianConnections',
  },
  {
    id: 5,
    name: 'Quyen Tran',
    lifespan: 'b. 1970s',
    born: 1976,
    died: null,
    heritage: 'Vietnamese American',
    origin: 'South Vietnam → Los Angeles',
    status: 'active',
    credits: 77,
    society: 'ASC',
    awards: ['Variety 10 Cinematographers to Watch (2019)', 'AC Rising Star (2017)'],
    notable: ['Palm Springs', 'Unbelievable', 'Ahsoka', 'The Pitt', 'The Little Hours'],
    contribution: 'Daughter of South Vietnamese refugees. Former 9/11 still photographer who pivoted to cinematography. ASC member since 2021.',
    era: 'Contemporary',
    source: 'Wikipedia, ASC, Variety',
  },
  {
    id: 6,
    name: 'Autumn Durald Arkapaw',
    lifespan: 'b. 1979',
    born: 1979,
    died: null,
    heritage: 'Filipina + Black Creole American',
    origin: 'Oxnard, CA',
    status: 'active',
    credits: 40,
    society: 'ASC',
    awards: [
      'Oscar — Sinners (2026)',
      'First woman and first woman of color to win Best Cinematography',
    ],
    notable: ['Sinners', 'Black Panther: Wakanda Forever', 'The Last Showgirl', 'Loki', 'Teen Spirit'],
    contribution: 'First woman, and first person of Filipino or Black descent, to win the Academy Award for Best Cinematography (2026). First woman to shoot a feature on IMAX 65mm film.',
    era: 'Contemporary',
    source: 'Wikipedia, Blavity, Vogue Philippines',
    highlight: true,
  },

  // =================================================================
  // PASTE NEW ENTRIES BELOW THIS LINE
  // =================================================================
  // Template — copy this block and fill it in:
  //
  // {
  //   id: 7,
  //   name: '',
  //   lifespan: '',
  //   born: 0000,
  //   died: null,
  //   heritage: '',
  //   origin: '',
  //   status: 'active',
  //   credits: 0,
  //   society: '',
  //   awards: [''],
  //   notable: [''],
  //   contribution: '',
  //   era: 'Contemporary',
  //   source: '',
  // },

];
