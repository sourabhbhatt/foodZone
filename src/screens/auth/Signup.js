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
import {isStrongPassword, isValidEmail} from '../../utils';
import {showToastMessage} from '../../components';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        showToastMessage({
          message: 'Signed up successfully',
          type: 'success',
        });
      })
      .catch(error => {
        const errorMessage = error.message;
        showToastMessage({
          message: errorMessage,
          type: 'error',
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Zone Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.GRAY}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        maxLength={30}
      />
      {email && !isValidEmail(email) && (
        <Text style={styles.inValidEmail}>Email is not valid</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.GRAY}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        maxLength={15}
      />
      {password && !isStrongPassword(password) && (
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
    color: COLORS.BLACK,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: COLORS.BLACK,
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
    fontSize: 16,
  },
  strongPassword: {
    color: COLORS.RED,
    fontFamily: FONTS.MEDIUM,
    marginBottom: 10,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  inValidEmail: {
    color: COLORS.RED,
    fontFamily: FONTS.MEDIUM,
    marginBottom: 10,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
});

export default Signup;
