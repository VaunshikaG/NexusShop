import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppTheme } from '../utils/colors';

interface CategoryBtnProps {
    key: string;
    btnName: string;
    onPress?: (key: string) => void;
}

const CategoryBtn = ({ key, btnName, onPress }: CategoryBtnProps) => {
    return (
        <TouchableOpacity
            style={styles.optionIcon}
            onPress={() => onPress?.(key)}
        >
            <Text style={styles.btnText}>{btnName.charAt(0).toUpperCase() + btnName.slice(1)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    optionIcon: {
        backgroundColor: AppTheme.secondary,
        borderRadius: 10,
        // width: 40,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: AppTheme.beige,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    btnText: {
        fontSize: 14,
        fontWeight: '600',
        color: AppTheme.beige,
        paddingHorizontal: 8,
        paddingVertical:1,
    },
});

export default CategoryBtn