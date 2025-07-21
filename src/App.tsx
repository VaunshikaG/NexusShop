import { StatusBar, StyleSheet } from 'react-native';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import SplashScreen from './screens/SplashScreen';
import Signup from './screens/auth/Signup';
import Login from './screens/auth/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Details from './screens/Details';
import AddToCart from './screens/AddToCart';

const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} />
        <Stack.Navigator initialRouteName='Splash'>
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
          {/* {isAuthenticated ? (
            // Authenticated screens
            <>
            </>
          ) : (
            // Unauthenticated screens
            <>
            </>
          )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
