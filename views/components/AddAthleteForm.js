import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const positions = [
  "Point Guard (PG)",
  "Shooting Guard (SG)",
  "Small Forward (SF)",
  "Power Forward (PF)",
  "Center (C)",
];

const AddAthleteForm = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(positions[0]);

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({ name: name.trim(), position });
      setName("");
      setPosition(positions[0]);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Athlete</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter athlete name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Position</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={position}
                onValueChange={(itemValue) => setPosition(itemValue)}
                style={styles.picker}
              >
                {positions.map((pos) => (
                  <Picker.Item key={pos} label={pos} value={pos} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, styles.submitButtonText]}>
                Add Athlete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#003366",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        paddingVertical: 8,
      },
    }),
  },
  picker: {
    ...Platform.select({
      ios: {
        height: 150,
      },
      android: {
        height: 50,
      },
    }),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f2f2f2",
  },
  submitButton: {
    backgroundColor: "#003366",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonText: {
    color: "#fff",
  },
});

export default AddAthleteForm;
