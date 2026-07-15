const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Poove Poochudava",
"Aan Paavam",
"Amman Kovil Kizhakale",
"Mouna Ragam",
"Mr. Bharath",
"Naan Adimai Illai",
"Oomai Vizhigal",
"Punnagai Mannan",
"Vidinja Kalyanam",
"Dharma Pathini",
"Maaveeran",
"Velaikaran",
"Nayakan",
"Manathil Uruthi Vendum",
"Enga Chinna Rasa",
"Kadhal Parisu",
"Vedham Pudhithu",
"Per Sollum Pillai",
"Sattam Oru Vilaiyaattu",
"Agni Natchathiram",
"Dharmathin Thalaivan",
"En Bommukutty Ammavukku",
"En Thangachi Padichava",
"Guru Sishyan",
"Kodi Parakuthu",
"Paasa Paravaigal",
"Poonthotta Kaavalkaaran",
"Senthoora Poove",
"Soora Samhaaram",
"Unnal Mudiyum Thambi",
"Apoorva Sagodharargal",
"Karagattakaran",
"Mappillai",
"Rajathi Raja",
"Siva",
"Varusham 16",
"Vaathiyaar Veettu Pillai",
"Pudhea Paadhai",
"Paandi Nattu Thangam",
"Samsara Sangeetham",
"Anjali",
"Keladi Kanmani",
"Kizhakku Vasal",
"Michael Madana Kama Rajan",
"Nadigan",
"Ooru Vittu Ooru Vandhu",
"Panakkaran",
"Pulan Visaranai",
"Pudhu Pudhu Arthangal",
"Thalapathi",
"Bramma",
"Captain Prabhakaran",
"Chinna Gounder",
"Dharmadurai",
"Guna",
"Mannan",
"Pandiyan",
"Rickshaw Mama",
"Roja",
"Annamalai",
"Devar Magan",
"Chinna Thambi",
"Chembaruthi",
"Naalaiya Theerpu",
"Senthamizh Paattu",
"Singaravelan",
"Thevar Magan",
"Vanna Vanna Pookkal",
"Yejaman",
"Ejamaan",
"Kalaignan",
"Uzhaippali",
"Walter Vetrivel",
"Amaidhi Padai",
"Duet",
"Honest Raj",
"Karuththamma",
"Mahanadhi",
"Nammavar",
"Priyanka",
"Veera",
"Baashha",
"Bombay",
"Kuruthipunal",
"Muthu",
"Sathi Leelavathi",
"Indira",
"Avvai Shanmugi",
"Indian",
"Kadhal Kottai",
"Poove Unakkaga",
"Love Today",
"Gokulathil Seethai",
"Mr. Romeo",
"Ullasam",
"Arunachalam",
"Iruvar",
"Minsara Kanavu",
"Nerrukku Ner",
"Thedinen Vandhadhu",
"Pistha"
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
  console.log(`Updated wordBanks.js with ${deduped.length} Tamil movies (added fourth batch).`);
} else {
  console.log("Could not find the tamiglish_movies section.");
}
