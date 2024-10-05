import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {useUpdateProfile} from "@/api/profiles";

const UserForm = () => {
    // Define initial state for the form fields
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        avatarUrl: '',
        website: '',
        group: ''
    });

    // Handle changes in the form inputs
    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        //useUpdateProfile(formData, id)
        // Here, you can send the formData to your server or handle it further
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>USERNAME</Text>
            <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(value) => handleChange('username', value)}
                placeholder="Enter Username"
            />

            <Text style={styles.label}>FULL_NAME</Text>
            <TextInput
                style={styles.input}
                value={formData.fullName}
                onChangeText={(value) => handleChange('fullName', value)}
                placeholder="Enter Full Name"
            />

            <Text style={styles.label}>AVATAR_URL</Text>
            <TextInput
                style={styles.input}
                value={formData.avatarUrl}
                onChangeText={(value) => handleChange('avatarUrl', value)}
                placeholder="Enter Avatar URL"
            />

            <Text style={styles.label}>WEBSITE</Text>
            <TextInput
                style={styles.input}
                value={formData.website}
                onChangeText={(value) => handleChange('website', value)}
                placeholder="Enter Website"
                keyboardType="url"
            />

            <Text style={styles.label}>GROUP</Text>
            <TextInput
                style={styles.input}
                value={formData.group}
                onChangeText={(value) => handleChange('group', value)}
                placeholder="Enter Group"
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    }
});

export default UserForm;
