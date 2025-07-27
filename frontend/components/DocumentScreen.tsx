import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Platform } from 'react-native';
import axios from 'axios';

export default function DocumentScreen() {
  const [docType, setDocType] = useState('');
  const [details, setDetails] = useState('');
  const [generatedDoc, setGeneratedDoc] = useState('');

  const API_URL = Platform.OS === 'web'
    ? 'http://localhost:8000/generate-document/'
    : 'http://10.0.2.2:8000/generate-document/'; // adjust for Android emulator

  const sendDocumentRequest = async () => {
    if (!docType || !details) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    try {
      const res = await axios.post(API_URL, {
        doc_type: docType,
        details: details
      });
      setGeneratedDoc(res.data.document);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate document');
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Document Type (e.g., affidavit, power_of_attorney, rental_agreement)</Text>
      <TextInput
        value={docType}
        onChangeText={setDocType}
        placeholder="Enter document type"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Text>Details</Text>
      <TextInput
        value={details}
        onChangeText={setDetails}
        placeholder="Enter details"
        multiline
        numberOfLines={4}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Button title="Generate Document" onPress={sendDocumentRequest} />

      {generatedDoc ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Generated Document:</Text>
          <Text>{generatedDoc}</Text>
        </View>
      ) : null}
    </View>
  );
}
