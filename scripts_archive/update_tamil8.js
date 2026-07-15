const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Lal Salaam",
"Lover",
"Blue Star",
"Singapore Saloon",
"Siren",
"Garudan",
"Star",
"Aranmanai 4",
"Maharaja",
"Indian 2",
"Raayan",
"Nanban Oruvan Vandha Piragu",
"Boat",
"Vaazhai",
"Kottukkaali",
"Lubber Pandhu",
"Meiyazhagan",
"Black",
"Brother",
"Bloody Beggar",
"Amaran",
"Kanguva",
"Miss You",
"Phoenix",
"Vidaamuyarchi",
"Dragon",
"Nilavuku En Mel Ennadi Kobam",
"Aghathiyaa",
"Kingston",
"Veera Dheera Sooran",
"Test",
"Good Bad Ugly",
"Retro",
"Tourist Family",
"DD Next Level",
"Thug Life",
"Maaman",
"Kuberaa",
"3BHK",
"Phoenix Returns",
"Coolie",
"Bison",
"Karuppu",
"Benz",
"Suriya 45",
"SK 23",
"Parasakthi",
"Idly Kadai",
"Train",
"Vaa Vaathiyaar",
"Perusu",
"Genie",
"Diesel",
"Ace",
"Love Insurance Kompany",
"Mr. X",
"Sabdham",
"Madharasi"
];

const cleanedBatch = newBatch.map(name => {
  let s = name.replace(/[^a-zA-Z0-9\s]/g, ' ');
  s = s.replace(/\s+/g, ' ').trim().toLowerCase();
  return s;
}).filter(s => s.length > 0);

const match = content.match(/2:\s*\{\s*code:\s*'tamiglish_movies',\s*name:\s*'Tamiglish Movies',\s*words:\s*(\[.*?\])\s*\}/s);
if (match) {
  let currentArray = eval(match[1]);
  const combined = [...currentArray, ...cleanedBatch];
  const deduped = Array.from(new Set(combined));
  
  const replacement = "2: { code: 'tamiglish_movies', name: 'Tamiglish Movies', words: " + JSON.stringify(deduped) + " },";
  content = content.replace(/2:\s*\{\s*code:\s*'tamiglish_movies',\s*name:\s*'Tamiglish Movies',\s*words:\s*\[.*?\]\s*\}/s, replacement);
  fs.writeFileSync(wbPath, content);
  console.log(`Updated wordBanks.js with ${deduped.length} Tamil movies (added eighth batch).`);
} else {
  console.log("Could not find the tamiglish_movies section.");
}
