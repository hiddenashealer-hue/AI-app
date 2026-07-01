import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Props {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export default function LanguageSelector({ selectedLanguage, onLanguageChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Language:</Text>

      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue: string) => onLanguageChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Urdu" value="ur" />
        <Picker.Item label="Arabic" value="ar" />
        <Picker.Item label="Hindi" value="hi" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f4f4f4",
  },
});
