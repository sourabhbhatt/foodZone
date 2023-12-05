import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {COLORS, FONTS, IMAGES} from '../../config';
import ROUTES from '../../config/routes';
import {Button} from '../../components';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('Logged in:', userCredential);
      })
      .catch(error => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const navigateToSignUp = () => navigation.navigate(ROUTES.REGISTER);

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity: fadeAnim}}>
        <Image source={IMAGES.LOGO} style={styles.image} />
      </Animated.View>
      <Text style={styles.title}>Food Zone Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" style={styles.loginButton} onPress={handleLogin} />

      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.signUpText}>
          Don't have an account yet? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.SEMIBOLD,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: FONTS.BORDER,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  signUpText: {
    color: COLORS.BLUE,
  },
});

export default Login;
