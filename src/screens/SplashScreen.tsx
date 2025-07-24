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
        const dispatch: AppDispatch = useDispatch()
        const { isAuthenticated } = useSelector((state: RootState) => state.authentication);

        useEffect(() => {
            loadData()
        }, [dispatch]);

        const loadData = async () => {
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

            } else {
                console.log('loadData done: ', result);
                const timer = setTimeout(() => {
                    if (isAuthenticated) {
                        navigation.replace('Signup');
                    } else {
                        navigation.replace('Home')
                    }
                }, 2000);

                return () => clearTimeout(timer);
            }
        }

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigation.replace('Home')
    //     }, 2000);

    //     return () => clearTimeout(timer);
    // }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <Image
                source={require('../../assets/imgs/logo_transparent1.gif')}
                style={styles.gif}
                resizeMode="contain"
            />
            {/* <Video
                source={require('../assets/logo_transparent.mp4')}
                style={styles.video}
                muted
                repeat
                resizeMode="cover"
            /> */}
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
    video: {
        position: 'absolute',
        width: 200,
        height: 200
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default SplashScreen;
