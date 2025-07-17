import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
    const { data, isLoading,  } = useSelector((state: RootState) => state.userInfo);

    let userData = null;
    if (data) {
        console.log("userInfo : ", data);
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
            <Text>{data?.username}</Text>
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
