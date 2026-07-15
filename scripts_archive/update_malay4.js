const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Peruchazhi",
"Polytechnic",
"Praise the Lord",
"RajadhiRaja",
"Ring Master",
"Sapthamashree Thaskaraha",
"Tamaar Padaar",
"Varsham",
"Vellimoonga",
"Vikramadithyan",
"Villali Veeran",
"You Too Brutus",
"Aadu",
"100 Days of Love",
"Amar Akbar Anthony",
"Anarkali",
"Ben",
"Chandrettan Evideya",
"Charlie",
"Double Barrel",
"Ennu Ninte Moideen",
"Fireman",
"Haram",
"Ivan Maryadaraman",
"Jamna Pyari",
"Jo and the Boy",
"KL10 Pathu",
"Kohinoor",
"Loham",
"Lord Livingstone 7000 Kandi",
"Lukka Chuppi",
"Mili",
"My God",
"Nee-Na",
"Nirnayakam",
"Oru Second Class Yathra",
"Pathemari",
"Picket 43",
"Premam",
"Rasam",
"Rockstar",
"Salt Mango Tree",
"She Taxi",
"Su Su Sudhi Vathmeekam",
"Thinkal Muthal Velli Vare",
"Two Countries",
"Utopiayile Rajavu",
"Action Hero Biju",
"Aadupuliyattam",
"Annmariya Kalippilaanu",
"Campus Diary",
"Darvinte Parinamam",
"Dooram",
"Ezra",
"Guppy",
"Hello Namasthe",
"Jacobinte Swargarajyam",
"James & Alice",
"Kasaba",
"Kattappanayile Rithwik Roshan",
"Kismath",
"Leela",
"Maheshinte Prathikaaram",
"Marubhoomiyile Aana",
"Monsoon Mangoes",
"Moonam Naal Njayarazhcha",
"Mudhugauv",
"Oozham",
"Oppam",
"Ore Mukham",
"Oru Muthassi Gadha",
"Pallikkoodam",
"Paulettante Veedu",
"Pinneyum",
"Pretham",
"Puthiya Niyamam",
"School Bus",
"Shajahanum Pareekuttiyum",
"Shikhamani",
"Style",
"Thoppil Joppan",
"Valleem Thetti Pulleem Thetti",
"Vettah",
"Welcome to Central Jail",
"White",
"Aby",
"Achayans",
"Adventures of Omanakuttan",
"Alamara",
"Angamaly Diaries",
"Avarude Raavukal",
"Ayaal Sassi",
"C/O Saira Banu",
"Careful",
"Chunkzz",
"CIA: Comrade in America",
"Crossroad",
"Ezra",
"Fukri",
"Godha",
"Goodalochana",
"Hadiyya",
"Honey Bee 2: Celebrations"
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
  console.log(`Updated wordBanks.js with ${deduped.length} Malayalaglish movies (added fourth batch).`);
} else {
  console.log("Could not find the malayalaglish_movies section.");
}
