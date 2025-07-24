import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AppTheme } from '../utils/colors';

interface AccOptionBtnsProps {
  optionKey: string;
  title: string;
  iconName: string;
  onPress?: (key: string) => void;
}

const AccOptionBtns = ({ optionKey, title, iconName, onPress }: AccOptionBtnsProps) => {
    return (
        <TouchableOpacity
            style={styles.optionButton}
            onPress={() => onPress?.(optionKey)}
        >
            <View style={styles.optionIcon}>
                <Icon
                    name={iconName as any}
                    size={18}
                    iconStyle="solid"
                    color={AppTheme.secondary}
                />
            </View>
            <Text style={styles.optionText}>{title}</Text>
            <Icon
                name="chevron-right"
                size={15}
                iconStyle="solid"
                color={AppTheme.secondary}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        marginVertical: 6,
    },
    optionIcon: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        color: AppTheme.primary_3,
    },
});

export default AccOptionBtns;