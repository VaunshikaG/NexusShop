import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppTheme } from '../utils/colors'
import Icon from '@react-native-vector-icons/fontawesome6'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts } from '../redux/features/product/productTrunk'
import { RootStackParamList } from '../types'
import AppBar from '../component/AppBar'
import { PRODUCT_DATA } from '../types/productsData'
import CategoryBtn from '../component/CategoryBtn'
import { CATEGORIES } from '../types/categories'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
    // const { productsData, isLoading, apiError, success } = useSelector((state: RootState) => state.products);
    // const dispatch: AppDispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchProducts())
    //     if (isLoading && success) {
    //         console.log('home: ', isLoading, success);
    //         console.log(productsData);
    //     }
    // }, [])

    const productsData = PRODUCT_DATA.products;
    const categories = CATEGORIES;

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <AppBar
                onCartPress={() => navigation.navigate('AddToCart')}
                onProfilePress={() => navigation.navigate('Profile')}
            />
            <ScrollView style={styles.scrollViewFlex} contentContainerStyle={styles.productsGridContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryContainer}
                    style={{ marginVertical: 10 }}
                >
                    {categories.map((item) => (
                        <CategoryBtn
                            key={item}
                            btnName={item}
                            onPress={() => console.log(item)}
                        />
                    ))}
                </ScrollView>


                <View style={styles.productsGrid}>
                    {productsData?.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.productCard}
                            onPress={() => navigation.navigate('Details', { data: item })}
                        >
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.productImage}
                                resizeMode='contain'
                            />
                            <View style={styles.productInfo}>
                                <Text style={styles.productBrand}>{item.brand}</Text>
                                <Text style={styles.productName}>{item.title}</Text>
                                <Text style={styles.productPrice}>₹{item.price}</Text>
                                <Text style={styles.productDiscount}>{item.discountPercentage}% off</Text>

                                <View style={styles.ratingContainer}>
                                    <Icon name='star-half-stroke' color={AppTheme.secondary_2}></Icon>
                                    <Text style={styles.productRating}> {item.rating}</Text>
                                </View>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppTheme.primary,
    },
    scrollViewFlex: {
        flex: 1,
        width: '100%',
    },
    productsGridContainer: {
        width: '100%',
        paddingHorizontal: 5,
        paddingBottom: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: AppTheme.beige,
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: AppTheme.beige,
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
    productInfo: {
        width: '100%',
    },
    productBrand: {
        fontSize: 12,
        fontWeight: '600',
        color: AppTheme.primary_2,
        marginBottom: 5,
    },
    productName: {
        fontSize: 12,
        fontWeight: '600',
        color: AppTheme.primary,
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 12,
        fontWeight: 'bold',
        color: AppTheme.primary,
        marginBottom: 5,
    },
    productDiscount: {
        fontSize: 12,
        color: AppTheme.secondary_2,
        fontWeight: '500',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    productRating: {
        fontSize: 11,
        color: AppTheme.secondary_2
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: AppTheme.secondary,
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
