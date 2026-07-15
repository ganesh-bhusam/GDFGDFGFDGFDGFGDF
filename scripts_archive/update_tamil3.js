const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Vietnam Veedu",
"Enga Mama",
"Mattukkara Velan",
"Namma Kuzhandaigal",
"En Annan",
"Maanavan",
"Thedi Vandha Mappillai",
"Sorgam",
"Raman Ethanai Ramanadi",
"Engirundho Vandhaal",
"CID Shankar",
"Maalathi",
"Thalaivan",
"Penn Deivam",
"Namma Veettu Deivam",
"Kaaviya Thalaivi",
"Anadhai Aanandhan",
"Ethiroli",
"Paadhukaappu",
"Navagraham",
"Rickshawkaran",
"Adi Parasakthi",
"Annai Velankanni",
"Iru Thuruvam",
"Justice Viswanathan",
"Neerum Neruppum",
"Oru Thaai Makkal",
"Sumathi En Sundari",
"Thanga Gopuram",
"Moondru Deivangal",
"Raja",
"Savale Samali",
"Babu",
"Kumarikottam",
"Muhammad bin Tughluq",
"Annamitta Kai",
"Nalla Neram",
"Pattikada Pattanama",
"Gnana Oli",
"Vasantha Maligai",
"Kasethan Kadavulada",
"Dharmam Engey",
"Needhi",
"Raman Thediya Seethai",
"Pillaiyo Pillai",
"Annamalai",
"Ganga Gowri",
"Bharatha Vilas",
"Rajaraja Cholan",
"Arangetram",
"Engal Thanga Raja",
"Gauravam",
"Karaikkal Ammaiyar",
"Manidharil Manickam",
"Nathayil Muthu",
"Ponnunjal",
"Sollathaan Ninaikkiren",
"Ulagam Sutrum Valiban",
"Veettukku Vandha Marumagal",
"Vandhale Maharasi",
"Thirumalai Deivam",
"Engamma Sapatham",
"Netru Indru Naalai",
"Urimaikural",
"Sivagamiyin Selvan",
"Thanga Pathakkam",
"Anbai Thedi",
"Aval Oru Thodar Kathai",
"Dheerga Sumangali",
"Naan Avanillai",
"Panathukkaga",
"Athaiya Mamiya",
"Thaai",
"Vairam",
"Idhayakkani",
"Ninaithadhai Mudippavan",
"Pallandu Vazhga",
"Dr. Siva",
"Apoorva Raagangal",
"Andharangam",
"Cinema Paithiyam",
"Eduppar Kai Pillai",
"Naalai Namadhe",
"Mannavan Vanthaanadi",
"Melnaattu Marumagal",
"Pattikkaattu Raja",
"Then Sindhudhe Vaanam",
"Thiruvarul",
"Yarukkum Vetkam Illai",
"Avargal",
"16 Vayathinile",
"Aadu Puli Attam",
"Aattukara Alamelu",
"Bhuvana Oru Kelvi Kuri",
"Deepam",
"Gayathri",
"Kavikkuyil",
"Naam Pirandha Mann",
"Pathinaru Vayathinile"
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
  console.log(`Updated wordBanks.js with ${deduped.length} Tamil movies (added third batch).`);
} else {
  console.log("Could not find the tamiglish_movies section.");
}
