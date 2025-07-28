import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Pressable, StatusBar, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearError } from '../../redux/features/auth/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { signupUser } from '../../redux/features/auth/authTrunks';
import Snackbar from 'react-native-snackbar';
import { Constants } from '../../utils/constants';
import { AppTheme } from '../../utils/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { SignupReqModel } from '../../models/auth/signupModels';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>

const Signup = ({ navigation }: SignupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch: AppDispatch = useDispatch()
  const { isLoading } = useSelector((state: RootState) => state.authentication);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    };

    // Clear previous errors
    dispatch(clearError());

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
      // } else if (!validatePassword(formData.password)) {
      //   newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      //   isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const user: SignupReqModel = {
        username: formData.name.trim().toLowerCase(),
        email: formData.email.trim(),
        password: formData.password,
        // username: 'qwerty11',
        // email: 'qwerty11@gmail.com',
        // password: 'test123'
      }
      const result = await dispatch(signupUser(user));

      if (signupUser.fulfilled.match(result)) {
        Snackbar.show({
          text: Constants.signupSuccess,
          duration: Snackbar.LENGTH_SHORT,
        })
        navigateToLogin();
      } else {
        const errorMessage = result.payload as string;
        console.log('here: ', result);
        Snackbar.show({
          text: errorMessage || Constants.tryAgain,
          duration: Snackbar.LENGTH_SHORT,
        })
      }
    } catch (error) {
      console.error('Signup error:', error);
      Snackbar.show({
        text: error as string || Constants.tryAgain,
        duration: Snackbar.LENGTH_SHORT,
      })
    }
  };

  const navigateToLogin = () => {
    navigation.replace('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle={'light-content'} />
      <View style={styles.formContainer}>
        <Text style={styles.appName}>{Constants.appName}</Text>

        {/* Name Input */}
        <TextInput
          style={[styles.input, errors.name ? styles.errorText : null]}
          placeholderTextColor={AppTheme.primary}
          placeholder={Constants.userName}
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : <View style={styles.space} />}

        {/* Email Input */}
        <TextInput
          style={[styles.input, errors.email ? styles.errorText : null]}
          placeholderTextColor={AppTheme.primary}
          placeholder={Constants.email}
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : <View style={styles.space} />}


        {/* Password Input */}
        <TextInput
          style={[styles.input, errors.password ? styles.errorText : null]}
          placeholderTextColor={AppTheme.primary}
          placeholder={Constants.password}
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        {/* <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity> */}
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : <View style={styles.space} />}

        {/* Confirm Password Input */}
        <TextInput
          style={[styles.input, errors.confirmPassword ? styles.errorText : null]}
          placeholderTextColor={AppTheme.primary}
          placeholder={Constants.confirmPassword}
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
        />
        {/* <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text style={styles.eyeText}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity> */}
        {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : <View style={styles.space} />}

        {/* Global Error */}
        {/* {errors ? <Text style={styles.globalError}>{errors}</Text> : null} */}

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.btn, isLoading ? styles.buttonDisabled : null]}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <Pressable
          onPress={navigateToLogin}
          style={styles.loginContainer}>
          <Text style={styles.haveAccountLabel}>
            {Constants.signUpAccLabel}
            <Text style={styles.loginLabel}>{Constants.login}</Text>
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  globalError: {
    color: AppTheme.secondary_2,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: AppTheme.beige,
    borderRadius: 8,
    borderColor: AppTheme.secondary_2,
    borderWidth: 1,
  },
  buttonDisabled: {
    backgroundColor: AppTheme.primary_2,
    shadowOpacity: 0,
    elevation: 0,
  },
  loginContainer: {
    marginTop: 60,
  },
  loginLabel: {
    color: AppTheme.blue,
    textDecorationLine: 'underline'
  },
});

export default Signup;