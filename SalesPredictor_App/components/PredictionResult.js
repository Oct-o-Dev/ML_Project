import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PredictionResult({ prediction }) {
  return (
    <View style={styles.resultBox}>
      <Text style={styles.resultText}>{prediction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#111',
    borderRadius: 10,
    borderColor: '#39ff14',
    borderWidth: 2,
    alignItems: 'center',
  },
  resultText: {
    color: '#39ff14',
    fontSize: 24,
    fontWeight: 'bold',
  },
});