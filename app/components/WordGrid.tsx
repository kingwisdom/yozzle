import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  PanResponder,
  Dimensions,
  GestureResponderEvent,
} from 'react-native';
import { 
  getSelectionPath, 
  checkWordInSelection, 
  getCellStyle, 
  assignWordColor 
} from '../../utils/wordHighlighter';

interface Cell {
  row: number;
  col: number;
}

interface GridCell {
  letter: string;
  isFound: boolean;
  wordId?: string;
  highlightColor?: string;
}

interface WordGridProps {
  grid: GridCell[][];
  onWordFound: (word: string, positions: Cell[], color: string) => void;
  foundWords: string[];
  targetWords: string[];
}

const { width: screenWidth } = Dimensions.get('window');
const GRID_PADDING = 40;
const MAX_GRID_WIDTH = screenWidth - GRID_PADDING;

const WordGrid: React.FC<WordGridProps> = ({
  grid, 
  onWordFound, 
  foundWords = [],
  targetWords = [] 
}) => {
  const [selection, setSelection] = useState<Cell[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<Cell | null>(null);
  const gridRef = useRef<View>(null);

  const gridSize = grid.length;
  const cellSize = Math.floor(MAX_GRID_WIDTH / gridSize) - 4;

  const getCellFromPosition = (x: number, y: number): Cell | null => {
    const cellWithMargin = cellSize + 4;
    const row = Math.floor(y / cellWithMargin);
    const col = Math.floor(x / cellWithMargin);
    
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
      return { row, col };
    }
    return null;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (evt: GestureResponderEvent) => {
      const { locationX, locationY } = evt.nativeEvent;
      const cell = getCellFromPosition(locationX, locationY);
      
      if (cell) {
        setStartCell(cell);
        setSelection([cell]);
        setIsSelecting(true);
      }
    },

    onPanResponderMove: (evt: GestureResponderEvent) => {
      if (!isSelecting || !startCell) return;

      const { locationX, locationY } = evt.nativeEvent;
      const currentCell = getCellFromPosition(locationX, locationY);
      
      if (currentCell) {
        // Always calculate path from start to current position
        const path = getSelectionPath(startCell, currentCell);
        
        // Only update selection if we have a valid path
        if (path.length > 0) {
          setSelection(path);
        }
      }
    },

    onPanResponderRelease: () => {
      if (selection.length > 1) {
        // Check if the selection forms a valid word
        const foundWord = checkWordInSelection(grid, selection, targetWords);
        
        if (foundWord && !foundWords.includes(foundWord.word)) {
          const color = assignWordColor(foundWords.length);
          onWordFound?.(foundWord.word, selection, color);
        }
      }
      
      // Reset selection state
      setSelection([]);
      setIsSelecting(false);
      setStartCell(null);
    },

    onPanResponderTerminationRequest: () => false,
  });

  const renderCell = (cell: GridCell, row: number, col: number) => {
    const position = { row, col };
    const isSelected = selection.some(s => s.row === row && s.col === col);
    const cellStyle = getCellStyle(cell, position, selection, isSelecting);
    
    return (
      <View
        key={`${row}-${col}`}
        style={{
          width: cellSize,
          height: cellSize,
          backgroundColor: cellStyle.backgroundColor,
          borderColor: cellStyle.borderColor,
        }}
        className={`m-0.5 border rounded-lg justify-center items-center bg-white/90 border-gray-300
          ${isSelected && 'bg-yellow-300/70 border-yellow-400 border-2 scale-105'}
          ${cell.isFound && 'border-2'}`}
      >
        <Text style={{ fontSize: Math.max(cellSize * 0.5, 14) }} className={`font-bold text-gray-800 text-center ${cell.isFound && 'text-white font-bold'}`}>
          {cell.letter}
        </Text>
      </View>
    );
  };

  return (
    <View className="items-center justify-center">
      <View
        ref={gridRef}
        style={{ width: MAX_GRID_WIDTH, height: MAX_GRID_WIDTH }}
        className="bg-white/95 rounded-2xl p-2.5 shadow-lg"
        {...panResponder.panHandlers}
      >
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-center">
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default WordGrid;
