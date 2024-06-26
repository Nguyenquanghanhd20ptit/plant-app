import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EMAIL_PATTERN, PHONE_PATTERN } from '../../constants/regex/RegexConstant';
export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');
  const navigation = useNavigation();
  const handleRegister = () => {
    const isNull = !username || !fullname
      || !email || !phoneNumber
      || !address || !password
      || !comfirmPassword;

    if (isNull) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin đăng kí');
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      Alert.alert('Thông báo', 'Email không hợp lệ');
      return;
    }
    if (!PHONE_PATTERN.test(phoneNumber)) {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ')
      return;
    }
    if (username.length < 6) {
      Alert.alert('Thông báo', 'Tên đăng nhập phải lớn hơn 6 kí tự');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Thông báo', ' Mật khẩu phải lớn hơn 8 kí tự');
      return;
    }
    if (password !== comfirmPassword) {
      Alert.alert('THông báo', 'Mật khẩu không khớp');
      return;
    }
    Alert.alert('Thông báo', 'Đăng kí tài khoản thành công');
    goToScreenSuccess();
  };
  const goToScreenLogin = () => {
    navigation.navigate('Login');
    console.log("mmmm")
  };
  const goToScreenSuccess = () => {
    navigation.navigate('Login');
    console.log("mmmm")
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_login}>
        <Text style={styles.title}>Đăng kí tài khoản</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          onChangeText={text => setFullname(text)}
          value={fullname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          onChangeText={text => setAddress(text)}
          value={address}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />

        <TextInput
          style={styles.input}
          placeholder="Nhập lại Mật khẩu"
          secureTextEntry={true}
          onChangeText={text => setComfirmPassword(text)}
          value={comfirmPassword}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Đăng kí</Text>
        </TouchableHighlight>

        <View style={styles.linkWrapper}>
          <Text style={styles.register}>
            Bạn đã có tài khoản?{' '}
          </Text>
          <TouchableOpacity onPress={goToScreenLogin}>
            <Text style={styles.linkText}> Đăng nhập ngay.</Text>
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
    marginTop: 20,
    color: '#18B65B',
  },
  register: {
    marginTop: 20,
  },
});