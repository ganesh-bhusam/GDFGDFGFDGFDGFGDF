const fs = require('fs');
const PDFParser = require("pdf2json");
const path = require('path');

const pdfParser = new PDFParser(this, 1); // 1 = raw text output

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    const rawText = pdfParser.getRawTextContent();
    const lines = rawText.split('\n');
    
    let words = new Set();
    const numRegex = /^\d+\.\s*([a-zA-Z]+)/;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        line = line.replace(/\\r/g, "");
        
        // Skip informational lines
        if (line.includes('English Word') || 
            line.includes('JSON') || 
            line.toLowerCase().includes('idhigo') || 
            line.toLowerCase().includes('neeku') ||
            line.toLowerCase().includes('mawa') ||
            line.toLowerCase().includes('namaskaram') ||
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
        const tokens = line.split(/[\s\/()]+/);
        if (tokens.length >= 2 && !line.match(/^\d+\./)) {
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
    
    const outPath = path.join(__dirname, 'data', 'word_banks', 'te_teluglish.json');
    fs.writeFileSync(outPath, JSON.stringify({ words: { value: finalWords } }, null, 2));
    console.log("Saved to " + outPath);
});

pdfParser.loadPDF(path.join(__dirname, "../Teluglish Pictionary Wordbank.pdf"));
