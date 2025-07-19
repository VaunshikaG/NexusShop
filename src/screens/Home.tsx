import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts } from '../redux/features/product/productTrunk'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
    const { data, isLoading, apiError, success } = useSelector((state: RootState) => state.products);
    const dispatch: AppDispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchProducts())
        if (isLoading && success) {
            console.log('home: ', isLoading, success);
            console.log(data);
            
        }
    }, [])


    return (
        <View style={styles.container}>
            <Text>Home</Text>
            {isLoading ? <Loading /> : <Text>Products: {data?.totalProducts}</Text>}
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
