import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {COLORS, FONTS} from '../../config';
import {isStrongPassword} from '../../utils';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Signed up:', user);
      })
      .catch(error => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Zone Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        maxLength={30}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        maxLength={15}
      />
      {!isStrongPassword(password) && (
        <Text style={styles.strongPassword}>Password is not strong</Text>
      )}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    borderColor: COLORS.BORDER,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  signupButton: {
    width: '100%',
    height: 40,
    backgroundColor: COLORS.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.SEMIBOLD,
  },
  strongPassword: {
    color: COLORS.RED,
    fontFamily: FONTS.MEDIUM,
    marginBottom: 10,
    fontSize: 12,
  },
});

export default Signup;
