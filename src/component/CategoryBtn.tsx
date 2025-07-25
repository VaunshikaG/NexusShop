import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppTheme } from '../utils/colors';

interface CategoryBtnProps {
    key: number;
    btnName: string;
    isActive: boolean;
    onPress?: () => void;
}

const CategoryBtn = ({ isActive, btnName, onPress }: CategoryBtnProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.optionIcon, 
                isActive ? styles.activeButton : null
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.btnText,
                isActive ? styles.activeButton : null
            ]}>
                {btnName.charAt(0).toUpperCase() + btnName.slice(1)}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    activeButton: {
        backgroundColor: AppTheme.primary_3 ,
        color: AppTheme.secondary, 
    },
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
        paddingVertical: 1,
    },
});

export default CategoryBtn