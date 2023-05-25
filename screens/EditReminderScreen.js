import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Change this line
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditReminderScreen = ({ route, navigation }) => {


  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [action, setAction] = useState('');
  const [reminderMode, setReminderMode] = useState('once');

  const { reminderId } = route.params;

  useEffect(() => {
    const getReminder = async () => {
      const jsonValue = await AsyncStorage.getItem('@reminder');
      if (jsonValue !== null) {
        const reminders = JSON.parse(jsonValue);
        const reminder = reminders.find(r => r.id === reminderId);
        if (reminder) {
          setTitle(reminder.title);
          setDate(new Date(reminder.date));  // Make sure to convert the date string back to a Date object
          setAction(reminder.action);
          setReminderMode(reminder.reminderMode);
        }
      }
    };

    getReminder();
  }, []);

  const updateData = async (updatedReminder) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@reminder');
      let reminders = [];

      if (jsonValue !== null) {
        reminders = JSON.parse(jsonValue);
      }

      const index = reminders.findIndex(r => r.id === reminderId);

      if (index !== -1) {
        reminders[index] = updatedReminder;
        const newJsonValue = JSON.stringify(reminders);
        await AsyncStorage.setItem('@reminder', newJsonValue);
      }
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const saveReminder = () => {
    const updatedReminder = {
      id: reminderId,
      title,
      date,
      action,
      reminderMode,
    };

    updateData(updatedReminder);
    navigation.goBack();
  };

  return (
    <View>
      <Text>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text>Date</Text>
      <Button title="Select date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Text>Action</Text>
      <TextInput
        value={action}
        onChangeText={setAction}
        placeholder="Enter action"
      />

      <Text>Reminder Mode</Text>
      <Picker
        selectedValue={reminderMode}
        onValueChange={(itemValue, itemIndex) =>
          setReminderMode(itemValue)
        }>
        <Picker.Item label="Once" value="once" />
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
        <Picker.Item label="Yearly" value="yearly" />
      </Picker>

      <Button title="Save Reminder" onPress={saveReminder} />
    </View>
  );
};

export default EditReminderScreen;
