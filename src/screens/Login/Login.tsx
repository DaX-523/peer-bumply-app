import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Login.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../context/AuthContext';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .label('Email'),
  password: yup.string().required('Password is required').label('Password'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuth();
  const handleLogin = async (values: any) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are sent and received
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();

        // Extract token from cookies
        const cookies = response.headers.get('set-cookie');
        if (cookies) {
          // Parse the token from the set-cookie header
          const tokenMatch = cookies.match(/token=([^;]+)/);
          if (tokenMatch) {
            const token = tokenMatch[1];
            // Store token in AsyncStorage for future authenticated requests
            await AsyncStorage.setItem('token', token);
            console.log('Token stored successfully');
          }
        }

        setUser(data.user);
        console.log('Login successful:', data);
      } else {
        const errorData = await response.json();
        console.log(
          'Login failed:',
          errorData.message || 'Invalid credentials',
        );
      }
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F59E0B" />

      <LinearGradient
        colors={['#FCD34D', '#F59E0B', '#EA580C']}
        style={styles.background}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.content}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.2)',
                  'rgba(255, 255, 255, 0.1)',
                ]}
                style={styles.logoContainer}>
                <Text style={styles.logoText}>bumble</Text>
              </LinearGradient>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitleText}>
                Sign in to continue your journey
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={loginSchema}
                onSubmit={values => handleLogin(values)}>
                {({handleSubmit, handleChange, values, errors, touched}) => (
                  <View style={styles.form}>
                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                      <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                          style={[
                            styles.input,
                            errors.email && touched.email && styles.inputError,
                          ]}
                          placeholder="Enter your email"
                          placeholderTextColor="rgba(107, 114, 128, 0.6)"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                        {errors.email && touched.email && (
                          <Text style={styles.errorText}>{errors.email}</Text>
                        )}
                      </View>
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                      <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput
                          style={[
                            styles.input,
                            errors.password &&
                              touched.password &&
                              styles.inputError,
                          ]}
                          placeholder="Enter your password"
                          placeholderTextColor="rgba(107, 114, 128, 0.6)"
                          value={values.password}
                          onChangeText={handleChange('password')}
                          secureTextEntry
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                        {errors.password && touched.password && (
                          <Text style={styles.errorText}>
                            {errors.password}
                          </Text>
                        )}
                      </View>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                      <Text style={styles.forgotPasswordText}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      style={styles.loginButton}
                      activeOpacity={0.8}>
                      <LinearGradient
                        colors={[
                          'rgba(255, 255, 255, 0.95)',
                          'rgba(255, 255, 255, 0.85)',
                        ]}
                        style={styles.loginButtonGradient}>
                        <Text style={styles.loginButtonText}>Sign In</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>or</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    {/* Social Login Buttons */}
                    <View style={styles.socialContainer}>
                      <TouchableOpacity
                        style={styles.socialButton}
                        activeOpacity={0.8}>
                        <LinearGradient
                          colors={[
                            'rgba(255, 255, 255, 0.2)',
                            'rgba(255, 255, 255, 0.1)',
                          ]}
                          style={styles.socialButtonGradient}>
                          <Text style={styles.socialButtonText}>
                            📱 Continue with Phone
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.socialButton}
                        activeOpacity={0.8}>
                        <LinearGradient
                          colors={[
                            'rgba(255, 255, 255, 0.2)',
                            'rgba(255, 255, 255, 0.1)',
                          ]}
                          style={styles.socialButtonGradient}>
                          <Text style={styles.socialButtonText}>
                            🍎 Continue with Apple
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Login;
