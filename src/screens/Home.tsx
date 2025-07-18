import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUserInfo } from '../redux/features/user/userTrunks'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
    const { data, isLoading, apiError, success } = useSelector((state: RootState) => state.userInfo);
    const dispatch: AppDispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchUserInfo())
        if (isLoading && success) {
            console.log('home: ', isLoading, success);
        }
    }, [])


    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text>{data?.username}</Text>
            {isLoading ? <Loading /> : <Text>Logged in as {data?.username}</Text>}
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
