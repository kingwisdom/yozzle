import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Alert,
  TouchableOpacity
} from 'react-native';
import WordList from '../components/WordList';
import Header from '../components/Header';
import { generateWordGrid } from '../utils/wordSearchGenerator';
import { highlightFoundWord } from '../utils/wordHighlighter';
import { getRandomWordsForGame, formatWordsForGame, getCategories } from '../utils/wordDataLoader';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import WordGrid from '../components/WordGrid';

interface GameData {
  words: string[];
  displayWords: {
    word: string;
    meaning: string;
    display: string;
  }[];
}

interface GridCell {
  letter: string;
  isFound: boolean;
  wordId?: string;
  highlightColor?: string;
}

interface GameScreenProps {
  route: RouteProp<{ params: { levelId: number } }, 'params'>;
  navigation: NavigationProp<any>;
}

const GameScreen: React.FC<GameScreenProps> = ({ route, navigation }) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [hints, setHints] = useState(6);
  const [currentCategory, setCurrentCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(true);

  const loadNewGame = async (category: string | null = null) => {
    setIsLoading(true);
    try {
      // Get random Yoruba words
      const wordObjects = await getRandomWordsForGame(6, category);
      const formattedData = formatWordsForGame(wordObjects);

      // Generate grid with the words
      const generatedGrid = generateWordGrid(formattedData.words);

      setGameData(formattedData);
      setGrid(generatedGrid as any);
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

  const handleWordFound = (word: string, positions: { row: number, col: number }[], color: string) => {
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
    // categoryOptions.push({ text: 'Cancel', onPress:  });

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
      <SafeAreaView className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-lg">Loading Yoruba words...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 bg-black/30">
        <Header
          level={{ id: 1, title: `Yoruba - ${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}` }}
          hints={hints}
          onBack={handleBack}
          onHint={useHint}
          onSettings={handleSettings}
        />

        <View className="flex-1 justify-center items-center px-5">
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

        <View className="flex-row justify-around px-5 mb-6 py-2.5 bg-black/30">
          <TouchableOpacity className="bg-green-500/80 px-5 py-2.5 rounded-full border border-white/30" onPress={() => loadNewGame()}>
            <Text className="text-white text-sm font-bold text-center shadow">New Game</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-blue-500/80 px-5 py-2.5 rounded-full border border-white/30" onPress={showCategorySelection}>
            <Text className="text-white text-sm font-bold text-center shadow">Category</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default GameScreen;
