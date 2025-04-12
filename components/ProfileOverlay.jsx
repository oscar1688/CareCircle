import React from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

const ProfileOverlay = ({ modalVisible, setModalVisible }) => {
  const router = useRouter();
  return (
    <Modal 
      transparent={true} 
      visible={modalVisible} 
      animationType="slide"
      onRequestClose={() => setModalVisible(false)} // Ensure it closes properly
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Cancel & Save Buttons */}
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Image & Edit Photo*/}
          <Image source={require("../assets/images/profile.png")} style={styles.modalProfileImage} />
          <Text style={styles.editPhoto}>Edit Photo</Text>

          {/* Input Fields */}
          <TextInput style={styles.input} placeholder="Username" />
          <TextInput style={styles.input} placeholder="email@email.com" />
          <TextInput style={styles.input} placeholder="password" secureTextEntry />

          {/* Log Out & Delete Account */}
          <TouchableOpacity style={styles.button} onPress={() => {router.replace('/(auth)/sign-in')}}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.deleteText}>Delete CareCircle Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelText: {
    color: "red",
  },
  saveText: {
    color: "blue",
  },
  modalProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "green",
    marginBottom: 10,
  },
  editPhoto: {
    color: "blue",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    color: 'grey'
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "black",
  },
  deleteText: {
    color: "red",
  },
});
export default ProfileOverlay;
