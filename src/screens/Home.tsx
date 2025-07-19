import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts } from '../redux/features/product/productTrunk'
import AppBar from '../components/AppBar'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
    const { productsData, isLoading, apiError, success } = useSelector((state: RootState) => state.products);
    const dispatch: AppDispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchProducts())
        if (isLoading && success) {
            console.log('home: ', isLoading, success);
            console.log(productsData);
        }
    }, [])


    return (
        <View style={styles.container}>
            <AppBar
                onCartPress={() => navigation.navigate('AddToCart')}
                onProfilePress={() => navigation.navigate('Profile')}
            />
            {productsData?.data.map((product) => (
                <TouchableOpacity
                    key={product.id}
                    style={styles.productCard}
                    onPress={() => navigation.navigate('Details', { data: product })}
                >
                    <Image
                        source={{ uri: product.thumbnail }}
                        style={styles.productImage}
                        resizeMode='contain'
                    />
                    <Text style={styles.productName}>{product.title}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#FF8FA3',
        width: 25,
        height: 25,
        borderRadius: 12.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
export default Home
