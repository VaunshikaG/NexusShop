import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'
import { AppTheme } from '../../utils/colors'
import { Constants } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Snackbar from 'react-native-snackbar'
import Loading from '../../components/Loading'
import { LoginReqModel } from '../../models/auth/loginModels'
import { resetAll } from '../../redux/features/auth/authSlice'
import { loginUser } from '../../redux/features/auth/authTrunks'

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login = ({ navigation }: LoginProps) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const dispatch: AppDispatch = useDispatch()
    const { isLoggedIn, isLoading, apiError, apiSuccess, userInfo } = useSelector((state: RootState) => state.authentication);

    useEffect(() => {
        if (isLoggedIn && apiSuccess) {
            Snackbar.show({
                text: Constants.loginSuccess,
                duration: Snackbar.LENGTH_SHORT,
            })
            navigation.replace('Home')
            setUsername('')
            setPassword('')
            setError('')
        } else if (apiError) {
            setError(apiError)
            dispatch(resetAll())
        }
    }), [isLoggedIn, apiError]

    const handleLogin = () => {
        if (
            username.length < 1 ||
            password.length < 1
        ) {
            setError('Please fill all fields')
        } else {
            const user: LoginReqModel = {
                username: username,
                password: password,
            }
            dispatch(loginUser(user))
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.formContainer}>
                {/* <Loading /> */}
                <Text style={styles.appName}>{Constants.appName}</Text>

                {/* username */}
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

                {/* Validation error */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                {isLoading && <Loading />}

                {/* Login button */}
                <Pressable
                    onPress={handleLogin}
                    style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
                    <Text style={styles.btnText}>{Constants.login}</Text>
                </Pressable>

                {/* Signup navigation */}
                <Pressable
                    onPress={() => navigation.replace('Signup')}
                    style={styles.signupContainer}>
                    <Text style={styles.haveAccountLabel}>
                        {Constants.loginAccLabel}
                        <Text style={styles.signupLabel}>{Constants.signup}</Text>
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

export default Login