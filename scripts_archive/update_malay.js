const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Narasimham",
"Life Is Beautiful",
"Millennium Stars",
"Arayannangalude Veedu",
"Dada Sahib",
"Daivathinte Makan",
"Darling Darling",
"Devadoothan",
"Dreamz",
"Cover Story",
"Indriyam",
"Joker",
"Kochu Kochu Santhoshangal",
"Madhuranombarakattu",
"Mark Antony",
"Mazha",
"Nadan Pennum Natupramaniyum",
"Narasimham",
"Pilots",
"Priyam",
"Punaradhivasam",
"Sathyameva Jayathe",
"Sayahnam",
"Shaantham",
"Shraddha",
"Snehapoorvam Anna",
"Susanna",
"The Gang",
"The Warrant",
"Thenkasipattanam",
"Varnakkazhchakal",
"Vinayapoorvam Vidyadharan",
"Aanamuttathe Aangalamar",
"Achaneyanenikkishtam",
"Bharthavudyogam",
"Dubai",
"Dosth",
"Ee Parakkum Thalika",
"Fort Kochi",
"Goa",
"Ishtam",
"Kakkakuyil",
"Karumadikkuttan",
"Kinaripuzhayoram",
"Meghamalhar",
"Nagaravadhu",
"Naranathu Thampuran",
"Nariman",
"One Man Show",
"Praja",
"Rakshasa Rajavu",
"Randam Bhavam",
"Ravanaprabhu",
"Saivar Thirumeni",
"Sharja To Sharja",
"Soothradharan",
"Sundara Purushan",
"Uthaman",
"Vakkalathu Narayanankutty",
"www.Anukudumbam.com",
"Meesha Madhavan",
"Kalyanaraman",
"Nammal",
"Kanmashi",
"Phantom",
"Bamboo Boys",
"Chathurangam",
"Chirikkudukka",
"Desam",
"Ente Hridayathinte Udama",
"Jagathi Jagadish in Town",
"Kunjikoonan",
"Mazhathullikkilukkam",
"Nakshathrakkannulla Rajakumaran Avanundoru Rajakumari",
"Nandanam",
"Oomappenninu Uriyadappayyan",
"Pakalpooram",
"Puthooramputhri Unniyarcha",
"Sesham",
"Shivam",
"Stop Violence",
"Thandavam",
"Thilakkam",
"Valkannadi",
"Videsi Nair Swadesi Nair",
"Vietnam Colony",
"Yathrakarude Sradhakku",
"Anyar",
"Balettan",
"C.I.D. Moosa",
"Chronic Bachelor",
"Choonda",
"Gramaphone",
"Hariharan Pillai Happy Aanu",
"Hungama",
"Ivar",
"Kasthooriman",
"Kilichundan Mampazham",
"Manassinakkare"
];

const cleanedBatch = newBatch.map(name => {
  let s = name.replace(/[^a-zA-Z0-9\s]/g, ' ');
  s = s.replace(/\s+/g, ' ').trim().toLowerCase();
  if (s === 'www anukudumbam com') s = 'www anukudumbam com'; // just an example, the regex takes care of it
  return s;
}).filter(s => s.length > 0);

const match = content.match(/8:\s*\{\s*code:\s*'malayalaglish_movies',\s*name:\s*'Malayalaglish Movies',\s*words:\s*(\[.*?\])\s*\}/s);
if (match) {
  let currentArray = eval(match[1]);
  if (currentArray.length <= 5) {
    currentArray = [];
  }
  const combined = [...currentArray, ...cleanedBatch];
  const deduped = Array.from(new Set(combined));
  
  const replacement = "8: { code: 'malayalaglish_movies', name: 'Malayalaglish Movies', words: " + JSON.stringify(deduped) + " },";
  content = content.replace(/8:\s*\{\s*code:\s*'malayalaglish_movies',\s*name:\s*'Malayalaglish Movies',\s*words:\s*\[.*?\]\s*\}/s, replacement);
  fs.writeFileSync(wbPath, content);
  console.log(`Updated wordBanks.js with ${deduped.length} Malayalaglish movies (added first batch).`);
} else {
  console.log("Could not find the malayalaglish_movies section.");
}
