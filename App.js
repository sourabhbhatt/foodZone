import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import AuthStack from './src/navigation/AuthStack.js';
import MainStack from './src/navigation/MainStack.js';
import {ErrorBoundary, Toast} from './src/components/index.js';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {KeyboardAvoidingView} from 'react-native';
export const navigationRef = createNavigationContainerRef();

const App = () => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const {toastContent} = useSelector(state => state?.app);

  function onAuthStateChanged(userData) {
    setUser(userData);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  return (
    <ErrorBoundary>
      <NavigationContainer ref={navigationRef}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          {user ? <MainStack /> : <AuthStack />}
        </KeyboardAvoidingView>
      </NavigationContainer>

      {toastContent?.message !== '' && (
        <Toast
          type={toastContent?.type}
          message={toastContent?.message}
          description={toastContent?.description}
          action={toastContent?.action}
          image={toastContent?.image}
          duration={toastContent?.duration}
          toastStyles={toastContent?.toastStyles}
        />
      )}
    </ErrorBoundary>
  );
};

export default App;
