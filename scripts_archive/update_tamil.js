const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
"Karnan",
"Server Sundaram",
"Puthiya Paravai",
"Navarathri",
"Aandavan Kattalai",
"Kai Kodutha Deivam",
"Deivathai",
"Padagotti",
"Vettaikaaran",
"En Kadamai",
"Panakkara Kudumbam",
"Thozhilali",
"Thaayin Madiyil",
"Pachai Vilakku",
"Poompuhar",
"Vazhkai Vazhvatharke",
"Bommai",
"Muradan Muthu",
"Vazhkkai Padagu",
"Enga Veettu Pillai",
"Thiruvilaiyadal",
"Ayirathil Oruvan",
"Anbe Vaa",
"Shanthi",
"Neela Vaanam",
"Panam Padaithavan",
"Kalangarai Vilakkam",
"Vallavanukku Vallavan",
"Pazhani",
"Hello Mister Zamindar",
"Idhaya Kamalam",
"Iravum Pagalum",
"Kaakkum Karangal",
"Kanni Thaai",
"Kuzhandaiyum Deivamum",
"Panjavarna Kili",
"Sarasa B.A.",
"Thaaye Unakkaga",
"Unnaipol Oruvan",
"Motor Sundaram Pillai",
"Saraswathi Sabatham",
"Major Chandrakanth",
"Ramu",
"Chandrodayam",
"Nadodi",
"Parakkum Paavai",
"Thanipiravi",
"Yaar Nee?",
"Gowri Kalyanam",
"Kodimalar",
"Mahakavi Kalidas",
"Mugaraasi",
"Naan Aanaiyittal",
"Nammooru Nallavan",
"Petralthan Pillaiya",
"Sadhu Mirandal",
"Selvam",
"Thaali Bhagyam",
"Bama Vijayam",
"Aalayam",
"Kandhan Karunai",
"Ooty Varai Uravu",
"Iru Malargal",
"Kaavalkaaran",
"Arasa Kattalai",
"Vivasaayi",
"Thangai",
"Nenjirukkum Varai",
"Naan",
"Penn Endral Penn",
"Bhavani",
"Raja Veettu Pillai",
"Valiba Virundhu",
"Sabash Thambi",
"Thillana Mohanambal",
"Galatta Kalyanam",
"Thirumal Perumai",
"Kudiyirundha Koyil",
"Oli Vilakku",
"Lakshmi Kalyanam",
"Harichandra",
"Enga Oor Raja",
"Kanavan",
"Kannan En Kadhalan",
"Puthiya Bhoomi",
"Ragasiya Police 115",
"Uyira Maanama",
"Ethir Neechal",
"Jeevanaamsam",
"Thamarai Nenjam",
"Panama Pasama",
"Bommalattam",
"Kadhal Vaaganam",
"Kallum Kaniyagum",
"Moondrezhuthu",
"Poovum Pottum",
"Soappu Seeppu Kannadi",
"Uyarndha Manithan"
];

// Clean new batch
const cleanedBatch = newBatch.map(name => {
  let s = name.replace(/[^a-zA-Z0-9\s]/g, ' ');
  s = s.replace(/\s+/g, ' ').trim().toLowerCase();
  return s;
}).filter(s => s.length > 0);

// Extract current array
const match = content.match(/2:\s*\{\s*code:\s*'tamiglish_movies',\s*name:\s*'Tamiglish Movies',\s*words:\s*(\[.*?\])\s*\}/s);
if (match) {
  let currentArray;
  try {
    currentArray = eval(match[1]); 
  } catch (e) {
    currentArray = [];
  }
  
  if (currentArray.length <= 5) {
    currentArray = [];
  }
  
  const combined = [...currentArray, ...cleanedBatch];
  const deduped = Array.from(new Set(combined));
  
  const replacement = "2: { code: 'tamiglish_movies', name: 'Tamiglish Movies', words: " + JSON.stringify(deduped) + " },";
  content = content.replace(/2:\s*\{\s*code:\s*'tamiglish_movies',\s*name:\s*'Tamiglish Movies',\s*words:\s*\[.*?\]\s*\}/s, replacement);
  fs.writeFileSync(wbPath, content);
  console.log(`Updated wordBanks.js with ${deduped.length} Tamil movies.`);
} else {
  console.log("Could not find the tamiglish_movies section.");
}
