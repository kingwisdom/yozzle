import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Header = ({ level, hints, onBack, onHint, onSettings }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>
      
      <View style={styles.centerContent}>
        <Text style={styles.levelNumber}>LEVEL {level?.id}</Text>
        <Text style={styles.levelTitle}>{level?.title}</Text>
      </View>
      
      <View style={styles.rightContent}>
        <TouchableOpacity style={styles.button} onPress={onSettings}>
          <Text style={styles.buttonText}>⚙</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.hintButton, hints === 0 && styles.hintButtonDisabled]} 
          onPress={onHint}
          disabled={hints === 0}
        >
          <Text style={styles.hintIcon}>🔍</Text>
          <Text style={styles.hintCount}>{hints}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerContent: {
    alignItems: 'center',
    flex: 1,
  },
  levelNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  levelTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 165, 0, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  hintButtonDisabled: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
  hintIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  hintCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default Header;

