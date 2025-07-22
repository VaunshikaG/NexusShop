import React, { useEffect, useState } from 'react'
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/features/auth/authSlice';
import { loadUserFromStorage, clearStorage } from './redux/features/auth/authTrunks';
import { AppDispatch, RootState } from './redux/store';
import AddToCart from './screens/AddToCart';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import Details from './screens/Details';
import Home from './screens/Home';
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import { Constants } from './utils/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.authentication);
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  useEffect(() => {
    const performInitialCheck = async () => {
      const result = await dispatch(loadUserFromStorage())

      if (loadUserFromStorage.rejected.match(result)) {
        console.log('loadData reject: ', result);

        const errorMessage = result.error as string;
        Snackbar.show({
          text: errorMessage || Constants.tokenExpiry,
          duration: Snackbar.LENGTH_SHORT,
        });
        dispatch(logout())
        dispatch(clearStorage())
        setIsInitialCheckDone(false);

      } else {
        console.log('loadData done: ', result);
        setIsInitialCheckDone(true);
      }
    };

    performInitialCheck();
  }, []);

  if (!isInitialCheckDone || isLoading) {
    return <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />;
  }

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Signup'} screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // User is logged in, show the main app screens
        <>
          <Stack.Screen
            name="Home"
            component={Home}
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
        </>
      ) : (
        // User is not logged in, show authentication screens
        <>
          
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
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator