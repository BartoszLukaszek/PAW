// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Button } from 'react-native';
// import { StatusBar } from 'expo-status-bar';


const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Add Reminder"
        onPress={() => navigation.navigate('AddReminder')}
      />
      <Button
        title="Reminder History"
        onPress={() => navigation.navigate('ReminderHistory')}
      />
    </View>
  );
};

export default HomeScreen;
