import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppTheme } from '../utils/colors'
import Icon from '@react-native-vector-icons/fontawesome6'
import MaterialIcons from '@react-native-vector-icons/evil-icons'

type AppBarProps = {
  onCartPress: () => void;
  onProfilePress: () => void;
};

export default function AppBar({ onCartPress, onProfilePress }: AppBarProps) {
  return (
    <View style={styles.container}>

      <View style={styles.appBar}>
        <Text style={styles.title}>The Nexus Shop</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.appBarIcon}
            onPress={onCartPress}
          >
            <Icon name='cart-shopping' iconStyle='solid' size={20} color={AppTheme.beige} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onProfilePress}
          >
            <MaterialIcons name='cart' size={20} color={AppTheme.beige} style={styles.appBarIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.primary,
  },
  appBar: {
    marginTop: 30,
    paddingInline: 20,
    height: 60,
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
  title: {
    fontSize: 18,
    color: AppTheme.secondary_2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: "adobe-handwriting-ernie",

  },
  iconContainer: {
    flexDirection: 'row',
  },
  appBarIcon: {
    marginLeft: 10,
  }
})
