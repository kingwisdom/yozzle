# Yoruba Word Search Game

A React Native mobile word search game designed for learning Yoruba language. The game features a 5x5 grid with Yoruba words and their English translations, making it an educational tool for language learners.

## Features

### Core Gameplay
- **5x5 Grid**: Fixed grid size optimized for mobile devices
- **Touch-based Word Selection**: Improved touch handling for accurate word highlighting
- **Multi-directional Search**: Find words horizontally, vertically, and diagonally
- **Visual Feedback**: Enhanced word highlighting with color coding and animations

### Educational Features
- **Yoruba Language Learning**: Focus on Yoruba vocabulary with English meanings
- **Categorized Learning**: Words organized by themes (body parts, nature, animals, home, general)
- **Progressive Hints**: Smart hint system showing first letter and meaning
- **Progress Tracking**: Visual progress indicator showing found vs. total words

### Dynamic Content
- **Random Word Selection**: New set of words every game
- **Multiple Data Sources**: Support for JSON, JavaScript objects, and API integration
- **Category Selection**: Choose specific themes or random categories
- **Expandable Word Database**: Easy to add new words and categories

### User Interface
- **Beautiful Background**: Ocean sunset theme for immersive experience
- **Responsive Design**: Adapts to different screen sizes
- **Intuitive Controls**: Easy-to-use buttons for new games and category selection
- **Clear Typography**: Enhanced readability with text shadows and proper contrast

## Technical Implementation

### Architecture
- **React Native**: Cross-platform mobile development
- **Expo**: Development and build toolchain
- **Modular Components**: Reusable UI components
- **Utility Functions**: Separated game logic and data handling

### Key Components
- `WordGrid`: Interactive 5x5 grid with touch handling
- `WordList`: Display of target words with meanings
- `Header`: Game information and controls
- `GameScreen`: Main game orchestration

### Utilities
- `wordSearchGenerator`: Grid generation and word placement
- `wordHighlighter`: Word selection and highlighting logic
- `wordDataLoader`: Dynamic word loading from various sources

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd WordSearchGame

# Install dependencies
npm install

# Start the development server
npm run web
```

### Running on Different Platforms
```bash
# Web browser
npm run web

# iOS simulator (requires Xcode)
npm run ios

# Android emulator (requires Android Studio)
npm run android
```

## Game Modifications Made

### 1. Fixed Word Highlighting Issues
- Improved touch detection with better margin calculations
- Enhanced PanResponder logic for accurate word selection
- Added visual feedback with scaling and improved colors

### 2. Enforced 5x5 Grid Size
- Modified `wordSearchGenerator.js` to force 5x5 grid
- Optimized word placement algorithms for smaller grid
- Filtered words to maximum 5 characters

### 3. Dynamic Word Loading
- Created `wordDataLoader.js` utility for flexible word sources
- Support for JSON files, JavaScript objects, and API endpoints
- Random word selection for each new game

### 4. Yoruba Language Integration
- Comprehensive Yoruba word database with English meanings
- Categorized vocabulary (body, nature, animals, home, general)
- Enhanced UI to display both Yoruba words and English translations

### 5. Improved User Experience
- Added category selection functionality
- New game and category buttons
- Better hint system with meanings
- Progress tracking and completion celebrations

## Word Categories

### Body Parts (Ara)
- ORI (head), ESE (foot), OJU (eye), ENU (mouth), IMU (nose), ETI (ear), OKA (finger)

### Nature (Eda)
- OMI (water), INA (fire), EWE (leaf), IGI (tree), OKE (mountain), ODO (river)

### Animals (Eranko)
- EJA (fish), AJA (dog), EYE (bird), EWU (goat)

### Home (Ile)
- ILE (house), ASO (cloth), IWE (book), OWU (cotton)

### General (Gbogbo)
- OJO (day), AYE (world), ONA (road), OKO (farm), OWO (money), EWA (beauty), etc.

## Customization

### Adding New Words
Edit `utils/wordDataLoader.js` to add new words to the database:

```javascript
const newWords = [
  { yoruba: "WORD", english: "meaning" }
];
```

### Creating New Categories
Add new categories to the `categories` object in `wordDataLoader.js`:

```javascript
categories.newCategory = [
  { yoruba: "WORD1", english: "meaning1" },
  { yoruba: "WORD2", english: "meaning2" }
];
```

### API Integration
Modify the `loadFromAPI` function in `wordDataLoader.js` to connect to your word API:

```javascript
const loadFromAPI = async (category, count) => {
  const response = await fetch(`your-api-endpoint/${category}`);
  const data = await response.json();
  return data.words;
};
```

## Performance Optimizations

- Efficient grid generation algorithms
- Optimized touch handling for mobile devices
- Lazy loading of word categories
- Minimal re-renders with proper state management

## Future Enhancements

- Audio pronunciation for Yoruba words
- Difficulty levels with larger grids
- Multiplayer functionality
- Achievement system
- Offline word packs
- Custom word list creation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Yoruba language community for vocabulary
- React Native and Expo teams for the development platform
- Contributors to the open-source libraries used

