import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { AppTheme } from '../utils/colors';

interface IconBtnProps {
    optionKey: string;
    iconName: string;
    onPress?: (key: string) => void;
    iconStyle?: StyleProp<ViewStyle>;
}

const IconBtn = ({ optionKey, iconName, onPress , iconStyle}: IconBtnProps) => {
    return (
        <TouchableOpacity
            style={[styles.optionIcon, iconStyle]}
            onPress={() => onPress?.(optionKey)}
        >
            <Icon
                name={iconName as any}
                size={20}
                iconStyle="solid"
                color={AppTheme.secondary}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    optionIcon: {
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
});

export default IconBtn;