// Word highlighting and search utilities

export const getSelectionPath = (startCell, endCell) => {
  const path = [];
  const rowDiff = endCell.row - startCell.row;
  const colDiff = endCell.col - startCell.col;

  const absRowDiff = Math.abs(rowDiff);
  const absColDiff = Math.abs(colDiff);

  // Determine if it's a valid straight line (horizontal, vertical, or diagonal)
  if (absRowDiff !== 0 && absColDiff !== 0 && absRowDiff !== absColDiff) {
    return []; // Invalid selection: not a straight line
  }

  const steps = Math.max(absRowDiff, absColDiff);
  if (steps === 0) {
    return [startCell]; // Single cell selection
  }

  const rowStep = rowDiff / steps;
  const colStep = colDiff / steps;

  for (let i = 0; i <= steps; i++) {
    path.push({
      row: startCell.row + Math.round(rowStep * i),
      col: startCell.col + Math.round(colStep * i)
    });
  }

  return path;
};

export const checkWordInSelection = (grid, selection, targetWords) => {
  if (selection.length < 2) return null;
  
  // Get letters from selection
  const letters = selection.map(cell => grid[cell.row][cell.col].letter).join('');
  const reversedLetters = letters.split('').reverse().join('');
  
  // Check if it matches any target word
  for (const word of targetWords) {
    if (word === letters || word === reversedLetters) {
      return {
        word,
        isReversed: word === reversedLetters,
        positions: selection
      };
    }
  }
  
  return null;
};

export const getWordColors = () => {
  return [
    '#4A90E2', // Blue
    '#F5A623', // Orange
    '#7ED321', // Green
    '#D0021B', // Red
    '#9013FE', // Purple
    '#50E3C2', // Teal
    '#BD10E0', // Magenta
    '#B8E986', // Light Green
  ];
};

export const assignWordColor = (wordIndex) => {
  const colors = getWordColors();
  return colors[wordIndex % colors.length];
};

export const highlightFoundWord = (grid, positions, wordId, color) => {
  const newGrid = [...grid];
  
  positions.forEach(pos => {
    newGrid[pos.row][pos.col] = {
      ...newGrid[pos.row][pos.col],
      isFound: true,
      wordId,
      highlightColor: color
    };
  });
  
  return newGrid;
};

export const isPositionInSelection = (position, selection) => {
  return selection.some(cell => cell.row === position.row && cell.col === position.col);
};

export const getCellStyle = (cell, position, selection, isSelecting) => {
  const baseStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#ddd',
  };
  
  // If cell is part of a found word
  if (cell.isFound && cell.highlightColor) {
    return {
      ...baseStyle,
      backgroundColor: cell.highlightColor,
      borderColor: cell.highlightColor,
    };
  }
  
  // If cell is currently being selected
  if (isSelecting && isPositionInSelection(position, selection)) {
    return {
      ...baseStyle,
      backgroundColor: 'rgba(255, 255, 0, 0.5)',
      borderColor: '#FFD700',
    };
  }
  
  return baseStyle;
};

export const validateSelection = (selection) => {
  if (selection.length < 2) return false;
  
  const first = selection[0];
  const last = selection[selection.length - 1];
  
  const rowDiff = last.row - first.row;
  const colDiff = last.col - first.col;
  const absRowDiff = Math.abs(rowDiff);
  const absColDiff = Math.abs(colDiff);
  
  // Check if it's a straight line (horizontal, vertical, or diagonal)
  if (absRowDiff !== 0 && absColDiff !== 0 && absRowDiff !== absColDiff) {
    return false; // Not a straight line
  }

  // Check if all intermediate cells are part of the path
  const expectedPath = getSelectionPath(first, last);
  
  if (expectedPath.length !== selection.length) return false;
  
  // Ensure the order of cells in selection matches the expected path
  for (let i = 0; i < selection.length; i++) {
    if (selection[i].row !== expectedPath[i].row || selection[i].col !== expectedPath[i].col) {
      return false;
    }
  }
  
  return true;
};

