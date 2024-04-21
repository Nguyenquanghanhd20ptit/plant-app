import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-web'
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../constants/commonConstant';

const flowerTrees = [
  {
    id: 1,
    name: 'Cây hoa hồng',
    tasks: [
      { id: 1,date: 'Hàng ngày', name: 'Tưới nước',session:'Buổi sáng', time: '7:00 AM' },
      { id: 2, date: 'Hàng ngày', name: 'Bón phân', session:'Buổi sáng', time: '9:00 AM' },
    ]
  },
  {
    id: 2,
    name: 'Cây hoa cẩm tú cầu',
    tasks: [
      { id: 1, date: 'Hàng ngày', name: 'Tưới nước', session:'Buổi sáng', time: '8:00 AM' },
      { id: 2, date: 'Hàng ngày', name: 'Bón phân', session:'Buổi sáng', time: '10:00 AM' },
    ]
  },
  // Thêm các cây hoa khác nếu cần
];

const treeSchedulers = [];
const callToApiGetScheduler = () => {
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

export default function ScheduleComponent() {
  const navigation = useNavigation();
  const goToScreen = () => {
    // Chuyển đến màn hình có tên là "AddSchedule"
    navigation.navigate('AddSchedule',{plant:''});
    // console.log("mmmm")
  };



  
  const renderItem = ({ item }) => (
    <View style={styles.treeContainer}>
      <View style={{flexDirection: 'row',
    justifyContent: 'space-between',}}>
            <View>
            <Text  style={styles.treeName} >{item.name}</Text>
            </View>
            <View>
            <Image
              style={{height: 20, width: 25}}
              source={require('../../assets/icons/delete.png')}
            />
            </View>
            </View>
      <FlatList
        data={item.tasks}
        renderItem={({ item }) => (
          <View>
            <View>
            <Text  style={{fontSize: 16}} >{item.name}</Text>
            </View>
            <View style={styles.taskContainer}>
            <Text style={{fontSize: 10, color: '#434343'}}>{item.date}</Text>
            <Text style={{fontSize: 10, color: '#434343'}}>{item.session}</Text>
            <Text style={{fontSize: 10, color: '#434343'}}>{item.time}</Text>
            <Image
              style={{height: 12, width: 16}}
              source={require('../../assets/icons/delete1.png')}
            />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  return (
    <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 450,
        display: 'flex',
        alignItems: 'center',
    }}>
        <Text style={{
            fontSize:24,
            paddingVertical: 20
        }}>
            Lịch trình
        </Text>
        
         <View style={styles.container}>
      <FlatList
      
        data={flowerTrees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
       
        {/* </ScrollView> */}
        <View style={{
            // paddingTop: 30,
            flex: 1,
            justifyContent: 'flex-end',
          }} >
          <TouchableHighlight 
            style={{
              backgroundColor: '#18B65B',
              paddingVertical: 15,
              paddingHorizontal: 120,
              borderRadius: 10,
              marginBottom: 10,
            }}
            onPress={goToScreen}>
            <View>
            <Text style={{
              color: 'white'
            }}>
              Thêm mới
            </Text>
            </View>
          </TouchableHighlight>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 20,
    backgroundColor: '#fff',
    width: '85%',
    height: '65%'

  },
  treeContainer: {
    backgroundColor:'#F6F6F8',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  treeName: {
    fontSize: 20,
    color: '#18B65B',
    // fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
});