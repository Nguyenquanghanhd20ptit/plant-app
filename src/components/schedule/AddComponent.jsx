import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCALSTORATE_CONSTANT } from '../../constants/LocalStorateConstant';
import { API_URL } from '../../constants/commonConstant';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

export default function AddComponent({ plant }) {
  const navigation = useNavigation();
  const [user, setUser] = React.useState(null);
  const [scheduler, setScheduler] = React.useState({})
  const [check,setCheck] = React.useState(false);
  const [fetchScheduler, setFetchScheduler] = useState(false);
  const isFocused = useIsFocused();
  const [reminder, setReminder] = useState({
    work: "Tưới nước",
    frequency: 1,
    specificDate: null,
    hour: 32400000,
    timeStart: 1713688082000,
    note: null,
  });
  const convertUnixToDate = (unixTime) => {
    return moment(unixTime).format('DD-MM-YYYY');
  };

  const longToTimeFormat = (timeLong) => {
    const dateObject = new Date(timeLong);
    const hours = ("0" + dateObject.getHours()).slice(-2);
    const minutes = ("0" + dateObject.getMinutes()).slice(-2);
    return `${hours} giờ ${minutes}`;
  };
  const goToScreen = () => {
    // Chuyển đến màn hình có tên là "AddSchedule"
    navigation.navigate('SelectTree');
    console.log("mmmm")
  };
  const goToScreen1 = () => {
    // Chuyển đến màn hình có tên là "AddSchedule"
    setFetchScheduler(true);
    navigation.navigate('AddTask',{reminder, plant});
    console.log("mmmm")
  };

  const goToScreenAddTask = (reminder) => {
    setFetchScheduler(true);
    navigation.navigate('AddTask',{reminder, plant});
    console.log("mmmm")
  };

  const goToScreenMain = () => {
    console.log("mmmm")
    navigation.navigate('MainSchedule');

  };
  
  if(user == null)
   AsyncStorage.getItem(LOCALSTORATE_CONSTANT.MyInfo)
    .then((userData) => {
      if (userData) {
        setUser(JSON.parse(userData));
        setCheck(true);
        console.log(user);
      } else {
        console.log('Không có dữ liệu người dùng trong AsyncStorage');
      }
    })
    .catch((error) => {
      console.error('Lỗi khi lấy dữ liệu người dùng từ AsyncStorage:', error);
    });
 
  useEffect(() => {
    if(plant !== '' && check == true){
      callToApiGetScheduler(); 
    }
  }, [plant,check,isFocused]);

  const callToApiGetScheduler = () => {
    console.log("fdfdfdf")
    console.log(user);
    fetch(API_URL.PlantApp + '/scheduler/plant-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ createdBy: user.id, plantId: plant.id }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lấy thông tin lịch trình thất bại hãy thử lại');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.errorCode === '00') {
          const value = JSON.parse(data.data);
          setScheduler(value);
          setReminder({ ...reminder, schedulerId: value.id });
          plant = scheduler.plant;
          console.log(value);
        } else if (data && data.errorMessage) {
          Alert.alert('Thông báo', data.errorMessage);
        } else {
          Alert.alert('Thông báo', 'Lấy thông tin lịch trình thất bại hãy thử lại');
        }
      })
      .catch(error => {
        Alert.alert('Thông báo', error.message);
      });
  };


  
  const callToApiDeleteRemider = (reminderDelete) => {
    Alert.alert(
      "Thông báo",
      "Bạn chắc chắn muốn xóa lời nhắc này",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK",
          onPress: () => {
            fetch(`${API_URL.PlantApp}/reminder/delete/${reminderDelete.id}`, {
              method: 'DELETE'
            })
            .then(response => {
              if (!response.ok ) {
                throw new Error('Xóa lời nhắc thất bại hãy thử lại');
              }
              return response.json();
            })
            .then(data => {
              if (data) {
                if (data.errorCode === '00') {
                  const value = JSON.parse(data.data);
                  setReloadWhenDelete(true);
                  Alert.alert('Thông báo', value);
                } else if (data.errorMessage) {
                  Alert.alert('Thông báo', data.errorMessage);
                } else {
                  Alert.alert('Thông báo', 'Xóa lời nhắc thất bại hãy thử lại');
                }
              } else {
                Alert.alert('Thông báo', 'Không có dữ liệu trả về');
              }
            })
            .catch(error => {
              Alert.alert('Thông báo', error.message);
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  



  const renderItem = ({item : reminderData }) => (
    <View style={{
      flexDirection: 'row'
    }}>
      <View style={{
        // display:'flex',
        // justifyContent:'center',
        // alignItems:'center'
        paddingTop: 5,
        paddingRight: 5
      }}>
        <Image
          style={{ height: 20, width: 16 }}
          source={require('../../assets/icons/notigreen.png')}
        />
      </View>
      <View>
        <View>
          <View>
            <TouchableOpacity onPress={() => goToScreenAddTask(reminderData)}>
               <Text style={{ fontSize: 16 }} >{reminderData.work}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskContainer}>
            <Text style={{ fontSize: 10, color: '#434343' }}>
              {
              reminderData.frequency != null ?
                (reminderData.frequency == 1 ? "Hằng ngày" : reminderData.frequency + " ngày một lần")
                : convertUnixToDate(reminderData.specificDate)
              }
              </Text>
            <Text style={{ fontSize: 10, color: '#434343' }}>{reminderData.period}</Text>
            <Text style={{ fontSize: 10, color: '#434343' }}>{longToTimeFormat(reminderData.hour)}</Text>
            <TouchableOpacity onPress={() => {callToApiDeleteRemider(reminder)}}>
            <Image
              style={{height: 12, width: 16}}
              source={require('../../assets/icons/delete1.png')}
            />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
        fontSize: 24,
        paddingVertical: 20
      }}>
        Thêm lịch trình
      </Text>
      <View>
        <View style={{
          backgroundColor: '#F6F6F8',
          paddingHorizontal: 20,
          height: 50,
          width: 300,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <TouchableOpacity onPress={goToScreen}>
            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                style={{ height: 18, width: 16 }}
                source={require('../../assets/icons/treegray.png')}
              />
              {
                plant === '' ? (
                  <Text style={{ color: '#717086', paddingLeft: 10 }}>Chọn cây</Text>
                ) :
                  (
                    <Text style={{ color: 'black', paddingLeft: 10 }}>{plant.name}</Text>
                  )
              }

            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          marginVertical: 20,
          backgroundColor: '#F6F6F8',
          paddingHorizontal: 20,
          height: 220,
          width: 300,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          paddingVertical: 20,
        }}>
          <Text style={{
            fontSize: 18,
            paddingBottom: 20
          }}>Nhắc nhở</Text>
          <View style={styles.container}>

            <FlatList

              data={scheduler.reminders}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <TouchableOpacity onPress={goToScreen1}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10
            }}>
              <Image
                style={{ height: 18, width: 16 }}
                source={require('../../assets/icons/add.png')}
              />
              <Text>
                Thêm mới
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{
        // paddingTop: 30,
        flex: 1,
        justifyContent: 'flex-end',
      }} >
        <TouchableHighlight onPress={() =>{goToScreenMain()}}
          style={{
            backgroundColor: '#18B65B',
            paddingVertical: 15,
            paddingHorizontal: 140,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <View>
            <Text style={{
              color: 'white'
            }}>
              Lưu
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
    // backgroundColor: '#fff',
    // width: '85%',
    height: '65%'

  },
  treeContainer: {
    // backgroundColor:'#F6F6F8',
    // paddingHorizontal: 20,
    // paddingVertical: 20,
    // borderRadius: 10,
    // marginBottom: 20,
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
    // paddingHorizontal: 5,
    paddingVertical: 5,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    width: '95%'
  },
});