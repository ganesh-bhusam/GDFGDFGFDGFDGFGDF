const fs = require('fs');
const readline = require('readline');
const path = require('path');

const transcriptPath = "C:\\Users\\PK'S\\.gemini\\antigravity-ide\\brain\\50190dc6-ba59-4b8c-8a7b-a12145ec6f15\\.system_generated\\logs\\transcript_full.jsonl";

async function extractFromTranscript() {
    const fileStream = fs.createReadStream(transcriptPath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let pdfText = "";

    for await (const line of rl) {
        try {
            const entry = JSON.parse(line);
            // Search for responses or events that contain the PDF output
            const content = typeof entry.content === 'string' ? entry.content : JSON.stringify(entry.content || entry.tool_calls || entry);
            if (content && content.includes('==Start of OCR')) {
                pdfText += content + "\n";
            }
        } catch (e) {
            // ignore
        }
    }
    
    console.log("PDF text chunks found, length: " + pdfText.length);
    
    let words = new Set();
    // Support literal \n and actual newlines
    const lines = pdfText.split(/\\n|\n/);
    
    const numRegex = /^\d+\.\s+([a-zA-Z]+)$/;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        line = line.replace(/\\r/g, "").replace(/",$/g, "").replace(/^"/g, ""); // basic un-escaping
        
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
    
    const outPath = path.join(__dirname, 'backend', 'data', 'word_banks', 'te_teluglish.json');
    fs.writeFileSync(outPath, JSON.stringify({ words: { value: finalWords } }, null, 2));
    console.log("Saved to " + outPath);
}

extractFromTranscript();
