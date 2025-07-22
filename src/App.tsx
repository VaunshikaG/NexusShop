import { StatusBar } from 'react-native';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;