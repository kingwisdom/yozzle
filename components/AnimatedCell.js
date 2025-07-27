import React, { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';

const AnimatedCell = ({ 
  cell, 
  cellSize, 
  isSelected, 
  isFound, 
  cellStyle, 
  textStyle 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isSelected) {
      // Pulse animation for selected cells
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSelected]);

  useEffect(() => {
    if (isFound) {
      // Success animation when word is found
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFound]);

  return (
    <Animated.View
      style={[
        cellStyle,
        {
          width: cellSize,
          height: cellSize,
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <Text style={[textStyle, { fontSize: Math.max(cellSize * 0.4, 12) }]}>
        {cell.letter}
      </Text>
    </Animated.View>
  );
};

export default AnimatedCell;

