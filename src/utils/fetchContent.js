const articles = [
  {
    source: { id: null, name: "New York Times" },
    author: "Victor Mather",
    title: "Shane Warne, Cricket Legend, Dies at 52",
    description:
      "Warne’s management company said the Australian star died Friday of a suspected heart attack.",
    url: "https://www.nytimes.com/2022/03/04/sports/cricket/shane-warne-dead.html",
    urlToImage:
      "https://static01.nyt.com/images/2022/03/04/sports/04warneWEB1/merlin_203223255_e7279261-1f33-4aa8-97a8-5401c95fb72e-facebookJumbo.jpg",
    publishedAt: "2022-03-04T18:10:41Z",
    content:
      "Shane Warne, one of the greatest cricket players of all time, and a larger-than-life figure on and off the field, died Friday in Thailand. He was 52.\r\nThe cause was suspected to be a heart attack, hi… [+927 chars]",
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: null,
    title: "Australian cricket legend Warne dies aged 52",
    description:
      "Legendary Australia leg-spinner Shane Warne, one of the greatest cricketers of all time, dies of a suspected heart attack aged 52.",
    url: "https://www.bbc.co.uk/sport/cricket/60622426",
    urlToImage:
      "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/13590/production/_97584297_breaking_news.png",
    publishedAt: "2022-03-04T14:27:53Z",
    content:
      "Legendary Australia leg-spinner Shane Warne, one of the greatest cricketers of all time, has died of a suspected heart attack aged 52.\r\nWarne took 708 Test wickets, the second most of all time, in 14… [+284 chars]",
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: "https://www.facebook.com/bbcnews",
    title:
      "Shane Warne: Australian cricket legend died from natural causes - police",
    description:
      "Thai police say there's no sign of foul play in the cricketer's death while on holiday on Koh Samui.",
    url: "https://www.bbc.co.uk/news/world-asia-60645939",
    urlToImage:
      "https://ichef.bbci.co.uk/news/1024/branded_news/108B7/production/_123576776_mediaitem123576775.jpg",
    publishedAt: "2022-03-07T09:23:35Z",
    content:
      "Image caption, Warne had been on holiday on Koh Samui when he died of a suspected heart attack\r\nAustralian cricket legend Shane Warne's death in Thailand was from natural causes, police have confirme… [+449 chars]",
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: "https://www.facebook.com/bbcnews",
    title:
      "Women's World Cup: An India v Pakistan cricket match minus fireworks",
    description:
      "The arch rivals face each other on Sunday in the Women's ODI cricket World Cup in New Zealand.",
    url: "https://www.bbc.co.uk/news/world-asia-india-60572874",
    urlToImage:
      "https://ichef.bbci.co.uk/news/1024/branded_news/5769/production/_123477322_gettyimages-805583774-594x594.jpg",
    publishedAt: "2022-03-05T01:29:12Z",
    content:
      "Image source, Getty Images\r\nImage caption, India's star batter Smriti Mandhana has recovered from a blow on her helmet in a warm-up game\r\nArch rivals India and Pakistan will face each other in a marq… [+5340 chars]",
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: null,
    title:
      "South Africa survive to beat Pakistan at Women's Cricket World Cup",
    description:
      "South Africa survive to beat Pakistan by six runs in another thrilling finish at the Women's Cricket World Cup.",
    url: "https://www.bbc.co.uk/sport/cricket/60673994",
    urlToImage:
      "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/FA50/production/_123608046_southafricacelebrate.jpg",
    publishedAt: "2022-03-11T08:09:01Z",
    content:
      "South Africa have won both of their games at the Women's Cricket World Cup\r\n<table><tr><th>Women's World Cup, Tauranga</th></tr>\r\n<tr><td>South Africa 223-9 (50 overs): Wolvaardt 75, Luus 62</td></tr… [+658 chars]",
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: null,
    title:
      "Small change will not make the difference English cricket needs, says Strauss",
    description:
      "Sir Andrew Strauss warns that English cricket may need more than just incremental change if it wants to produce a quality men's Test team.",
    url: "https://www.bbc.co.uk/sport/cricket/60741103",
    urlToImage:
      "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/D4E4/production/_123700545_gettyimages-1385156497.jpg",
    publishedAt: "2022-03-14T18:20:20Z",
    content:
      "'We don't have a moment to lose' - Strauss on review of domestic cricket\r\nSir Andrew Strauss has warned that English cricket may need more than just incremental change if it wants to produce a qualit… [+4722 chars]",
  },
  {
    source: { id: null, name: "New York Times" },
    author: "Rory Smith",
    title: "Roman Abramovich and the End of Soccer’s Oligarch Era",
    description:
      "Stripped of its Russian benefactor, Chelsea now faces a reckoning. Soccer’s will come next.",
    url: "https://www.nytimes.com/2022/03/11/sports/soccer/roman-abramovich-chelsea.html",
    urlToImage:
      "https://static01.nyt.com/images/2022/03/11/multimedia/11rory-roman2/11rory-roman2-facebookJumbo.jpg",
    publishedAt: "2022-03-11T16:00:07Z",
    content:
      "We would be here for a long time if I listed every single Brooklynite who wrote in, last week, to inform me that there are, as it happens, several cricket grounds in Brooklyn. There are so many, in f… [+976 chars]",
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: null,
    title:
      "England looking to defend trophy with Women's Cricket World Cup set to begin",
    description:
      "The Women's Cricket World Cup in New Zealand gets under way on Friday, with England looking to defend the trophy they won in 2017.",
    url: "https://www.bbc.co.uk/sport/cricket/60583044",
    urlToImage:
      "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/CFA5/production/_123475135_worldcupsplit.jpg",
    publishedAt: "2022-03-03T06:48:09Z",
    content:
      "Eight teams are taking part in the Women's Cricket World Cup\r\n<table><tr><th>ICC Women's World Cup 2022</th></tr>\r\n<tr><td>Hosts: New Zealand (six venues) Dates: 4 March - 3 April</td></tr><tr><td>BB… [+5566 chars]",
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: null,
    title:
      "Cummins, Root & Strauss lead tributes paid to 'greatest showman' Warne",
    description:
      'Australia Test captain Pat Cummins calls Shane Warne a "once-in-a-century cricketer" as he leads tributes to the iconic leg-spinner who died on Friday aged 52.',
    url: "https://www.bbc.co.uk/sport/cricket/60626656",
    urlToImage:
      "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/AEB3/production/_123532744_gettyimages-53352186.jpg",
    publishedAt: "2022-03-04T20:52:16Z",
    content:
      "Shane Warne: Pat Cummins pays tribute to 'all-time great'\r\nAustralia Test captain Pat Cummins says Shane Warne was a \"once-in-a-century cricketer\" as he led the tributes to the iconic leg-spinner who… [+4210 chars]",
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: null,
    title: "Meg Lanning: Australia's captain desperate for World Cup success",
    description:
      "She is the best player in possibly the best international sports side in the world - but who is the real Meg Lanning?",
    url: "https://www.bbc.co.uk/sport/cricket/60892215",
    urlToImage:
      "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/34F9/production/_123916531_lanningindex.png",
    publishedAt: "2022-03-29T05:36:36Z",
    content:
      "Meg Lanning has won more than 200 caps for Australia\r\n<table><tr><th>ICC Women's World Cup semi-final: Australia v West Indies</th></tr>\r\n<tr><td>Date: 29 March Time: 23:00 BST Venue: Basin Reserve, … [+6695 chars]",
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: "https://www.facebook.com/bbcnews",
    title: "Shane Warne: Hurley pays tribute to 'beloved lionheart'",
    description:
      "Elizabeth Hurley remembers her former fiance as her son Damian describes him as a father figure.",
    url: "https://www.bbc.co.uk/news/uk-60634012",
    urlToImage:
      "https://ichef.bbci.co.uk/news/1024/branded_news/2F98/production/_123548121_gettyimages-131212973-1.jpg",
    publishedAt: "2022-03-05T17:30:04Z",
    content:
      'Image source, Getty Images\r\nElizabeth Hurley has paid tribute to former fiance Shane Warne as her "beloved lionheart", after the cricket legend\'s death aged 52.\r\nThe model and actress posted a series… [+997 chars]',
  },
  {
    source: { id: "reuters", name: "Reuters" },
    author: null,
    title: 'West Indies cricket "pioneer" Ramadhin dies aged 92 - Reuters',
    description:
      'Former test spinner Sonny Ramadhin, a key part of the West Indies side that won a first away series in England in 1950 and described as "pioneer" of the game, has died aged 92, officials said.',
    url: "https://www.reuters.com/lifestyle/sports/west-indies-cricket-pioneer-ramadhin-dies-aged-92-2022-02-27/",
    urlToImage:
      "https://www.reuters.com/pf/resources/images/reuters/reuters-default.png?d=75",
    publishedAt: "2022-02-27T22:08:00Z",
    content:
      'Feb 27 (Reuters) - Former test spinner Sonny Ramadhin, a key part of the West Indies side that won a first away series in England in 1950 and described as "pioneer" of the game, has died aged 92, off… [+1107 chars]',
  },
  {
    source: { id: "reuters", name: "Reuters" },
    author: null,
    title: "Disney without cricket risks its streaming game - Reuters",
    description:
      'Cricket has been a magic wand for Walt Disney <a href="https://www.reuters.com/companies/DIS.N" target="_blank">(DIS.N)</a> in India. The $270 billion entertainment giant holds the exclusive rights for lucrative Indian Premier League cricket, but these are no…',
    url: "https://www.reuters.com/markets/asia/disney-without-cricket-risks-its-streaming-game-2022-03-03/",
    urlToImage:
      "https://www.reuters.com/pf/resources/images/reuters/reuters-default.png?d=77",
    publishedAt: "2022-03-03T15:29:00Z",
    content:
      "NEW YORK, March 3 (Reuters Breakingviews) - Cricket has been a magic wand for Walt Disney (DIS.N) in India. The $270 billion entertainment giant holds the exclusive rights for lucrative Indian Premie… [+3897 chars]",
  },
  {
    source: { id: "reuters", name: "Reuters" },
    author: null,
    title:
      "Rafiq fears he may never work again after speaking out about racism - Reuters.com",
    description:
      "Former Yorkshire spinner Azeem Rafiq fears speaking out about racism in English cricket has made him unemployable.",
    url: "https://www.reuters.com/lifestyle/sports/rafiq-fears-he-may-never-work-again-after-speaking-out-about-racism-2022-03-08/",
    urlToImage:
      "https://www.reuters.com/resizer/xtwFIVcWEkfcQnBAOQAShEg1vuA=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/QAAPZZI3DZKOVP2YT6ANZGUNLE.jpg",
    publishedAt: "2022-03-08T17:44:00Z",
    content:
      "March 8 (Reuters) - Former Yorkshire spinner Azeem Rafiq fears speaking out about racism in English cricket has made him unemployable.\r\nRafiq, who is of Pakistani descent, told a British parliamentar… [+2108 chars]",
  },
  {
    source: { id: "reuters", name: "Reuters" },
    author: null,
    title:
      "Pakistan, Australia vie for series win as test returns to Lahore - Reuters.com",
    description:
      "Pakistan and Australia head into a winner-take-all third and final test from Monday as test cricket returns to Lahore's Gaddafi Stadium for the first time since the 2009 attack by gunmen on a bus carrying the Sri Lankan cricket team. (For a FACTBOX on the mat…",
    url: "https://www.reuters.com/lifestyle/sports/pakistan-australia-vie-series-win-test-returns-lahore-2022-03-20/",
    urlToImage:
      "https://www.reuters.com/resizer/uFoxVuyCIZHd4cn9k1Vx0l3RBSY=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/UPRO73SNUZOB3BJ6JKFVGMARMY.jpg",
    publishedAt: "2022-03-20T09:01:00Z",
    content:
      "March 20 (Reuters) - Pakistan and Australia head into a winner-take-all third and final test from Monday as test cricket returns to Lahore's Gaddafi Stadium for the first time since the 2009 attack b… [+1978 chars]",
  },
];

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://oshaberi-backend.herokuapp.com"
    : "http://localhost:5000";

const fetchNews = (topic, count, callback, errorCallback) => {
  // fetch latest news from google on the given topic
  fetch(
    `https://newsapi.org/v2/everything?q=${topic}&pageSize=${count}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      callback(data.articles);
    })
    .catch((err) => {
      console.error(err);
      errorCallback(err);
    });
  // callback(articles);
};

const fetchTweets = (topic, count, callback, errorCallback) => {
  fetch(BASE_URL + `/getTweets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic, count }),
  })
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      console.error(err);
      errorCallback(err);
    });
};

const fetchGoogleSearch = (topic, count, callback, errorCallback) => {
  let n_t = topic;
  n_t = n_t.replace(/\s+/g, "+").toLowerCase();
  console.log(n_t);
  fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_GOOGLE_SEARCH_KEY}&cx=017576662512468239146:omuauf_lfve&q=${n_t}&num=${count}`
  )
    .then((res) => res.json())
    .then((data) => {
      callback(data?.items ?? []);
    })
    .catch((err) => {
      console.error(err);
      errorCallback(err);
    });
};

export { fetchNews, fetchTweets, fetchGoogleSearch };
