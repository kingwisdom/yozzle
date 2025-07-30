import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

interface DisplayWord {
  word: string;
  meaning: string;
  display: string;
}

interface WordListProps {
  displayWords: DisplayWord[];
  foundWords: string[];
}

const WordList: React.FC<WordListProps> = ({ displayWords = [], foundWords = [] }) => {
  const renderWord = (wordObj: DisplayWord, index: number) => {
    const isFound = foundWords.includes(wordObj.word);

    return (
      <View
        key={`${wordObj.word}-${index}`}
        className={`bg-white/20 rounded-xl px-2.5 py-2 mx-1 my-1 border border-white/30 min-w-[100px] items-center ${isFound && 'bg-green-500/70 border-green-500/90'}`}
      >
        <Text
          className={`text-white text-sm font-bold text-center shadow ${isFound && 'line-through opacity-80'}`}
        >
          {wordObj.word}
        </Text>
        <Text
          className={`text-white text-xs text-center italic opacity-90 shadow ${isFound && 'line-through opacity-80'}`}
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
    <View className="px-5 py-4 bg-black/40">
      <Text className="text-white text-base font-bold text-center mb-2.5 shadow">Find these Yoruba words:</Text>
      <View className="mb-2.5">
        <View className="flex-row justify-around my-1 flex-wrap">
          {firstRow.map((wordObj, index) => renderWord(wordObj, index))}
        </View>
        <View className="flex-row justify-around my-1 flex-wrap">
          {secondRow.map((wordObj, index) => renderWord(wordObj, index + midPoint))}
        </View>
      </View>
      <Text className="text-white text-sm font-semibold text-center shadow">
        Found: {foundWords.length} / {displayWords.length}
      </Text>
    </View>
  );
};

export default WordList;
