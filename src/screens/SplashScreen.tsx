import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/index';
import Video from 'react-native-video';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Signup');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/imgs/logo_transparent.gif')}
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
        alignItems: 'center'
    },
    gif: {
        width: 450,
        height: 450
    },
    video: {
        position: 'absolute',
        width: 200,
        height: 200
    }
});

export default SplashScreen;
