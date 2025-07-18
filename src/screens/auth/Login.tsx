import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/features/auth/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Snackbar from 'react-native-snackbar';
import { loginUser } from '../../redux/features/auth/authTrunks';
import { Constants } from '../../utils/constants';
import { AppTheme } from '../../utils/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { LoginReqModel } from '../../models/auth/loginModels';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login = ({ navigation }: LoginProps) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.authentication);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { username: '', password: '' };

        dispatch(clearError());

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [field]: '',
            }));
        }
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
              const user: LoginReqModel = {
                  username: formData.username.trim().toLowerCase(),
                  password: formData.password,
                //   username: 'qwerty',
                //   password: 'test123',
              }
            const result = await dispatch(loginUser(user));

            if (loginUser.fulfilled.match(result)) {
                Snackbar.show({
                    text: Constants.loginSuccess || 'Login successful!',
                    duration: Snackbar.LENGTH_SHORT,
                });
                navigation.replace('Home');
            } else {
                console.log('loginerror: ' , result);
                
                const errorMessage = result.payload as string;
                Snackbar.show({
                    text: errorMessage || Constants.tryAgain,
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            Snackbar.show({
                text: error as string || Constants.tryAgain,
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };

    const navigateToSignup = () => {
        navigation.replace('Signup');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.formContainer}>
                <Text style={styles.appName}>{Constants.appName}</Text>

                {/* Username Input */}
                <TextInput
                    style={[styles.input, errors.username ? styles.errorText : null]}
                    placeholderTextColor={AppTheme.primary}
                    placeholder={'Username'}
                    value={formData.username}
                    onChangeText={value => handleInputChange('username', value)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {errors.username ? (
                    <Text style={styles.errorText}>{errors.username}</Text>
                ) : (
                    <View style={styles.space} />
                )}

                {/* Password Input */}
                <TextInput
                    style={[styles.input, errors.password ? styles.errorText : null]}
                    placeholderTextColor={AppTheme.primary}
                    placeholder={'Password'}
                    value={formData.password}
                    onChangeText={value => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                />
                {/* <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity> */}
                {errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                ) : (
                    <View style={styles.space} />
                )}

                <TouchableOpacity
                    style={[styles.btn, isLoading ? styles.buttonDisabled : null]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.btnText}>Login</Text>
                    )}
                </TouchableOpacity>

                <Pressable
                    onPress={navigateToSignup}
                    style={styles.signupContainer}
                >
                    <Text style={styles.haveAccountLabel}>
                        {Constants.loginAccLabel}
                        <Text style={styles.signupLabel}>{Constants.signup}</Text>
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    space: {
        height: 6,
    },
    container: {
        flex: 1,
        backgroundColor: AppTheme.primary,
    },
    formContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
    },
    appName: {
        color: AppTheme.secondary,
        fontFamily: Constants.fontThin,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: AppTheme.beige,
        padding: 10,
        height: 40,
        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        color: AppTheme.primary,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 1,
    },
    errorText: {
        color: AppTheme.secondary_2,
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 15
    },
    btn: {
        backgroundColor: AppTheme.secondary,
        padding: 10,
        height: 45,
        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        marginTop: 10,
        elevation: 3,
    },
    btnText: {
        color: AppTheme.primary_3,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonDisabled: {
        backgroundColor: AppTheme.primary_2,
        shadowOpacity: 0,
        elevation: 0,
    },
    signupContainer: {
        marginTop: 60,
    },
    haveAccountLabel: {
        color: AppTheme.primary_2,
        alignSelf: 'center',
        fontSize: 15,
    },
    signupLabel: {
        color: AppTheme.blue,
        textDecorationLine: 'underline'
    },
});

export default Login;
