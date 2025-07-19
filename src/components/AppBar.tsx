import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppTheme } from '../utils/colors'
import Icon from '@react-native-vector-icons/fontawesome6'
import MaterialIcons from '@react-native-vector-icons/evil-icons'

const AppBar = () => {
  return (
    <View style={styles.container}>

        <View style={styles.appBar}>
          <Text style={styles.title}>Hello, user</Text>

          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.appBarIcon} >
              <Icon name='cart-shopping' iconStyle='solid' size={20} color={AppTheme.beige} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer}>
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
  },
  iconContainer: {
    flexDirection: 'row',
  },
  appBarIcon: {
    marginLeft: 10,
  }
})

export default AppBar