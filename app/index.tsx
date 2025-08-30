import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ImageViewer from '../components/ImageViewer';
import { UserLogin } from '../components/LoginValidation';

const logoImg = require('../assets/images/mlg_logo.png');

type LoginProps = {
  logo?: any;
  accentColor?: string;
}
const router = useRouter();

export default function Index({logo = logoImg, accentColor = '#3498db' }: LoginProps) {

  const [ email, setEmail ] = useState('');
  const [password, setPassword] = useState('');

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const userEmail = 'admin';
  const userPassword = '12345678';

  const handlLogin = async () => {
    if(!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    try {
      const result = await UserLogin(email, password);
      Alert.alert('Success', 'login Successful.')
      // router.replace('/(tabs)/events');

    }catch(error: any) {
      Alert.alert('Error', 'Login failed.');
    }

  };


  return (
      <View style={[ styles.container, {backgroundColor: accentColor}  ]}>

        <View style={styles.inputContainer}>
          <View style={styles.logo}>
            {logo && <ImageViewer imgSource={logo} />}
          </View>
          <Text style={styles.title}>MLGCL ID SCANNER</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            style={[styles.input, emailFocused && styles.inputFocused]}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            style={[styles.input, passwordFocused && styles.inputFocused]}
          />
          <Pressable
            onPress={handlLogin}
            style={[{backgroundColor: '#f1c40f'}, styles.button]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    );


}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    justifyContent: 'center'
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -180
  },

  input: {
    backgroundColor: '#f1f1f1',
    padding: 13,
    borderRadius: 30,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#f1f1f1'
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    // marginTop: 150,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  inputFocused: {
    borderColor: '#f1c40f', // your accent color
    borderWidth: 2,
  },
});
