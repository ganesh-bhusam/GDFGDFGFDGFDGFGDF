const fs = require('fs');
const readline = require('readline');

const transcriptPath = "C:\\Users\\PK'S\\.gemini\\antigravity-ide\\brain\\50190dc6-ba59-4b8c-8a7b-a12145ec6f15\\.system_generated\\logs\\transcript_full.jsonl";

async function dump() {
    const fileStream = fs.createReadStream(transcriptPath);
    const rl = readline.createInterface({ input: fileStream });
    let fullText = "";
    for await (const line of rl) {
        try {
            const entry = JSON.parse(line);
            if (entry.type === 'USER_INPUT' || entry.source === 'USER' || entry.source === 'USER_EXPLICIT' || entry.type === 'TOOL_RESPONSE' || entry.type === 'ACTION_RESPONSE') {
                const content = typeof entry.content === 'string' ? entry.content : JSON.stringify(entry.content || entry.tool_calls || entry);
                if (content.includes('==Start of OCR')) {
                    fullText += content + "\n";
                }
            }
        } catch (e) {}
    }
    fs.writeFileSync("c:\\Users\\PK'S\\OneDrive\\Desktop\\AdvScribblw-with-backend-main\\dump.txt", fullText);
    console.log("Dumped length: " + fullText.length);
}
dump();
