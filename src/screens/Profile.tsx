import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from '../redux/features/user/userTrunks';
import { RootState, AppDispatch } from '../redux/store';
import Loading from '../component/Loading';

const Profile = () => {
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
export default Profile
