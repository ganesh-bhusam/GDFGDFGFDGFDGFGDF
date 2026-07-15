const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Anchakkallakokkan",
"Varshangalkku Shesham",
"Aavesham",
"Jai Ganesh",
"Guruvayoor Ambalanadayil",
"Malayalee from India",
"Nadikar",
"Thalavan",
"Golam",
"Gaganachari",
"Ullozhukku",
"Level Cross",
"Nunakkuzhi",
"Adios Amigo",
"Kondal",
"Kishkindha Kaandam",
"ARM",
"Ajayante Randam Moshanam",
"Bougainvillea",
"Pani",
"Hello Mummy",
"Sookshmadarshini",
"I Am Kathalan",
"Rifle Club",
"Marco",
"Barroz",
"Identity",
"Dominic and the Ladies' Purse",
"Rekhachithram",
"Bromance",
"Officer on Duty",
"Painkili",
"Pravinkoodu Shappu",
"Daveed",
"Get-Set Baby",
"L2: Empuraan",
"Alappuzha Gymkhana",
"Bazooka",
"Maranamass",
"Narivetta",
"Padakkalam",
"Prince and Family",
"Ronth",
"Vyasanasametham Bandhumithradhikal",
"Detective Ujjwalan",
"United Kingdom of Kerala",
"Sumathi Valavu",
"Asthra",
"Flask",
"Tiki Taka",
"Hridayapoorvam",
"Ottakomban",
"Patriot",
"Kathanar",
"Lokah",
"Vilayath Buddha"
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
  console.log(`Updated wordBanks.js with ${deduped.length} Malayalaglish movies (added sixth batch).`);
} else {
  console.log("Could not find the malayalaglish_movies section.");
}
