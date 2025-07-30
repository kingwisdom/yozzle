// Dynamic word data loading utility for Yoruba language learning

interface Word {
  yoruba: string;
  english: string;
}

interface Categories {
  [key: string]: Word[];
}

// Yoruba words with English meanings for the word search game
const yorubaWordsDatabase: Word[] = [
  { yoruba: "ILE", english: "house" },
  { yoruba: "OMI", english: "water" },
  { yoruba: "OJO", english: "day" },
  { yoruba: "EWE", english: "leaf" },
  { yoruba: "AYE", english: "world" },
  { yoruba: "ONA", english: "road" },
  { yoruba: "EJA", english: "fish" },
  { yoruba: "AJA", english: "dog" },
  { yoruba: "EYE", english: "bird" },
  { yoruba: "OKO", english: "farm" },
  { yoruba: "ASO", english: "cloth" },
  { yoruba: "OWO", english: "money" },
  { yoruba: "EWA", english: "beauty" },
  { yoruba: "IRU", english: "type" },
  { yoruba: "ORI", english: "head" },
  { yoruba: "ESE", english: "foot" },
  { yoruba: "OJU", english: "eye" },
  { yoruba: "ENU", english: "mouth" },
  { yoruba: "IMU", english: "nose" },
  { yoruba: "ETI", english: "ear" },
  { yoruba: "OWU", english: "cotton" },
  { yoruba: "EFO", english: "vegetable" },
  { yoruba: "EWU", english: "goat" },
  { yoruba: "AGO", english: "time" },
  { yoruba: "INA", english: "fire" },
  { yoruba: "OKE", english: "mountain" },
  { yoruba: "ODO", english: "river" },
  { yoruba: "IGI", english: "tree" },
  { yoruba: "OKA", english: "finger" },
  { yoruba: "IWE", english: "book" }
];

// Categories for themed learning
const categories: Categories = {
  body: [
    { yoruba: "ORI", english: "head" },
    { yoruba: "ESE", english: "foot" },
    { yoruba: "OJU", english: "eye" },
    { yoruba: "ENU", english: "mouth" },
    { yoruba: "IMU", english: "nose" },
    { yoruba: "ETI", english: "ear" },
    { yoruba: "OKA", english: "finger" }
  ],
  nature: [
    { yoruba: "OMI", english: "water" },
    { yoruba: "INA", english: "fire" },
    { yoruba: "EWE", english: "leaf" },
    { yoruba: "IGI", english: "tree" },
    { yoruba: "OKE", english: "mountain" },
    { yoruba: "ODO", english: "river" }
  ],
  animals: [
    { yoruba: "EJA", english: "fish" },
    { yoruba: "AJA", english: "dog" },
    { yoruba: "EYE", english: "bird" },
    { yoruba: "EWU", english: "goat" }
  ],
  home: [
    { yoruba: "ILE", english: "house" },
    { yoruba: "ASO", english: "cloth" },
    { yoruba: "IWE", english: "book" },
    { yoruba: "OWU", english: "cotton" }
  ],
  general: [
    { yoruba: "OJO", english: "day" },
    { yoruba: "AYE", english: "world" },
    { yoruba: "ONA", english: "road" },
    { yoruba: "OKO", english: "farm" },
    { yoruba: "OWO", english: "money" },
    { yoruba: "EWA", english: "beauty" },
    { yoruba: "IRU", english: "type" },
    { yoruba: "AGO", english: "time" },
    { yoruba: "EFO", english: "vegetable" }
  ]
};

/**
 * Load words from different sources
 * @param {string} source - 'database', 'json', 'api', or 'category'
 * @param {string} category - Category name for filtered loading
 * @param {number} count - Number of words to return
 * @returns {Promise<Word[]>} Array of word objects with yoruba and english properties
 */
export const loadWords = async (source: string = 'database', category: string | null = null, count: number = 6): Promise<Word[]> => {
  try {
    switch (source) {
      case 'database':
        return loadFromDatabase(category, count);
      
      case 'json':
        return await loadFromJSON(category, count);
      
      case 'api':
        return await loadFromAPI(category, count);
      
      case 'category':
        return loadFromCategory(category, count);
      
      default:
        return loadFromDatabase(category, count);
    }
  } catch (error) {
    console.error('Error loading words:', error);
    // Fallback to database
    return loadFromDatabase(category, count);
  }
};

/**
 * Load words from the built-in database
 */
const loadFromDatabase = (category: string | null, count: number): Word[] => {
  let sourceWords = category && categories[category] 
    ? categories[category] 
    : yorubaWordsDatabase;
  
  // Filter words that fit in 5x5 grid
  sourceWords = sourceWords.filter(word => word.yoruba.length <= 5);
  
  // Randomly select words
  const shuffled = [...sourceWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Load words from a JSON file or object
 */
const loadFromJSON = async (category: string | null, count: number): Promise<Word[]> => {
  // This would typically load from a JSON file
  // For now, we'll simulate with the database
  const jsonData = {
    words: yorubaWordsDatabase,
    categories: categories
  };
  
  let sourceWords = category && jsonData.categories[category] 
    ? jsonData.categories[category] 
    : jsonData.words;
  
  sourceWords = sourceWords.filter(word => word.yoruba.length <= 5);
  const shuffled = [...sourceWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Load words from an external API
 */
const loadFromAPI = async (category: string | null, count: number): Promise<Word[]> => {
  try {
    // Simulate API call - in real implementation, this would be an actual API
    // For now, return database words with a delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let sourceWords = category && categories[category] 
      ? categories[category] 
      : yorubaWordsDatabase;
    
    sourceWords = sourceWords.filter(word => word.yoruba.length <= 5);
    const shuffled = [...sourceWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  } catch (error) {
    console.error('API loading failed:', error);
    return loadFromDatabase(category, count);
  }
};

/**
 * Load words from a specific category
 */
const loadFromCategory = (category: string | null, count: number): Word[] => {
  if (!category || !categories[category]) {
    return loadFromDatabase(null, count);
  }
  
  let sourceWords = categories[category];
  sourceWords = sourceWords.filter(word => word.yoruba.length <= 5);
  const shuffled = [...sourceWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Get available categories
 */
export const getCategories = (): string[] => {
  return Object.keys(categories);
};

/**
 * Get random words for a new game
 * @param {number} count - Number of words to return
 * @param {string} category - Optional category filter
 * @returns {Promise<Word[]>} Array of word objects
 */
export const getRandomWordsForGame = async (count: number = 6, category: string | null = null): Promise<Word[]> => {
  // Randomly choose a source for variety
  const sources = ['database', 'category'];
  const randomSource = sources[Math.floor(Math.random() * sources.length)];
  
  // If no category specified, randomly choose one
  const finalCategory = category || getCategories()[Math.floor(Math.random() * getCategories().length)];
  
  return await loadWords(randomSource, finalCategory, count);
};

/**
 * Convert word objects to the format expected by the game
 * @param {Word[]} wordObjects - Array of {yoruba, english} objects
 * @returns {{words: string[], displayWords: {word: string, meaning: string, display: string}[]}} Object with words array and display info
 */
export const formatWordsForGame = (wordObjects: Word[]): { words: string[], displayWords: { word: string, meaning: string, display: string }[] } => {
  return {
    words: wordObjects.map(w => w.yoruba),
    displayWords: wordObjects.map(w => ({
      word: w.yoruba,
      meaning: w.english,
      display: `${w.yoruba} (${w.english})`
    }))
  };
};
