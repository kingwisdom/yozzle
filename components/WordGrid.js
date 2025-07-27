import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';
import { 
  getSelectionPath, 
  checkWordInSelection, 
  getCellStyle, 
  validateSelection,
  assignWordColor 
} from '../utils/wordHighlighter';

const { width: screenWidth } = Dimensions.get('window');
const GRID_PADDING = 40;
const MAX_GRID_WIDTH = screenWidth - GRID_PADDING;

const WordGrid = ({ 
  grid, 
  onWordFound, 
  foundWords = [],
  targetWords = [] 
}) => {
  const [selection, setSelection] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const gridRef = useRef(null);

  const gridSize = grid.length;
  const cellSize = Math.floor(MAX_GRID_WIDTH / gridSize) - 4;

  const getCellFromPosition = (x, y) => {
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

    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      const cell = getCellFromPosition(locationX, locationY);
      
      if (cell) {
        setStartCell(cell);
        setSelection([cell]);
        setIsSelecting(true);
      }
    },

    onPanResponderMove: (evt) => {
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

  const renderCell = (cell, row, col) => {
    const position = { row, col };
    const isSelected = selection.some(s => s.row === row && s.col === col);
    const cellStyle = getCellStyle(cell, position, selection, isSelecting);
    
    return (
      <View
        key={`${row}-${col}`}
        style={[
          styles.cell,
          {
            width: cellSize,
            height: cellSize,
            backgroundColor: cellStyle.backgroundColor,
            borderColor: cellStyle.borderColor,
          },
          isSelected && styles.selectedCell,
          cell.isFound && styles.foundCell,
        ]}
      >
        <Text style={[
          styles.cellText,
          { fontSize: Math.max(cellSize * 0.5, 14) },
          cell.isFound && styles.foundCellText
        ]}>
          {cell.letter}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        ref={gridRef}
        style={[styles.grid, { width: MAX_GRID_WIDTH, height: MAX_GRID_WIDTH }]}
        {...panResponder.panHandlers}
      >
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    margin: 2, // Increased margin for better touch
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#ddd',
  },
  selectedCell: {
    backgroundColor: 'rgba(255, 255, 0, 0.7)',
    borderColor: '#FFD700',
    borderWidth: 2,
    transform: [{ scale: 1.05 }], // Slight scale for visual feedback
  },
  foundCell: {
    borderWidth: 2,
  },
  cellText: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  foundCellText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WordGrid;

