import { StatusBar } from 'react-native';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import AppNavigator from './AppNavigator';
import AddToCart from './screens/AddToCart';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import Details from './screens/Details';
import Home from './screens/Home';
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <StatusBar barStyle={'light-content'} />
    //     <AppNavigator />
    //   </NavigationContainer>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          {/* <StatusBar barStyle={'light-content'} /> */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddToCart"
            component={AddToCart}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    // </Provider>
  );
}

export default App;