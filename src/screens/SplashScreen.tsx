import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { loadUserFromStorage, clearStorage, loginUser } from '../redux/features/auth/authTrunks';
import { logout } from '../redux/features/auth/authSlice';
import Snackbar from 'react-native-snackbar';
import { Constants } from '../utils/constants';
import { AppTheme } from '../utils/colors';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

// const SplashScreen = () => {
const SplashScreen = ({ navigation }: SplashScreenProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home')
        }, 2000);

        return () => clearTimeout(timer);
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <Image
                source={require('../../assets/imgs/logo_transparent1.gif')}
                style={styles.gif}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppTheme.primary_3
    },
    gif: {
        width: 350,
        height: 350
    },
});

export default SplashScreen;
