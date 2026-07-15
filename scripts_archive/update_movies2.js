const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

const newBatch = [
  "Aalaya Sikharam", "Aame Evaru", "Ammayilu Abbayilu", "Anaganaga Oka Ammayi", "Anandamanandamaye", "Andala Ramudu", "Andhrudu", "Appu Chesi Pappu Koodu", "Assembly Rowdy", "Aunty", "Bobbili Puli", "Bobbili Brahmanna", "Bhale Ramudu", "Bhale Krishnudu", "Bhale Ammayilu", "Bharya Bhartalu", "Bharathamlo Arjunudu", "Bharatamlo Bala Chandrudu", "Chakri", "Chakri Dharana", "Chal Mohan Ranga", "Chattam", "Chattamtho Poratam", "Chettu Kinda Pleader", "Chinnodu", "Chiranjeevulu", "Chittemma Mogudu", "Collector Gari Abbayi", "Coolie No.1", "Devatha", "Devudu Chesina Manushulu", "Dharma Chakram", "Drohi", "Ee Abbayi Chala Manchodu", "Egire Paavurama", "Ganesh", "Gharana Alludu", "Ghatothkachudu", "Gowri", "Hanuman Junction", "Hit List", "Intlo Illalu Vantintlo Priyuralu", "Jayammu Nischayammu Raa", "Justice Chowdary", "Kalikalam", "Kalusukovalani", "Kanyadanam", "Kanyasulkam", "Koduku", "Kokila", "Kouravudu", "Kshemanga Velli Labhanga Randi", "Kulagothralu", "Leelamahal Center", "Maa Alludu Very Good", "Maavidakulu", "Manavoori Pandavulu", "Mangalya Balam", "Manushulu Mamathalu", "Mayadari Malligadu", "Mondi Mogudu Penki Pellam", "Monagallaku Monagadu", "Muddula Priyudu", "Naa Mogudu Naake Sontham", "Naaga", "Ninne Premista", "Number One", "Palletoori Monagadu", "Palleturi Pilla", "Peddarikam", "Pelli", "Pelli Kanuka", "Pelli Chesi Choodu", "Praanam Khareedu", "Raghupathi Venkaiah Naidu", "Ram Robert Rahim", "Rickshaw Rudraiah", "Rowdy Ramudu Konte Krishnudu", "Sankranti", "Seetharamaiah Gari Manavaralu", "Sisindri", "Soggadu", "Srinatha Kavi Sarvabhoumudu", "Sriramadasu", "Subhakankshalu", "Subhalekha", "Sundarakanda", "Suryavamsam", "Sutradharulu", "Thaayaramma Bangarayya", "Thoorpu Velle Railu", "Trimurtulu", "Vamsoddharakudu", "Vetagadu", "Vichitra Kutumbam", "Vichitra Sodarulu", "Vijayam", "Yamagola", "Yuvarathna Rana"
];

// Clean new batch
const cleanedBatch = newBatch.map(name => {
  let s = name.replace(/[^a-zA-Z0-9\s]/g, ' ');
  s = s.replace(/\s+/g, ' ').trim().toLowerCase();
  if (s === 'aithe 2 0') s = 'aithe 2'; 
  return s;
}).filter(s => s.length > 0);

// Extract current array
const match = content.match(/3:\s*\{\s*code:\s*'teluglish_movies',\s*name:\s*'Teluglish Movies',\s*words:\s*(\[.*?\])\s*\}/s);
if (match) {
  const currentArray = JSON.parse(match[1]);
  const combined = [...currentArray, ...cleanedBatch];
  const deduped = Array.from(new Set(combined));
  
  const replacement = "3: { code: 'teluglish_movies', name: 'Teluglish Movies', words: " + JSON.stringify(deduped) + " },";
  content = content.replace(/3:\s*\{\s*code:\s*'teluglish_movies',\s*name:\s*'Teluglish Movies',\s*words:\s*\[.*?\]\s*\}/s, replacement);
  fs.writeFileSync(wbPath, content);
  console.log(`Updated wordBanks.js with ${deduped.length} Telugu movies (added new ones).`);
} else {
  console.log("Could not find the teluglish_movies section.");
}
