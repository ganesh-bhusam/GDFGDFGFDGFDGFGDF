const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Billa",
"Vel",
"Kalloori",
"Polladhavan",
"Pirivom Santhippom",
"Yaaradi Nee Mohini",
"Anjathe",
"Santosh Subramaniam",
"Dasavathaaram",
"Subramaniapuram",
"Saroja",
"Poi Solla Porom",
"Abhiyum Naanum",
"Raman Thediya Seethai",
"Vaaranam Aayiram",
"Silambattam",
"Padikkadavan",
"Ayan",
"Naadodigal",
"Sarvam",
"Maasilamani",
"Aadhavan",
"Unnaipol Oruvan",
"Kanthaswamy",
"Peranmai",
"Renigunta",
"Naan Kadavul",
"Goa",
"Paiyaa",
"Angadi Theru",
"Singam",
"Madrasapattinam",
"Boss Engira Bhaskaran",
"Mynaa",
"Kalavani",
"Vinnaithaandi Varuvaayaa",
"Enthiran",
"Manmadhan Ambu",
"Siruthai",
"Aadukalam",
"Ko",
"Avan Ivan",
"Deiva Thirumagal",
"Mankatha",
"Vaagai Sooda Vaa",
"Engeyum Eppodhum",
"7aum Arivu",
"Mayakkam Enna",
"Nanban",
"Vazhakku Enn 18/9",
"Pizza",
"Naduvula Konjam Pakkatha Kaanom",
"Sundarapandian",
"Kumki",
"Neerparavai",
"Thuppakki",
"Podaa Podi",
"Alex Pandian",
"Kadal",
"Paradesi",
"Ethir Neechal",
"Soodhu Kavvum",
"Neram",
"Raja Rani",
"Varuthapadatha Valibar Sangam",
"Thalaivaa",
"Maryan",
"Arrambam",
"Pandiya Naadu",
"Endrendrum Punnagai",
"Jilla",
"Veeram",
"Goli Soda",
"Thegidi",
"Cuckoo",
"Maan Karate",
"Kochadaiiyaan",
"Saivam",
"Velaiilla Pattadhari",
"Jigarthanda",
"Kaththi",
"Poojai",
"Madras",
"Kayal",
"I",
"Anegan",
"Kaaka Muttai",
"Komban",
"O Kadhal Kanmani",
"Papanasam",
"Thani Oruvan",
"Naanum Rowdy Dhaan",
"Maya",
"Vedalam",
"Pasanga 2",
"Rajini Murugan",
"24",
"Theri",
"Iraivi",
"Joker",
"Kabali",
"Dharma Durai",
"Remo"
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
  console.log(`Updated wordBanks.js with ${deduped.length} Tamil movies (added sixth batch).`);
} else {
  console.log("Could not find the tamiglish_movies section.");
}
