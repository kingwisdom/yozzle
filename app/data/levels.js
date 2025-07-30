// Level data for the word search game
export const levels = [
  {
    id: 1,
    title: "Animals",
    words: ["CAT", "DOG", "BIRD", "FISH", "LION"],
    gridSize: 8,
    difficulty: "easy"
  },
  {
    id: 2,
    title: "Colors",
    words: ["RED", "BLUE", "GREEN", "YELLOW", "PURPLE"],
    gridSize: 8,
    difficulty: "easy"
  },
  {
    id: 3,
    title: "Music",
    words: ["MOONWALK", "NEWAGE", "POP", "HARP", "ZITHER", "URBAN"],
    gridSize: 10,
    difficulty: "medium"
  },
  {
    id: 4,
    title: "Sports",
    words: ["SOCCER", "TENNIS", "BASKETBALL", "FOOTBALL", "SWIMMING"],
    gridSize: 10,
    difficulty: "medium"
  },
  {
    id: 5,
    title: "Countries",
    words: ["FRANCE", "GERMANY", "ITALY", "SPAIN", "PORTUGAL", "ENGLAND"],
    gridSize: 12,
    difficulty: "hard"
  }
];

export const getLevel = (levelId) => {
  return levels.find(level => level.id === levelId);
};

