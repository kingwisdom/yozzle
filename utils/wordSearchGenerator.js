// Word search grid generation utilities - Optimized for 5x5 grid

export const generateWordGrid = (words, gridSize = 5) => {
  // Force 5x5 grid size
  const FIXED_GRID_SIZE = 5;
  
  // Initialize empty grid
  const grid = Array(FIXED_GRID_SIZE).fill(null).map(() => 
    Array(FIXED_GRID_SIZE).fill(null).map(() => ({
      letter: '',
      isFound: false,
      wordId: null,
      isPlaced: false
    }))
  );

  const placedWords = [];
  
  // Filter words to fit in 5x5 grid (max 5 characters)
  const validWords = words.filter(word => word.length <= FIXED_GRID_SIZE);

  // Try to place each word in the grid
  validWords.forEach(word => {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 200; // Increased attempts for smaller grid

    while (!placed && attempts < maxAttempts) {
      const direction = getRandomDirection();
      const startPos = getRandomStartPosition(word, FIXED_GRID_SIZE, direction);
      
      if (canPlaceWord(grid, word, startPos, direction)) {
        placeWord(grid, word, startPos, direction);
        placedWords.push({
          word,
          startPos,
          direction,
          positions: getWordPositions(word, startPos, direction)
        });
        placed = true;
      }
      attempts++;
    }
  });

  // Fill empty cells with random letters
  fillEmptyCells(grid);

  return grid;
};

const getRandomDirection = () => {
  const directions = [
    { row: 0, col: 1 },   // horizontal
    { row: 1, col: 0 },   // vertical
    { row: 1, col: 1 },   // diagonal down-right
    { row: 1, col: -1 },  // diagonal down-left
    { row: 0, col: -1 },  // horizontal reverse
    { row: -1, col: 0 },  // vertical reverse
    { row: -1, col: -1 }, // diagonal up-left
    { row: -1, col: 1 }   // diagonal up-right
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

const getRandomStartPosition = (word, gridSize, direction) => {
  const wordLength = word.length;
  
  // Calculate valid start positions based on direction
  let maxRow = gridSize - 1;
  let maxCol = gridSize - 1;
  let minRow = 0;
  let minCol = 0;

  if (direction.row > 0) {
    maxRow = gridSize - wordLength;
  } else if (direction.row < 0) {
    minRow = wordLength - 1;
  }

  if (direction.col > 0) {
    maxCol = gridSize - wordLength;
  } else if (direction.col < 0) {
    minCol = wordLength - 1;
  }

  // Ensure we have valid ranges
  maxRow = Math.max(maxRow, minRow);
  maxCol = Math.max(maxCol, minCol);

  return {
    row: Math.floor(Math.random() * (maxRow - minRow + 1)) + minRow,
    col: Math.floor(Math.random() * (maxCol - minCol + 1)) + minCol
  };
};

const canPlaceWord = (grid, word, startPos, direction) => {
  for (let i = 0; i < word.length; i++) {
    const row = startPos.row + (direction.row * i);
    const col = startPos.col + (direction.col * i);
    
    // Check bounds
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      return false;
    }
    
    // Check if cell is already occupied by a different letter
    const cell = grid[row][col];
    if (cell.isPlaced && cell.letter !== word[i]) {
      return false;
    }
  }
  return true;
};

const placeWord = (grid, word, startPos, direction) => {
  for (let i = 0; i < word.length; i++) {
    const row = startPos.row + (direction.row * i);
    const col = startPos.col + (direction.col * i);
    
    grid[row][col] = {
      letter: word[i],
      isFound: false,
      wordId: word,
      isPlaced: true
    };
  }
};

const getWordPositions = (word, startPos, direction) => {
  const positions = [];
  for (let i = 0; i < word.length; i++) {
    positions.push({
      row: startPos.row + (direction.row * i),
      col: startPos.col + (direction.col * i)
    });
  }
  return positions;
};

const fillEmptyCells = (grid) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (!grid[row][col].isPlaced) {
        grid[row][col] = {
          letter: letters[Math.floor(Math.random() * letters.length)],
          isFound: false,
          wordId: null,
          isPlaced: false
        };
      }
    }
  }
};

// Helper function to check if a selection forms a valid line
export const isValidSelection = (cells) => {
  if (cells.length < 2) return false;
  
  const first = cells[0];
  const second = cells[1];
  
  const rowDiff = second.row - first.row;
  const colDiff = second.col - first.col;
  
  // Normalize direction
  const direction = {
    row: rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff),
    col: colDiff === 0 ? 0 : colDiff / Math.abs(colDiff)
  };
  
  // Check if all cells follow the same direction
  for (let i = 1; i < cells.length; i++) {
    const expectedRow = first.row + (direction.row * i);
    const expectedCol = first.col + (direction.col * i);
    
    if (cells[i].row !== expectedRow || cells[i].col !== expectedCol) {
      return false;
    }
  }
  
  return true;
};

