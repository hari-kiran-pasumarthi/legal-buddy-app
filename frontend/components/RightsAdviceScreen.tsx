
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Platform } from 'react-native';
import axios from 'axios';

export default function RightsAdviceScreen() {
  const [situation, setSituation] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = Platform.OS === 'web' ? 'http://localhost:8000' : 'http://10.0.2.2:8000';

  const fetchAdvice = async () => {
    if (!situation.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/rights/`, {
        user_profile: situation
      });
      setAdvice(res.data.advice);
    } catch (err) {
      setAdvice('Unable to fetch rights advice.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Describe your situation:</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., I am a tenant facing eviction"
        value={situation}
        onChangeText={setSituation}
        multiline
      />
      <Button title={loading ? "Loading..." : "Get Advice"} onPress={fetchAdvice} />
      {advice && <Text style={styles.output}>{advice}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6 },
  output: { marginTop: 20, fontSize: 16 }
});
