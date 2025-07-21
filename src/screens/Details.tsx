import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Datum } from '../models/products/productsModel';
import { AppTheme } from '../utils/colors';
import Icon from '@react-native-vector-icons/fontawesome6';

const { width } = Dimensions.get('window');

type DetailProps = NativeStackScreenProps<RootStackParamList, 'Details'>

type DetailsType = {
    data: Datum | null;
}

const Details = ({ route, navigation }: DetailProps) => {
    const data = route.params;

    return (
        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'https://i.pinimg.com/736x/12/c6/99/12c6996bb98d720960d0cc34570e0ba7.jpg' }} style={styles.productImage} resizeMode="cover" />
                    {/* <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={styles.imageScrollView}
                    >
                        {data.data.images.map((imgUri, index) => (
                            <Image
                                key={index}
                                source={{ uri: imgUri }}
                                style={styles.productImage}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView> */}

                    <TouchableOpacity
                        style={[styles.iconButton, styles.topLeftIcon]}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={20} color={AppTheme.secondary} iconStyle='solid' />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsCard}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.productName}>{data.data.title || 'Product Name'}</Text>
                            <Text style={styles.productCategory}>{data.data.category || 'Dagadia jacket'}</Text>
                        </View>
                        <Text style={styles.productPrice}>${data.data.price ? data.data.price.toFixed(2) : 'N/A'}</Text>
                    </View>

                    <Text style={styles.descriptionText}>
                        {data.data.description}
                    </Text>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.buyNowButton}>
                <Text style={styles.buyNowButtonText}>Buy Now</Text>
                <Icon name="cart-shopping" size={24} color={AppTheme.beige} iconStyle='solid' />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppTheme.primary,
    },
    appBar: {
        marginTop: 30,
        marginBottom: 10,
        paddingInline: 20,
        height: 10,
        backgroundColor: AppTheme.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    imageContainer: {
        width: '100%',
        height: width * 1.2,
        backgroundColor: AppTheme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        shadowColor: AppTheme.beige,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    imageScrollView: {
        flex: 1,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    iconButton: {
        position: 'absolute',
        top: 50,
        backgroundColor: AppTheme.white,
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
    topLeftIcon: {
        left: 20,
    },
    detailsCard: {
        width: width,
        backgroundColor: AppTheme.primary,
        padding: 25,
        elevation: 8,
        paddingBottom: 30,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    productName: {
        width: "90%",
        fontSize: 20,
        fontWeight: 'bold',
        color: AppTheme.primary_3,
        marginBottom: 10,
    },
    productCategory: {
        fontSize: 16,
        color: AppTheme.primary_3,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: AppTheme.primary_3,
    },
    descriptionText: {
        fontSize: 14,
        color: AppTheme.primary_3,
        lineHeight: 24,
        marginBottom: 10,
    },
    buyNowButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        backgroundColor: AppTheme.secondary,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
        elevation: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: '90%'
    },
    buyNowButtonText: {
        color: AppTheme.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 15
    },
});


export default Details;