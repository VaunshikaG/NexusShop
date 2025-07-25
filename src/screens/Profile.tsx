import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from '../redux/features/user/userTrunks';
import { RootState, AppDispatch } from '../redux/store';
import Loading from '../component/Loading';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { AppTheme } from '../utils/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AccOptionBtns from '../component/AccOptionBtns';
import IconBtn from '../component/IconBtn';

// Mock user data - In a real application, this would come from your Redux store or an API call.
const USER_DATA = {
    name: 'Scarlett Jones',
    email: 'sjones@gmail.com',
    avatar: '../../assets/imgs/no_profile.jpeg',
};

interface ProfileOption {
    id: number;
    title: string;
    icon: string;
}

const PROFILE_OPTIONS: ProfileOption[] = [
    { id: 1, title: 'My Address', icon: 'location-dot' },
    { id: 2, title: 'Account', icon: 'user' },
    { id: 3, title: 'Notifications', icon: 'bell' },
    { id: 4, title: 'Devices', icon: 'mobile-screen-button' },
    { id: 5, title: 'Passwords', icon: 'key' },
    { id: 6, title: 'Language', icon: 'globe' },
];

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

const Profile = ({ navigation }: ProfileProps) => {
    // const { data, isLoading, apiError, success } = useSelector((state: RootState) => state.userInfo);
    // const dispatch: AppDispatch = useDispatch()


    // useEffect(() => {
    //     dispatch(fetchUserInfo())
    //     if (isLoading && success) {
    //         console.log('home: ', isLoading, success);
    //     }
    // }, [])

    const user = USER_DATA;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* Header section of the profile screen. */}
            <View style={styles.header}>
                <IconBtn
                    iconName='arrow-left'
                    key={10}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>Profile</Text>
                <IconBtn
                    iconName='heart'
                    key={20}
                    onPress={() => navigation.goBack()}
                />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.profileHeader}>
                    <Image source={require("../../assets/imgs/no_profile.jpeg")} style={styles.avatar} />
                    <Text style={styles.profileName}>{user.name}</Text>
                    <Text style={styles.profileEmail}>{user.email}</Text>
                </View>

                <View style={styles.optionsContainer}>
                    {PROFILE_OPTIONS.map((item) => (
                        <AccOptionBtns
                            key={item.id}
                            title={item.title}
                            iconName={item.icon}
                            onPress={() => console.log('Pressed:', item.id)}
                        />
                    ))}
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>@TheNexusShop_1.0.0</Text>
            </View>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    footer: {
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: AppTheme.primary_2,
        fontSize: 13,
        textAlign: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: AppTheme.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        position: 'relative',
        marginHorizontal: 5
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: AppTheme.secondary_2,
        textAlign: 'center'
    },
    headerIconButton: {
        backgroundColor: AppTheme.beige,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: AppTheme.beige,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    iconButton: {
        padding: 5,
        marginLeft: 10,
    },
    container: {
        paddingHorizontal: 25,
    },
    profileHeader: {
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: AppTheme.primary_3,
    },
    profileEmail: {
        fontSize: 14,
        color: AppTheme.primary_3,
        marginTop: 5,
    },
    optionsContainer: {
        marginTop: 10,
    },
});

export default Profile