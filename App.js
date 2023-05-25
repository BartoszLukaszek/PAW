import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddReminderScreen from './screens/AddReminderScreen';
import EditReminderScreen from './screens/EditReminderScreen';
import HistoryScreen from './screens/HistoryScreen';
import ReminderHistoryScreen from './screens/ReminderHistoryScreen';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddReminder" component={AddReminderScreen} />
        <Stack.Screen name="EditReminder" component={EditReminderScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="ReminderHistory" component={ReminderHistoryScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
