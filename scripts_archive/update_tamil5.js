const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Kadhalukku Mariyadhai",
"Jeans",
"Aval Varuvala",
"Unnidathil Ennai Koduthen",
"Natpukkaga",
"Kaadhale Nimmadhi",
"Harichandra",
"Sollamale",
"Marumalarchi",
"Naam Iruvar Namakku Iruvar",
"Sethu",
"Padayappa",
"Vaali",
"Amarkalam",
"Poovellam Kettuppar",
"Mudhalvan",
"Thulladha Manamum Thullum",
"Unnaruge Naan Irundhal",
"Jodi",
"Endrendrum Kadhal",
"Kannukkul Nilavu",
"Kushi",
"Vaanathaippola",
"Priyamaanavale",
"Rhythm",
"Thenali",
"Mugavaree",
"Pennin Manathai Thottu",
"Parthen Rasithen",
"Budget Padmanabhan",
"Friends",
"Badri",
"Dheena",
"Citizen",
"12B",
"Anandham",
"Aanandham",
"Minnale",
"Poovellam Un Vasam",
"Samuthiram",
"Shahjahan",
"Star",
"Rishi",
"Nandha",
"Ramanaa",
"Azhagi",
"Red",
"Thamizhan",
"Youth",
"Gemini",
"Run",
"King",
"Mounam Pesiyadhe",
"Panchathanthiram",
"Villain",
"Baba",
"Bagavathi",
"Five Star",
"Kadhal Virus",
"April Maadhathil",
"Dhool",
"Saamy",
"Anbe Sivam",
"Winner",
"Pithamagan",
"Kaakha Kaakha",
"Boys",
"Thirumalai",
"Autograph",
"Ghilli",
"Virumaandi",
"7G Rainbow Colony",
"Manmadhan",
"Arul",
"Perazhagan",
"Aayutha Ezhuthu",
"Chellamae",
"Madhurey",
"New",
"Jana",
"Attahasam",
"Chandramukhi",
"Anniyan",
"Sachein",
"Thotti Jaya",
"Sandakozhi",
"Sivakasi",
"Majaa",
"Thavamai Thavamirundhu",
"Vettaiyaadu Vilaiyaadu",
"Em Magan",
"Unakkum Enakkum",
"Pudhupettai",
"Vallavan",
"Varalaru",
"Paruthiveeran",
"Mozhi",
"Chennai 600028",
"Pokkiri",
"Deepavali"
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
  console.log(`Updated wordBanks.js with ${deduped.length} Tamil movies (added fifth batch).`);
} else {
  console.log("Could not find the tamiglish_movies section.");
}
