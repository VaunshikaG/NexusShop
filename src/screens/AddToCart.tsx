import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Icon from '@react-native-vector-icons/fontawesome6'
import IconBtn from '../component/IconBtn';
import { AppTheme } from '../utils/colors';
import { CART_ITEMS } from '../types/cart';

type AddToCartProps = NativeStackScreenProps<RootStackParamList, 'AddToCart'>

const AddToCart = ({ route, navigation }: AddToCartProps) => {
  const [cartItems, setCartItems] = useState(CART_ITEMS.products);
  // const [cartItems, setCartItems] = useState(route.params?.data || []);

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + amount) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.discountedTotal * item.quantity, 0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <IconBtn
          iconName='arrow-left'
          key={10}
          iconStyle={styles.headerButton}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Cart</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.shopNowButton}>
              <Text style={styles.shopNowButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>

              <Image source={{ uri: item.thumbnail }} style={styles.itemImage} resizeMode='cover' />

              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>$ {item.discountedTotal.toFixed(2)}</Text>
              </View>

              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
              </View>

            </View>
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowButtonText}>Checkout</Text>
          <Text style={styles.totalText}>$ {calculateTotal().toFixed(2)}</Text>
          <Icon name="arrow-right-long" size={20} color={AppTheme.beige} iconStyle='solid' />
          {/* <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text> */}
        </TouchableOpacity>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppTheme.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    position: 'relative',
    backgroundColor: AppTheme.primary,
  },
  headerButton: {
    position: 'absolute',
    left: 20,
    padding: 5,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: AppTheme.secondary_2,
    textAlign: 'center'
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: AppTheme.primary_3,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 5,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    width: 100
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: AppTheme.primary,
  },
  itemPrice: {
    marginVertical: 10,
    fontSize: 15,
    fontWeight: '700',
    color: AppTheme.primary,
  },
  quantityControl: {
    marginLeft: 5,
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 3,
    borderColor: AppTheme.primary_2,
  },
  quantityButton: {
    padding: 8,
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppTheme.primary_4,
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '500',
    marginHorizontal: 15,
    color: AppTheme.primary
  },
  buyNowButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: AppTheme.secondary,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 20,
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '90%',
    paddingHorizontal: 30,
  },
  buyNowButtonText: {
    color: AppTheme.white,
    fontSize: 15,
    fontWeight: '600',
    marginRight: 15
  },
  totalText: {
    color: AppTheme.white,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 15
  },
  totalContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  totalLabel: {
    fontSize: 16,
    color: '#888',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppTheme.beige,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyCartText: {
    fontSize: 18,
    color: AppTheme.primary_2,
    marginBottom: 20,
  },
  shopNowButton: {
    backgroundColor: AppTheme.secondary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  shopNowButtonText: {
    color: AppTheme.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddToCart