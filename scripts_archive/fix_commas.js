const fs = require('fs');
const path = require('path');

const wbPath = path.join(__dirname, 'wordBanks.js');
let content = fs.readFileSync(wbPath, 'utf8');

// The issue was that the script replacing things might have appended commas, 
// or something caused multiple commas to appear. We can just replace multiple commas with a single comma
// but specifically around the `},` structure in MOVIE_BANKS.
content = content.replace(/\},,+/g, '},');

fs.writeFileSync(wbPath, content);
console.log('Fixed multiple commas.');
