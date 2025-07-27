import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Alert,
  TouchableOpacity
} from 'react-native';
import WordGrid from '../components/WordGrid';
import WordList from '../components/WordList';
import Header from '../components/Header';
import { generateWordGrid } from '../utils/wordSearchGenerator';
import { highlightFoundWord } from '../utils/wordHighlighter';
import { getRandomWordsForGame, formatWordsForGame, getCategories } from '../utils/wordDataLoader';

const GameScreen = ({ route, navigation }) => {
  const [gameData, setGameData] = useState(null);
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [hints, setHints] = useState(6);
  const [currentCategory, setCurrentCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(true);

  const loadNewGame = async (category = null) => {
    setIsLoading(true);
    try {
      // Get random Yoruba words
      const wordObjects = await getRandomWordsForGame(6, category);
      const formattedData = formatWordsForGame(wordObjects);

      // Generate grid with the words
      const generatedGrid = generateWordGrid(formattedData.words);

      setGameData(formattedData);
      setGrid(generatedGrid);
      setFoundWords([]);
      setHints(6);

      if (category) {
        setCurrentCategory(category);
      }
    } catch (error) {
      console.error('Error loading game:', error);
      Alert.alert('Error', 'Failed to load game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNewGame();
  }, []);

  const handleWordFound = (word, positions, color) => {
    setFoundWords(prev => [...prev, word]);
    const newGrid = highlightFoundWord(grid, positions, word, color);
    setGrid(newGrid);

    // Check if all words are found
    if (gameData && foundWords.length + 1 === gameData.words.length) {
      setTimeout(() => {
        Alert.alert(
          'Congratulations! 🎉',
          'You found all the Yoruba words! Great job learning!',
          [
            {
              text: 'New Game',
              onPress: () => loadNewGame()
            },
            {
              text: 'Change Category',
              onPress: showCategorySelection
            }
          ]
        );
      }, 500);
    }
  };

  const useHint = () => {
    if (hints > 0 && gameData && foundWords.length < gameData.words.length) {
      setHints(prev => prev - 1);
      // Simple hint: reveal first letter and meaning of an unfound word
      const unfoundWords = gameData.displayWords.filter(wordObj => !foundWords.includes(wordObj.word));
      if (unfoundWords.length > 0) {
        const hintWord = unfoundWords[0];
        Alert.alert(
          'Hint 💡',
          `Look for a word starting with "${hintWord.word[0]}" meaning "${hintWord.meaning}"`
        );
      }
    }
  };

  const showCategorySelection = () => {
    const categories = getCategories();
    const categoryOptions = categories.map(cat => ({
      text: cat.charAt(0).toUpperCase() + cat.slice(1),
      onPress: () => loadNewGame(cat)
    }));

    categoryOptions.push({ text: 'Random', onPress: () => loadNewGame() });
    categoryOptions.push({ text: 'Cancel', style: 'cancel' });

    Alert.alert('Choose Category', 'Select a category to practice:', categoryOptions);
  };

  const handleBack = () => {
    Alert.alert(
      'New Game',
      'Start a new game with different words?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'New Game', onPress: () => loadNewGame() }
      ]
    );
  };

  const handleSettings = () => {
    Alert.alert(
      'Game Options',
      'What would you like to do?',
      [
        { text: 'New Game', onPress: () => loadNewGame() },
        { text: 'Change Category', onPress: showCategorySelection },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  if (isLoading || !gameData || grid.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Yoruba words...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Header
          level={{ id: 1, title: `Yoruba - ${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}` }}
          hints={hints}
          onBack={handleBack}
          onHint={useHint}
          onSettings={handleSettings}
        />

        <View style={styles.gameArea}>
          <WordGrid
            grid={grid}
            onWordFound={handleWordFound}
            foundWords={foundWords}
            targetWords={gameData.words}
          />
        </View>

        <WordList
          displayWords={gameData.displayWords}
          foundWords={foundWords}
        />

        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.newGameButton} onPress={() => loadNewGame()}>
            <Text style={styles.buttonText}>New Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={showCategorySelection}>
            <Text style={styles.buttonText}>Category</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 25,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  newGameButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryButton: {
    backgroundColor: 'rgba(33, 150, 243, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default GameScreen;

