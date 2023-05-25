import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';



const HistoryScreen = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const getReminders = async () => {
      const jsonValue = await AsyncStorage.getItem('@reminder');
      if(jsonValue !== null) {
        setReminders(JSON.parse(jsonValue));
      }
    };

    getReminders();
  }, []);

  const deleteReminder = async (id) => {
    const updatedReminders = reminders.filter(r => r.id !== id);
    setReminders(updatedReminders);
    const jsonValue = JSON.stringify(updatedReminders);
    await AsyncStorage.setItem('@reminder', jsonValue);
  };

  return (
    <View>
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.action}</Text>
            <Text>{item.reminderMode}</Text>
            <Button 
              title="Edit" 
              onPress={() => navigation.navigate('EditReminder', { reminderId: item.id })} 
            />
            <Button title="Delete" onPress={() => deleteReminder(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default HistoryScreen;
