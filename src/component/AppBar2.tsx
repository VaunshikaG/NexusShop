import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppTheme } from '../utils/colors'
import Icon from '@react-native-vector-icons/fontawesome6'

type AppBarProps = {
  onBackPress: () => void;
};

export default function AppBar2() {
    return (
        <View style={styles.container}>

            <View style={styles.appBar}>
                <View style={styles.iconContainer}>
                    {/* <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
                        <Icon name="arrow-left" size={24} color={AppTheme.beige} iconStyle='solid' />
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppTheme.primary,
    },
    appBar: {
        marginTop: 30,
        paddingInline: 20,
        height: 40,
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
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
    },
})
