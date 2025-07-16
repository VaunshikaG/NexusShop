import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppTheme } from '../utils/colors'
import LottieView from 'lottie-react-native'

const Loading = () => {
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator /> */}
      <LottieView source={require('../../assets/imgs/loader.gif')} autoPlay loop />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex:1,
        color: AppTheme.beige,
    }
})