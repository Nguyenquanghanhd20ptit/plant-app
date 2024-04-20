import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import { EMAIL_PATTERN } from '../../constants/regex/RegexConstant';
import { useNavigation } from '@react-navigation/native';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin đăng nhập');
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      Alert.alert('Thông báo', 'Email không hợp lệ');
      return;
    }
    if (email === "hanhd20ptit@gmail.com" && password === "hanh12345") {
      goToScreenSuccess();
    }
    else{
      Alert.alert('Thông báo', 'Sai tài khoản hoặc mật khẩu');
      return;
    }
  };
  const goToScreenRegister = () => {
    navigation.navigate('Register');
    console.log("mmmm")
  };
  const goToScreenSuccess = () => {
    navigation.navigate('MainSchedule');
    console.log("mmmm")
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
        <TouchableHighlight
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableHighlight>

        <View style={styles.linkWrapper}>
          <Text style={styles.register}>
            Bạn chưa có tài khoản?{' '}
          </Text>
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
    backgroundColor: "#18B65B",
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
    marginTop : 20,
    color: '#18B65B',
  },
  register: {
    marginTop: 20,
  },
});