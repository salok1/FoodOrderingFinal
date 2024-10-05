import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView} from 'react-native';
import {useUpdateProfile} from "@/api/profiles";
import {useUpdateProduct} from "@/api/products";
import {useAuth} from "@/providers/AuthProvider";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { SafeAreaView } from 'react-native';

const UserForm = () => {
    // Define initial state for the form fields
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        avatarUrl: '',
        website: '',
        group: ''
    });
    const {profile} = useAuth();

    const [date, setDate] = useState(dayjs());

    const { mutate: updateProfile} = useUpdateProfile();

    // Handle changes in the form inputs
    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = () => {
        // Here, you can send the formData to your server or handle it further

        console.log(date.toString())
        updateProfile (
            {
                id: profile.id,
                username: formData.username,
                full_name: formData.fullName,
                avatar_url: formData.avatarUrl,
                group: formData.group,
                anniversaire: date.toString()
            },
            {
                onSuccess: () => {},
            }
        );
    };

    return (
        <SafeAreaView >
        <ScrollView >
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

            <Text style={styles.label}>ANNIVERSAIRE</Text>
            <DateTimePicker
                mode="single"
                date={date}
                onChange={(params) => setDate(params.date)}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
        </ScrollView>
        </SafeAreaView>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
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
        marginTop: 10
    }
});

export default UserForm;
