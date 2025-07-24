import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { AppTheme } from '../utils/colors';
import Icon from '@react-native-vector-icons/fontawesome6';
import { products } from '../types/data';
import IconBtn from '../component/IconBtn';

const { width } = Dimensions.get('window');

type DetailProps = NativeStackScreenProps<RootStackParamList, 'Details'>

const Details = ({ route, navigation }: DetailProps) => {
    // const product_data = route.params.data;
    const product_data = products;

    const [activeIndex, setActiveIndex] = useState(0);
    const productImages = (product_data.images && product_data.images.length > 0)
        ? product_data.images
        : [product_data.thumbnail];

    if (!product_data) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Product details not found.</Text>
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.goBackButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        if (slide !== activeIndex) {
            setActiveIndex(slide);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={true}
                        style={styles.imageScrollView}
                        onScroll={onScroll}
                    >
                        {productImages.map((imgUri, index) => (
                            <Image
                                key={index}
                                source={{ uri: imgUri }}
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                        ))}
                    </ScrollView>

                    {/* Dot indicators */}
                    <View style={styles.dotContainer}>
                        {productImages.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === activeIndex ? styles.activeDot : {}
                                ]}
                            />
                        ))}
                    </View>

                    {/* <Image source={{ uri: 'https://i.pinimg.com/736x/12/c6/99/12c6996bb98d720960d0cc34570e0ba7.jpg' }} style={styles.productImage} resizeMode="cover" /> */}

                    <IconBtn
                        iconName="arrow-left"
                        optionKey="arrow-left"
                        onPress={() => navigation.goBack()}
                        iconStyle={[styles.iconButton, styles.topLeftIcon]}
                    />
                </View>

                <View style={styles.detailsCard}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.productName}>{product_data.title || 'Product Name'}</Text>
                            <Text style={styles.productCategory}>{product_data.category || 'Dagadia jacket'}</Text>
                        </View>
                        <Text style={styles.productPrice}>${product_data.price ? product_data.price.toFixed(2) : 'N/A'}</Text>
                    </View>

                    <Text style={styles.descriptionText}>
                        {product_data.description}
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
        marginTop: 10,
    },
    imageScrollView: {
        flex: 1,
    },
    productImage: {
        width: width,
        height: '100%',
    },
    iconButton: {
        position: 'absolute',
        top: 50,
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
    topLeftIcon: {
        left: 20,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    dot: {
        height: 6,
        width: 6,
        borderRadius: 4,
        backgroundColor: AppTheme.primary_2,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: AppTheme.secondary,
        width: 8,
        height: 8,
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppTheme.primary,
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: AppTheme.secondary,
        textAlign: 'center',
        marginBottom: 20,
    },
    goBackButton: {
        backgroundColor: AppTheme.primary,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    goBackButtonText: {
        color: AppTheme.secondary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default Details;