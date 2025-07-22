import React from 'react'
import { AppTheme } from '../utils/colors'
import LottieView from 'lottie-react-native'
import { StyleSheet, View } from 'react-native'

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