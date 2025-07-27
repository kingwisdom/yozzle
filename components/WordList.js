import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const WordList = ({ displayWords = [], foundWords = [] }) => {
  const renderWord = (wordObj, index) => {
    const isFound = foundWords.includes(wordObj.word);
    
    return (
      <View
        key={`${wordObj.word}-${index}`}
        style={[
          styles.wordContainer,
          isFound && styles.foundWordContainer
        ]}
      >
        <Text
          style={[
            styles.yorubaText,
            isFound && styles.foundWordText
          ]}
        >
          {wordObj.word}
        </Text>
        <Text
          style={[
            styles.englishText,
            isFound && styles.foundWordText
          ]}
        >
          ({wordObj.meaning})
        </Text>
      </View>
    );
  };

  // Split words into two rows for better layout
  const midPoint = Math.ceil(displayWords.length / 2);
  const firstRow = displayWords.slice(0, midPoint);
  const secondRow = displayWords.slice(midPoint);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Find these Yoruba words:</Text>
      <View style={styles.wordsContainer}>
        <View style={styles.row}>
          {firstRow.map((wordObj, index) => renderWord(wordObj, index))}
        </View>
        <View style={styles.row}>
          {secondRow.map((wordObj, index) => renderWord(wordObj, index + midPoint))}
        </View>
      </View>
      <Text style={styles.progressText}>
        Found: {foundWords.length} / {displayWords.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  wordsContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
    flexWrap: 'wrap',
  },
  wordContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 3,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minWidth: 100,
    alignItems: 'center',
  },
  foundWordContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.7)',
    borderColor: 'rgba(76, 175, 80, 0.9)',
  },
  yorubaText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  englishText: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  foundWordText: {
    textDecorationLine: 'line-through',
    opacity: 0.8,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default WordList;

