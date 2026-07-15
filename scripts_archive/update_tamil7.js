const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Bogan",
"Si3",
"Kaatru Veliyidai",
"Power Paandi",
"8 Thottakkal",
"Kavan",
"Baahubali 2: The Conclusion",
"Maragadha Naanayam",
"Vikram Vedha",
"Meesaya Murukku",
"Kurangu Bommai",
"Taramani",
"Velaikkaran",
"Theeran Adhigaaram Ondru",
"Aruvi",
"Mersal",
"Ispade Rajavum Idhaya Raniyum",
"Kalakalappu 2",
"Irumbu Thirai",
"Kaala",
"Kolamavu Kokila",
"Ghajinikanth",
"96",
"Ratsasan",
"Chekka Chivantha Vaanam",
"Pariyerum Perumal",
"Sarkar",
"Vada Chennai",
"Kanaa",
"Seethakaathi",
"Viswasam",
"Petta",
"Thadam",
"Airaa",
"Super Deluxe",
"Kanchana 3",
"Game Over",
"NGK",
"Comali",
"Nerkonda Paarvai",
"Kaappaan",
"Asuran",
"Kaithi",
"Bigil",
"Hero",
"Darbar",
"Oh My Kadavule",
"Kannum Kannum Kollaiyadithaal",
"Gypsy",
"Dharala Prabhu",
"Soorarai Pottru",
"Mookuthi Amman",
"Paava Kadhaigal",
"Master",
"Karnan",
"Sulthan",
"Mandela",
"Jagame Thandhiram",
"Sarpatta Parambarai",
"Doctor",
"Jai Bhim",
"Annaatthe",
"Enemy",
"Maanaadu",
"Rocky",
"Vinodhaya Sitham",
"Etharkkum Thunindhavan",
"Hey Sinamika",
"Maaran",
"Beast",
"Kaathuvaakula Rendu Kaadhal",
"Don",
"Vikram",
"Veetla Vishesham",
"Yaanai",
"Gargi",
"Viruman",
"Cobra",
"Captain",
"Natchathiram Nagargiradhu",
"Ponniyin Selvan: I",
"Love Today",
"Sardar",
"Prince",
"Coffee with Kadhal",
"Naane Varuvean",
"Raangi",
"Thunivu",
"Varisu",
"Dada",
"Pathu Thala",
"Viduthalai Part 1",
"Rudhran",
"Good Night",
"Por Thozhil",
"Maamannan",
"Jailer",
"Mark Antony",
"Chandramukhi 2",
"Leo",
"Japan",
"Ayalaan",
"Captain Miller"
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
  console.log(`Updated wordBanks.js with ${deduped.length} Tamil movies (added seventh batch).`);
} else {
  console.log("Could not find the tamiglish_movies section.");
}
