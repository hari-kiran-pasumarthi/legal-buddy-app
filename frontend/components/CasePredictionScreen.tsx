
import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import axios from 'axios';

export default function CasePredictionScreen() {
  const [facts, setFacts] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = Platform.OS === 'web' ? 'http://localhost:8000' : 'http://10.0.2.2:8000';

  const predictOutcome = async () => {
    if (!facts.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/predict-case/`, {
        case_facts: facts
      });
      setPrediction(res.data.outcome);
    } catch (err) {
      setPrediction('Prediction failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Predict Case Outcome</Text>
      <TextInput
        placeholder="Describe the case facts..."
        value={facts}
        onChangeText={setFacts}
        multiline
        numberOfLines={5}
        style={styles.input}
      />
      <Button title={loading ? 'Predicting...' : 'Predict'} onPress={predictOutcome} />
      <ScrollView style={styles.outputBox}>
        <Text style={styles.outputText}>{prediction}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 15, minHeight: 100 },
  outputBox: { marginTop: 20, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 8 },
  outputText: { fontSize: 16 }
});
