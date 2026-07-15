const fs = require('fs');
const path = require('path');

// pdf-parse main index.js returns a function if required as commonjs
let pdf;
try {
  pdf = require('pdf-parse');
  if (typeof pdf !== 'function') {
      // It might be nested if there is an esm wrapper
      pdf = pdf.default || pdf;
  }
} catch (e) {
  console.error("Failed to require pdf-parse:", e);
}

let dataBuffer = fs.readFileSync(path.join(__dirname, "../Teluglish Pictionary Wordbank.pdf"));

pdf(dataBuffer).then(function(data) {
    const text = data.text;
    const lines = text.split('\n');
    let words = new Set();
    
    const numRegex = /^\d+\.\s+([a-zA-Z]+)$/;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // Skip informational lines
        if (line.includes('English Word') || 
            line.includes('JSON') || 
            line.toLowerCase().includes('idhigo') || 
            line.toLowerCase().includes('neeku') ||
            line.toLowerCase().includes('mawa') ||
            line.includes('==') ||
            line.length === 0) continue;
            
        // Match numbered lines (the later format in the PDF)
        const match = line.match(numRegex);
        if (match) {
            let word = match[1].toLowerCase();
            if (word.length >= 3) {
                words.add(word);
            }
            continue;
        }
        
        // Match the 2-column format (the early format in the PDF)
        const tokens = line.split(/\s+/);
        if (tokens.length >= 2) {
            // First token is english word, remaining tokens contain the pictionary words
            for (let j = 1; j < tokens.length; j++) {
                let token = tokens[j].replace(/[^a-zA-Z]/g, '').toLowerCase();
                if (token.length > 2 && token !== 'json' && token !== 'english' && token !== 'teluglish' && token !== 'word') {
                    words.add(token);
                }
            }
        }
    }
    
    let finalWords = Array.from(words);
    console.log(`Extracted ${finalWords.length} Teluglish/English words from PDF.`);
    
    const outPath = path.join(__dirname, 'data', 'word_banks', 'all_mix_teluglish.json');
    fs.writeFileSync(outPath, JSON.stringify({ words: { value: finalWords } }, null, 2));
    console.log("Saved to " + outPath);
}).catch(err => {
    console.error("Error parsing PDF:", err);
});
