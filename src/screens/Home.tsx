import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
    const { isLoggedIn, isLoading, loginInfo, signupInfo } = useSelector((state: RootState) => state.authentication);

    let userData = null;
    if (isLoggedIn && loginInfo) {
        userData = loginInfo;
    } else if (signupInfo) {
        userData = signupInfo;
    console.log("userInfo : ", userData?.data.user.username);
    }

    // useEffect(() => {
    //     console.log("userInfo : ", userData);
    //     if (!isLoggedIn) {
    //         navigation.replace('Splash')
    //     }
    // },)

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text>{signupInfo?.message}</Text>
            {/* {isLoading ? <Loading /> : <Text>Logged in as {user?.username}</Text>} */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Home
