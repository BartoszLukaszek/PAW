import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddReminderScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [action, setAction] = useState('');
  const [reminderMode, setReminderMode] = useState('once');

  const storeData = async (newReminder) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@reminder');
      let reminders = [];

      if (jsonValue !== null) {
        reminders = JSON.parse(jsonValue);
      }

      reminders.push(newReminder);
      const newJsonValue = JSON.stringify(reminders);
      await AsyncStorage.setItem('@reminder', newJsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const saveReminder = () => {
    const newReminder = {
      id: Date.now(),
      title,
      date,
      action,
      reminderMode,
    };

    storeData(newReminder);
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

      <Button title="Add Reminder" onPress={saveReminder} />
    </View>
  );
};

export default AddReminderScreen;
