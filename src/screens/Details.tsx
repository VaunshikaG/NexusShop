import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Datum } from '../models/products/productsModel';

type DetailProps = NativeStackScreenProps<RootStackParamList, 'Details'>

type DetailsType = {
    data: Datum | null;
}

const Details = ({ route, navigation }: DetailProps) => {
    const data = route.params;
    const [selectedSize, setSelectedSize] = useState('S');

    const product = {
        name: 'Pink Blazer',
        price: '$250',
        description: 'Pink blazer with soft material, not too comfortable sizing, available in various sizes, suitable for use in parties.',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
    };

    return (
        <SafeAreaView style={detailStyles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#FF8FA3" />

            {/* Header */}
            <View style={detailStyles.header}>
                <TouchableOpacity
                    style={detailStyles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={detailStyles.backText}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={detailStyles.cartButton}
                    onPress={() => navigation.navigate('AddToCart')}>
                    <Text style={detailStyles.cartText}>🛒</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <View style={detailStyles.imageContainer}>
                    <Image source={{ uri: product.image }} style={detailStyles.productImage} />
                </View>

                {/* Product Info */}
                <View style={detailStyles.productInfo}>
                    <Text style={detailStyles.productName}>{product.name}</Text>
                    <Text style={detailStyles.productPrice}>{product.price}</Text>

                    <Text style={detailStyles.description}>{product.description}</Text>

                    {/* Size Selection */}
                    <Text style={detailStyles.sizeLabel}>Size</Text>
                    <View style={detailStyles.sizeContainer}>
                        {(product.sizes || ['S', 'M', 'L', 'XL']).map((size) => (
                            <TouchableOpacity
                                key={size}
                                style={[
                                    detailStyles.sizeButton,
                                    selectedSize === size && detailStyles.selectedSize,
                                ]}
                            // onPress={() => setSelectedSize(size)}
                            >
                                <Text
                                    style={[
                                        detailStyles.sizeText,
                                        selectedSize === size && detailStyles.selectedSizeText,
                                    ]}>
                                    {size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Color Selection */}
                    <Text style={detailStyles.colorLabel}>Color</Text>
                    <View style={detailStyles.colorContainer}>
                        <TouchableOpacity style={[detailStyles.colorButton, { backgroundColor: '#FF8FA3' }]} />
                        <TouchableOpacity style={[detailStyles.colorButton, { backgroundColor: '#000' }]} />
                        <TouchableOpacity style={[detailStyles.colorButton, { backgroundColor: '#8B4513' }]} />
                    </View>
                </View>
            </ScrollView>

            {/* Buy Now Button */}
            <View style={detailStyles.bottomContainer}>
                <TouchableOpacity style={detailStyles.buyButton}>
                    <Text style={detailStyles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={detailStyles.wishlistButton}>
                    <Text style={detailStyles.wishlistText}>❤️</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const detailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF8FA3',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backText: {
        fontSize: 20,
        color: '#fff',
    },
    cartButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartText: {
        fontSize: 18,
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    productImage: {
        width: 250,
        height: 300,
        borderRadius: 20,
    },
    productInfo: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        minHeight: 400,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8FA3',
        marginBottom: 20,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 25,
    },
    sizeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    sizeContainer: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    sizeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    selectedSize: {
        backgroundColor: '#FF8FA3',
    },
    sizeText: {
        fontSize: 14,
        color: '#333',
    },
    selectedSizeText: {
        color: '#fff',
    },
    colorLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    colorContainer: {
        flexDirection: 'row',
    },
    colorButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    bottomContainer: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingBottom: 25,
        backgroundColor: '#fff',
    },
    buyButton: {
        flex: 1,
        backgroundColor: '#FF8FA3',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginRight: 15,
    },
    buyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    wishlistButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wishlistText: {
        fontSize: 20,
    },
});

export default Details;