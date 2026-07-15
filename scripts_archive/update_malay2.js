const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Manassinakkare",
"Swapnakkoodu",
"War & Love",
"Pattanathil Sundaran",
"Vellithira",
"Chakram",
"Pulival Kalyanam",
"Pattaalam",
"Ammakilikkoodu",
"Mizhi Randilum",
"Swapnam Kondu Thulabharam",
"Ente Veedu Appuvinteyum",
"Padam Onnu Oru Vilapam",
"Meerayude Dukhavum Muthuvinte Swapnavum",
"C.I.D. Moosa",
"Chronic Bachelor",
"Kasthooriman",
"Gramaphone",
"Hariharan Pillai Happy Aanu",
"Vellinakshatram",
"Kaazhcha",
"Sethurama Iyer CBI",
"Runway",
"Perumazhakkalam",
"Black",
"Vamanapuram Bus Route",
"Greetings",
"Natturajavu",
"Rasikan",
"Mayilattam",
"Youth Festival",
"Akale",
"Aparichithan",
"Nothing but Life",
"Koottu",
"Wanted",
"Thudakkam",
"Udayananu Tharam",
"Amrutham",
"Athbhutha Dweepu",
"Ben Johnson",
"Boyy Friennd",
"Bus Conductor",
"Chandrolsavam",
"Chanthupottu",
"Daivanamathil",
"Deepangal Sakshi",
"Finger Print",
"Hridayathil Sookshikkan",
"Iruvattam Manavatti",
"Kochi Rajavu",
"Lokanathan IAS",
"Made in USA",
"Mayookham",
"Naran",
"Nerariyan CBI",
"Oru Naal Oru Kanavu",
"Pandippada",
"Rajamanikyam",
"Rappakal",
"Thaskara Veeran",
"Thanmathra",
"The Tiger",
"Anandabhadram",
"Alice in Wonderland",
"Lion",
"Achuvinte Amma",
"Rasathanthram",
"Classmates",
"Keerthi Chakra",
"Chess",
"Chinthamani Kolacase",
"Karutha Pakshikal",
"Kisan",
"Kilukkam Kilukilukkam",
"Lion",
"Madhuchandralekha",
"Mahasamudram",
"Notebook",
"Out of Syllabus",
"Pachakuthira",
"Palunku",
"Photographer",
"Pothan Vava",
"Prajapathi",
"Smart City",
"Thuruppu Gulan",
"Vadakkumnadhan",
"Vaasthavam",
"Vargam",
"Yes Your Honour",
"Ali Bhai",
"Arabikkatha",
"Big B",
"Chocolate",
"Detective",
"Ekantham",
"Flash",
"Goal",
"Hallo",
"Heart Beats",
"Kangaroo",
"Katha Parayumbol"
];

const cleanedBatch = newBatch.map(name => {
  let s = name.replace(/[^a-zA-Z0-9\s]/g, ' ');
  s = s.replace(/\s+/g, ' ').trim().toLowerCase();
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
  console.log(`Updated wordBanks.js with ${deduped.length} Malayalaglish movies (added second batch).`);
} else {
  console.log("Could not find the malayalaglish_movies section.");
}
