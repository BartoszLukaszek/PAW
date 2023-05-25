import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const ReminderHistoryScreen = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const loadReminders = async () => {
      const remindersJSON = await AsyncStorage.getItem('@reminder');
      let reminders = [];
      if (remindersJSON !== null) {
        reminders = JSON.parse(remindersJSON);
      }
      setReminders(reminders);
    };

    loadReminders();
  }, []);

  return (
    <View>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.action}</Text>
            <Text>{item.reminderMode}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ReminderHistoryScreen;
