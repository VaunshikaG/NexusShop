import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'
import { AppTheme } from '../../utils/colors'
import { Constants } from '../../utils/constants'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { resetAll } from '../../redux/features/auth/authSlice'
import { SignupReqModel } from '../../models/auth/signupModels'
import Snackbar from 'react-native-snackbar'
import { signupUser } from '../../redux/features/auth/authTrunks'

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>

const Signup = ({ navigation }: SignupProps) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const dispatch: AppDispatch = useDispatch()
  const { isLoading, apiError, apiSuccess } = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    if (apiSuccess) {
      navigation.replace('Home')
      Snackbar.show({
        text: Constants.signupSuccess,
        duration: Snackbar.LENGTH_SHORT,
      })
      setError('')
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } else if (apiError) {
      // setError(apiError)
      Snackbar.show({
        text: apiError,
        duration: Snackbar.LENGTH_LONG,
      })
      dispatch(resetAll())
    }
  }, [dispatch, apiError, apiSuccess]);

  const handleSignup = () => {
    const user: SignupReqModel = {
      username: 'qwerty',
      email: 'qwerty@gmail.com',
      password: 'test123',
    }
    dispatch(signupUser(user))
    // if (
    //   username.length < 1 ||
    //   email.length < 1 ||
    //   password.length < 1 ||
    //   confirmPassword.length < 1
    // ) {
    //   setError('Please fill all fields')
    // } else if (!email.match(emailRegex)) {
    //   setError('Email is not valid')
    // } else if (password !== confirmPassword) {
    //   setError('Passwords do not match')
    // } else {
    //   const user: SignupReqModel = {
    //     username: username.toLocaleLowerCase(),
    //     email: email,
    //     password: password,
    //   }

    //   dispatch(signupUser(user))
    // }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>{Constants.appName}</Text>

        {/* Name */}
        <TextInput
          value={username.toLocaleLowerCase()}
          onChangeText={text => {
            setError('');
            setUsername(text);
          }}
          placeholderTextColor={AppTheme.primary}
          placeholder={Constants.userName}
          style={styles.input}
        />

        {/* Email */}
        <TextInput
          value={email}
          keyboardType="email-address"
          autoCapitalize='none'
          textContentType='emailAddress'
          autoComplete='email'
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
          placeholderTextColor={AppTheme.primary}
          placeholder={Constants.email}
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          autoCapitalize='none'
          textContentType='password'
          autoComplete='password'
          onChangeText={text => {
            setError('');
            setPassword(text);
          }}
          placeholderTextColor={AppTheme.primary}
          placeholder={Constants.password}
          secureTextEntry
          style={styles.input}
        />

        {/* Confirm password */}
        <TextInput
          secureTextEntry
          value={confirmPassword}
          autoCapitalize='none'
          textContentType='newPassword'
          autoComplete='new-password'
          onChangeText={text => {
            setError('');
            setConfirmPassword(text);
          }}
          placeholderTextColor={AppTheme.primary}
          placeholder={Constants.confirmPassword}
          style={styles.input}
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {isLoading && <Loading />}

        {/* Signup button */}
        <Pressable
          onPress={handleSignup}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
          <Text style={styles.btnText}>{Constants.signup}</Text>
        </Pressable>

        {/* Login navigation */}
        <Pressable
          onPress={() => navigation.replace('Login')}
          style={styles.loginContainer}>
          <Text style={styles.haveAccountLabel}>
            {Constants.signUpAccLabel}
            <Text style={styles.loginLabel}>{Constants.login}</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
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
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: AppTheme.primary_2,
    alignSelf: 'center',
    fontSize: 15,
  },
  loginLabel: {
    color: AppTheme.blue,
    textDecorationLine: 'underline'
  },
});

export default Signup