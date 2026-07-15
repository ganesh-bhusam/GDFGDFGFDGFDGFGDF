const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'backend', 'data', 'word_banks', 'en_english.json');
let data = JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));

const originalLength = data.words.value.length;

// Basic knowledge filter for pictionary words
// Remove words that are too abstract, adjectives, or hard to draw.
const badEndings = [
  'tion', 'ing', 'ed', 'ness', 'ity', 'ment', 'able', 'ible', 'ous', 'ive', 'ful', 'less', 'ism', 'ist', 'ize', 'ly'
];

const exactBadWords = new Set([
  'abandoned', 'abstract', 'abyss', 'accident', 'acne', 'advantage', 'advice', 'afterlife', 'agreement', 'air',
  'alone', 'always', 'amateur', 'amazing', 'angry', 'annoy', 'answer', 'anything', 'anywhere', 'apologize', 'appetite',
  'application', 'approve', 'area', 'argue', 'arrogant', 'art', 'ashamed', 'ask', 'asleep', 'assassin', 'assist',
  'attack', 'attention', 'attractive', 'aunt', 'authentic', 'average', 'awake', 'award', 'awesome', 'awful', 'awkward',
  'back', 'bad', 'bad luck', 'bald', 'bankrupt', 'bare', 'bargain', 'bark', 'base', 'basic', 'beautiful', 'because',
  'become', 'before', 'begin', 'behind', 'believe', 'below', 'best', 'better', 'big', 'bitter', 'bizarre', 'blank',
  'blind', 'blonde', 'blood', 'blow', 'blush', 'boil', 'bold', 'bored', 'boring', 'borrow', 'boss', 'bother', 'bottom',
  'brave', 'break', 'breathe', 'bright', 'brilliant', 'bring', 'broken', 'brother', 'brown', 'bruise', 'build', 'burn',
  'bury', 'busy', 'buy', 'calm', 'cancel', 'care', 'careful', 'careless', 'catch', 'cause', 'celebrate', 'center',
  'certain', 'chance', 'change', 'cheap', 'cheat', 'check', 'cheer', 'cheerful', 'cheese', 'chew', 'chubby', 'clean',
  'clear', 'clever', 'click', 'climb', 'close', 'clumsy', 'cold', 'color', 'come', 'comfort', 'comfortable', 'common',
  'compare', 'complete', 'complex', 'confident', 'confuse', 'connect', 'continue', 'control', 'cook', 'cool', 'copy',
  'corner', 'correct', 'cost', 'count', 'courage', 'cousin', 'cover', 'crazy', 'create', 'crime', 'cry', 'curious',
  'curly', 'cute', 'damage', 'dance', 'danger', 'dangerous', 'dark', 'daughter', 'day', 'dead', 'deaf', 'deal', 'dear',
  'death', 'decide', 'deep', 'defeat', 'defend', 'delicious', 'deliver', 'demand', 'deny', 'depend', 'describe',
  'design', 'destroy', 'detail', 'develop', 'die', 'difference', 'different', 'difficult', 'dig', 'dinner', 'dirty',
  'discover', 'disease', 'disgusting', 'distance', 'divide', 'do', 'doctor', 'double', 'doubt', 'down', 'draw', 'dream',
  'dress', 'drink', 'drive', 'drop', 'dry', 'dull', 'dumb', 'dust', 'duty', 'early', 'earn', 'earth', 'east', 'easy',
  'eat', 'educate', 'education', 'effect', 'effort', 'eight', 'eighteen', 'eighty', 'either', 'eleven', 'empty',
  'end', 'enemy', 'enjoy', 'enough', 'enter', 'equal', 'error', 'escape', 'even', 'evening', 'event', 'ever', 'every',
  'everyone', 'everything', 'everywhere', 'evil', 'exact', 'example', 'excellent', 'except', 'excuse', 'expect',
  'expensive', 'experience', 'explain', 'express', 'extra', 'eye', 'face', 'fact', 'fail', 'fair', 'fall', 'false',
  'family', 'famous', 'far', 'fast', 'fat', 'father', 'fault', 'fear', 'feeble', 'feel', 'female', 'few', 'fight',
  'fill', 'find', 'fine', 'finger', 'finish', 'fire', 'first', 'fit', 'five', 'fix', 'flat', 'floor', 'fly', 'follow',
  'food', 'fool', 'foot', 'for', 'force', 'foreign', 'forget', 'forgive', 'fork', 'form', 'forty', 'forward', 'four',
  'fourteen', 'free', 'fresh', 'friend', 'friendly', 'from', 'front', 'full', 'fun', 'funny', 'future', 'game', 'gather',
  'general', 'gentle', 'get', 'give', 'glad', 'go', 'good', 'grand', 'grandfather', 'grandmother', 'great', 'green',
  'greet', 'ground', 'group', 'grow', 'guess', 'guest', 'guide', 'guilty', 'habit', 'hair', 'half', 'hall', 'hand',
  'handsome', 'hang', 'happen', 'happy', 'hard', 'hardly', 'hate', 'have', 'he', 'head', 'health', 'healthy', 'hear',
  'heavy', 'hello', 'help', 'her', 'here', 'hero', 'hide', 'high', 'hill', 'him', 'his', 'hit', 'hold', 'hole', 'holiday',
  'home', 'honest', 'hope', 'hot', 'hour', 'house', 'how', 'huge', 'human', 'hungry', 'hurry', 'hurt', 'husband', 'I',
  'idea', 'if', 'ill', 'important', 'in', 'include', 'income', 'increase', 'indeed', 'independent', 'industry', 'inside',
  'instead', 'instrument', 'interest', 'into', 'invent', 'invite', 'is', 'it', 'its', 'job', 'join', 'joke', 'joy',
  'judge', 'jump', 'just', 'keep', 'kill', 'kind', 'king', 'kiss', 'kitchen', 'knee', 'knife', 'knock', 'know', 'knowledge',
  'lack', 'lady', 'land', 'language', 'large', 'last', 'late', 'laugh', 'law', 'lay', 'lazy', 'lead', 'leader', 'learn',
  'least', 'leave', 'left', 'leg', 'less', 'lesson', 'let', 'letter', 'level', 'lie', 'life', 'light', 'like', 'likely',
  'limit', 'line', 'lip', 'list', 'listen', 'little', 'live', 'local', 'lock', 'lonely', 'long', 'look', 'lose', 'lot',
  'loud', 'love', 'low', 'luck', 'lucky', 'machine', 'mad', 'main', 'make', 'male', 'man', 'many', 'map', 'mark', 'market',
  'marry', 'master', 'match', 'material', 'matter', 'may', 'maybe', 'me', 'meal', 'mean', 'measure', 'meat', 'meet',
  'member', 'memory', 'men', 'mental', 'mercy', 'middle', 'might', 'mile', 'mind', 'mine', 'minute', 'miss', 'mistake',
  'mix', 'model', 'modern', 'moment', 'money', 'month', 'more', 'morning', 'most', 'mother', 'move', 'much', 'music',
  'must', 'my', 'name', 'narrow', 'nation', 'nature', 'near', 'nearly', 'neat', 'neck', 'need', 'neither', 'never',
  'new', 'news', 'next', 'nice', 'night', 'nine', 'nineteen', 'ninety', 'no', 'noble', 'nobody', 'noise', 'none', 'nor',
  'north', 'nose', 'not', 'note', 'nothing', 'notice', 'now', 'number', 'obey', 'object', 'ocean', 'of', 'off', 'offer',
  'office', 'often', 'oh', 'oil', 'old', 'on', 'once', 'one', 'only', 'open', 'opposite', 'or', 'order', 'other', 'our',
  'out', 'outside', 'over', 'own', 'page', 'pain', 'paint', 'pair', 'paper', 'pardon', 'parent', 'part', 'party', 'pass',
  'past', 'path', 'pay', 'peace', 'pen', 'pencil', 'people', 'per', 'perfect', 'perhaps', 'person', 'picture', 'piece',
  'pig', 'place', 'plan', 'plant', 'play', 'please', 'plenty', 'point', 'polite', 'pool', 'poor', 'popular', 'position',
  'possible', 'power', 'practice', 'prepare', 'present', 'press', 'price', 'pride', 'print', 'prison', 'private', 'prize',
  'probably', 'problem', 'produce', 'promise', 'proper', 'protect', 'proud', 'prove', 'provide', 'public', 'pull', 'punish',
  'pupil', 'push', 'put', 'quality', 'question', 'quick', 'quiet', 'quite', 'race', 'radio', 'rain', 'raise', 'rate',
  'rather', 'reach', 'read', 'ready', 'real', 'really', 'reason', 'receive', 'recent', 'record', 'red', 'reduce', 'refuse',
  'regular', 'remain', 'remember', 'remove', 'reply', 'report', 'represent', 'respect', 'rest', 'result', 'return', 'rich',
  'ride', 'right', 'ring', 'rise', 'river', 'road', 'rock', 'roll', 'room', 'root', 'rope', 'rough', 'round', 'rub', 'rule',
  'run', 'rush', 'sad', 'safe', 'sail', 'salt', 'same', 'sand', 'save', 'say', 'school', 'science', 'sea', 'search',
  'season', 'seat', 'second', 'secret', 'see', 'seem', 'sell', 'send', 'sense', 'sentence', 'separate', 'serious', 'serve',
  'seven', 'seventeen', 'seventy', 'several', 'shade', 'shadow', 'shake', 'shall', 'shape', 'share', 'sharp', 'she',
  'sheep', 'shine', 'ship', 'shirt', 'shoe', 'shoot', 'shop', 'short', 'should', 'shoulder', 'shout', 'show', 'sick',
  'side', 'sight', 'sign', 'signal', 'silent', 'silly', 'silver', 'similar', 'simple', 'since', 'sing', 'single', 'sink',
  'sister', 'sit', 'six', 'sixteen', 'sixty', 'size', 'skill', 'skin', 'skirt', 'sky', 'sleep', 'slip', 'slow', 'small',
  'smell', 'smile', 'smoke', 'snow', 'so', 'soap', 'social', 'society', 'soft', 'some', 'someone', 'something', 'sometimes',
  'son', 'song', 'soon', 'sorry', 'sort', 'sound', 'south', 'space', 'speak', 'special', 'speech', 'speed', 'spell',
  'spend', 'spirit', 'split', 'spoil', 'sport', 'spot', 'spread', 'spring', 'square', 'stand', 'star', 'start', 'state',
  'station', 'stay', 'steal', 'steam', 'step', 'stick', 'still', 'stomach', 'stone', 'stop', 'store', 'storm', 'story',
  'straight', 'strange', 'stream', 'street', 'strength', 'strike', 'strong', 'student', 'study', 'stupid', 'subject',
  'substance', 'succeed', 'success', 'such', 'sudden', 'suffer', 'sugar', 'suit', 'summer', 'sun', 'supper', 'supply',
  'support', 'sure', 'surprise', 'sweet', 'swim', 'system', 'table', 'tail', 'take', 'talk', 'tall', 'taste', 'tax',
  'tea', 'teach', 'team', 'tear', 'tell', 'ten', 'terrible', 'test', 'than', 'thank', 'that', 'the', 'their', 'them',
  'then', 'there', 'therefore', 'these', 'they', 'thick', 'thin', 'thing', 'think', 'third', 'thirteen', 'thirty', 'this',
  'those', 'though', 'thought', 'thousand', 'three', 'through', 'throw', 'tie', 'tight', 'till', 'time', 'tire', 'to',
  'today', 'together', 'tomorrow', 'too', 'tool', 'top', 'total', 'touch', 'toward', 'town', 'trade', 'train', 'travel',
  'tree', 'trick', 'trouble', 'true', 'trust', 'try', 'turn', 'twelve', 'twenty', 'two', 'type', 'ugly', 'uncle', 'under',
  'understand', 'unit', 'until', 'up', 'upon', 'use', 'usual', 'valley', 'value', 'various', 'very', 'view', 'village',
  'visit', 'voice', 'wait', 'wake', 'walk', 'wall', 'want', 'war', 'warm', 'wash', 'waste', 'watch', 'water', 'wave',
  'way', 'we', 'weak', 'wealth', 'wear', 'weather', 'week', 'weigh', 'weight', 'welcome', 'well', 'west', 'what', 'when',
  'where', 'whether', 'which', 'while', 'white', 'who', 'whole', 'why', 'wide', 'wife', 'will', 'win', 'wind', 'window',
  'wine', 'winter', 'wire', 'wise', 'wish', 'with', 'without', 'woman', 'wonder', 'wood', 'word', 'work', 'world', 'worry',
  'worst', 'would', 'write', 'wrong', 'yard', 'year', 'yes', 'yesterday', 'yet', 'you', 'young', 'your'
]);

let newWords = data.words.value.filter(word => {
  const w = word.toLowerCase();
  
  // Remove 2 letter words
  if (w.length <= 2) return false;
  
  // Remove exact matches
  if (exactBadWords.has(w)) return false;
  
  // Remove words ending with abstract suffixes
  for (const ending of badEndings) {
    if (w.endsWith(ending) && w.length > ending.length + 2) {
      // Keep exceptions if any, but generally drop
      return false;
    }
  }
  
  // Keep it
  return true;
});

data.words.value = newWords;
fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

console.log(`Filtered ${originalLength} words down to ${newWords.length} drawable words.`);
