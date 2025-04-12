import React, { useState } from 'react';
import { View, Text, Modal, Switch, TouchableOpacity, StyleSheet } from 'react-native';

const PreferencesModal = ({ visible, onClose }) => {
    const [viewEvents, setViewEvents] = useState(false);
    const [viewAvailability, setViewAvailability] = useState(false);
    const [location, setLocation] = useState(false);
    const [onlyOnSchedule, setOnlyOnSchedule] = useState(false);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancel}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Preferences</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.save}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Preferences Options */}
                    <View style={styles.option}>
                        <Text>View Events</Text>
                        <Switch value={viewEvents} onValueChange={setViewEvents} />
                    </View>
                    <View style={styles.option}>
                        <Text>View Availability only</Text>
                        <Switch value={viewAvailability} onValueChange={setViewAvailability} />
                    </View>
                    <View style={styles.option}>
                        <Text>Location</Text>
                        <Switch value={location} onValueChange={setLocation} />
                    </View>
                    <View style={styles.option}>
                        <Text>Only On Schedule</Text>
                        <Switch value={onlyOnSchedule} onValueChange={setOnlyOnSchedule} />
                    </View>

                    {/* Remove User Button */}
                    <TouchableOpacity style={styles.removeButton}>
                        <Text style={styles.removeText}>Remove User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default PreferencesModal;

const styles = StyleSheet.create({
    modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContainer: { width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10, elevation: 5 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    cancel: { color: 'red', fontSize: 16 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: 'purple' },
    save: { color: 'blue', fontSize: 16 },

    option: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
    removeButton: { marginTop: 20, padding: 10, backgroundColor: 'red', alignItems: 'center', borderRadius: 5 },
    removeText: { color: 'white', fontWeight: 'bold' },
});