import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const fatContentOptions = ["Low Fat", "Regular"];
const itemTypeOptions = [
  "Breads", "Breakfast", "Baking Goods", "Canned", "Dairy", "Frozen Foods",
  "Fruits and Vegetables", "Hard Drinks", "Health and Hygiene", "Household",
  "Meat", "Others", "Seafood", "Snack Foods", "Soft Drinks", "Starchy Foods"
];
const outletIdOptions = [
  "OUT010", "OUT013", "OUT017", "OUT018", "OUT019",
  "OUT027", "OUT035", "OUT045", "OUT046", "OUT049"
];
const outletSizeOptions = ["Small", "Medium", "High", "Unknown"];
const outletLocationOptions = ["Tier 1", "Tier 2", "Tier 3"];
const outletTypeOptions = [
  "Grocery Store", "Supermarket Type1", "Supermarket Type2", "Supermarket Type3"
];

export default function PriceForm({ setPrediction }) {
  const [form, setForm] = useState({
    Item_Weight: '',
    Item_Fat_Content: fatContentOptions[0],
    Item_Visibility: '',
    Item_Type: itemTypeOptions[0],
    Item_MRP: '',
    Outlet_Identifier: outletIdOptions[0],
    Outlet_Establishment_Year: '',
    Outlet_Size: outletSizeOptions[0],
    Outlet_Location_Type: outletLocationOptions[0],
    Outlet_Type: outletTypeOptions[0],
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    // Basic validation
    for (let key in form) {
      if (form[key] === '') {
        Alert.alert('Error', `Please fill the ${key.replace(/_/g, ' ')} field.`);
        return;
      }
    }
    try {
      const response = await axios.post(
        'https://sales-predictor-5kqf.onrender.com/predict',
        {
          ...form,
          Item_Weight: parseFloat(form.Item_Weight),
          Item_Visibility: parseFloat(form.Item_Visibility),
          Item_MRP: parseFloat(form.Item_MRP),
          Outlet_Establishment_Year: parseInt(form.Outlet_Establishment_Year),
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      Alert.alert('Prediction Error', error?.response?.data?.detail || 'Something went wrong!');
    }
  };

  return (
    <View style={styles.formBox}>
      <Text style={styles.title}>Price Predictor</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Weight (kg)"
        placeholderTextColor="#39ff14"
        keyboardType="numeric"
        value={form.Item_Weight}
        onChangeText={v => handleChange('Item_Weight', v)}
      />
      <Picker
        selectedValue={form.Item_Fat_Content}
        style={styles.picker}
        onValueChange={v => handleChange('Item_Fat_Content', v)}>
        {fatContentOptions.map(opt => <Picker.Item key={opt} label={opt} value={opt} />)}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Item Visibility (0-1)"
        placeholderTextColor="#39ff14"
        keyboardType="numeric"
        value={form.Item_Visibility}
        onChangeText={v => handleChange('Item_Visibility', v)}
      />
      <Picker
        selectedValue={form.Item_Type}
        style={styles.picker}
        onValueChange={v => handleChange('Item_Type', v)}>
        {itemTypeOptions.map(opt => <Picker.Item key={opt} label={opt} value={opt} />)}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Item MRP"
        placeholderTextColor="#39ff14"
        keyboardType="numeric"
        value={form.Item_MRP}
        onChangeText={v => handleChange('Item_MRP', v)}
      />
      <Picker
        selectedValue={form.Outlet_Identifier}
        style={styles.picker}
        onValueChange={v => handleChange('Outlet_Identifier', v)}>
        {outletIdOptions.map(opt => <Picker.Item key={opt} label={opt} value={opt} />)}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Outlet Establishment Year"
        placeholderTextColor="#39ff14"
        keyboardType="numeric"
        value={form.Outlet_Establishment_Year}
        onChangeText={v => handleChange('Outlet_Establishment_Year', v)}
      />
      <Picker
        selectedValue={form.Outlet_Size}
        style={styles.picker}
        onValueChange={v => handleChange('Outlet_Size', v)}>
        {outletSizeOptions.map(opt => <Picker.Item key={opt} label={opt} value={opt} />)}
      </Picker>
      <Picker
        selectedValue={form.Outlet_Location_Type}
        style={styles.picker}
        onValueChange={v => handleChange('Outlet_Location_Type', v)}>
        {outletLocationOptions.map(opt => <Picker.Item key={opt} label={opt} value={opt} />)}
      </Picker>
      <Picker
        selectedValue={form.Outlet_Type}
        style={styles.picker}
        onValueChange={v => handleChange('Outlet_Type', v)}>
        {outletTypeOptions.map(opt => <Picker.Item key={opt} label={opt} value={opt} />)}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Predict Price</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formBox: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    borderColor: '#39ff14',
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    color: '#39ff14',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 2,
  },
  input: {
    backgroundColor: '#222',
    color: '#39ff14',
    borderColor: '#39ff14',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  picker: {
    backgroundColor: '#222',
    color: '#39ff14',
    borderColor: '#39ff14',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#39ff14',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#0a0a23',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1,
  },
});