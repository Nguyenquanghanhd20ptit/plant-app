import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import { EMAIL_PATTERN } from '../../constants/regex/RegexConstant';
import { useNavigation } from '@react-navigation/native';
import { LOCALSTORATE_CONSTANT } from '../../constants/LocalStorateConstant';
import { API_URL } from '../../constants/commonConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const callToApiLogin = () => {
    console.log("fdf")
    fetch(  API_URL.PlantApp +'/authentication/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {
        console.log("fddffdf");
        if (!response.ok) {
          throw new Error('Đăng nhập thất bại');
        }
        return response.json();
      })
      .then(data => {
        console.log("fddf")
        if (data && data.errorCode === '00') {
          const user = JSON.parse(data.data);
          AsyncStorage.setItem(LOCALSTORATE_CONSTANT.MyInfo, JSON.stringify(user))
            .then(() => {
              goToScreenSuccess();
              Alert.alert('Thông báo', 'Đăng nhập thành công');
              console.log('Save user success!');
            })
            .catch(error => {
              console.error('Error saving user :', error);
            });
        } else if (data && data.errorMessage) {
          Alert.alert('Thông báo', data.errorMessage);
        } else {
          Alert.alert('Thông báo', 'Đăng nhập thất bại');
        }
      })
      .catch(error => {
        Alert.alert('Thông báo', error.message);
      });
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin đăng nhập');
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      Alert.alert('Thông báo', 'Email không hợp lệ');
      return;
    }
    callToApiLogin();
  };

  const goToScreenRegister = () => {
    navigation.navigate('Register');
    console.log('mmmm');
  };

  const goToScreenSuccess = () => {
    navigation.navigate('MainSchedule');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_login}>
        <Text style={styles.title}>Đăng Nhập tài khoản</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableHighlight style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableHighlight>

        <View style={styles.linkWrapper}>
          <Text style={styles.register}>Bạn chưa có tài khoản?{' '}</Text>
          <TouchableOpacity onPress={goToScreenRegister}>
            <Text style={styles.linkText}> Đăng ký ngay.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EBF7',
  },
  container_login: {
    backgroundColor: '#fff',
    padding: 35,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#18B65B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  linkText: {
    marginTop: 20,
    color: '#18B65B',
  },
  register: {
    marginTop: 20,
  },
});
