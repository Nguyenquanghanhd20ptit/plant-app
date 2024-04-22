import React, { useEffect } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../constants/commonConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCALSTORATE_CONSTANT } from '../../constants/LocalStorateConstant';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

export default function ScheduleComponent() {
  const navigation = useNavigation();
  const [schedulers, setSchedulers] = React.useState({});
  const [check,setCheck] = React.useState(false);
  const [reloadWhenDelete, setReloadWhenDelete] = React.useState(false);
  const isFocused = useIsFocused();
  const goToScreen = () => {
    navigation.navigate('AddSchedule',{plant:''});
    // console.log("mmmm")
  };

  const goToScreenSchduler = (plant) => {
    console.log(plant);
    navigation.navigate('AddSchedule',{plant : plant});
  };
  const convertUnixToDate = (unixTime) => {
    return moment(unixTime).format('DD-MM-YYYY');
  };

  const longToTimeFormat = (timeLong) => {
    const dateObject = new Date(timeLong);
    const hours = ("0" + dateObject.getHours()).slice(-2);
    const minutes = ("0" + dateObject.getMinutes()).slice(-2);
    return `${hours} giờ ${minutes}`;
  };

  const [user, setUser] = React.useState(null);

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
      if(check == true){
        callToApiGetAllScheduler();
        console.log("fđfsdfdfdffdfd");
        setReloadWhenDelete(false);
      }

    }, [check,isFocused, reloadWhenDelete == true]);
  
    const callToApiGetAllScheduler = () => {
      console.log(user); 
      fetch(`${API_URL.PlantApp}/scheduler/all?userId=${user.id}`, {
        method: 'GET'
      })
      .then(response => {
        if (!response.ok ) {
          throw new Error('Lấy thông tin lịch trình thất bại hãy thử lại');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          console.log(data);
          if (data.errorCode === '00') {
            const value = JSON.parse(data.data);
            setSchedulers(value);
          } else if (data.errorMessage) {
            Alert.alert('Thông báo', data.errorMessage);
          } else {
            Alert.alert('Thông báo', 'Lấy thông tin lịch trình thất bại hãy thử lại');
          }
        } else {
          Alert.alert('Thông báo', 'Không có dữ liệu trả về');
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

    
    const callToApiDeleteScheduler = (schedulerDelete) => {
      Alert.alert(
        "Thông báo",
        "Bạn chắc chắn muốn xóa lịch trình này",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { 
            text: "OK",
            onPress: () => {
              fetch(`${API_URL.PlantApp}/scheduler/delete/${schedulerDelete.id}`, {
                method: 'DELETE'
              })
              .then(response => {
                if (!response.ok ) {
                  throw new Error('Xóa lịch trình thất bại hãy thử lại');
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
                    Alert.alert('Thông báo', 'Xóa lịch trình bại hãy thử lại');
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
    

  
  const renderItem = ({ item }) => (
    <View style={styles.treeContainer}>
      <View style={{flexDirection: 'row',
    justifyContent: 'space-between',}}>
            <View>
            <TouchableOpacity onPress={() =>{ goToScreenSchduler(item.plant)}}>
                <Text  style={styles.treeName} >{item.plant.name}</Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity onPress={() => {callToApiDeleteScheduler(item)}}>
              <Image
                style={{height: 20, width: 25}}
                source={require('../../assets/icons/delete.png')}
              />
           </TouchableOpacity>
            </View>
            </View>
      <FlatList
        data={item.reminders}
        renderItem={({ item: reminder }) => (
          <View>
            <View>
            <Text style={{ fontSize: 16 }} >{ reminder.work}</Text>
            </View>
            <View style={styles.taskContainer}>
            <Text style={{ fontSize: 10, color: '#434343' }}>
                    {
                    reminder.frequency != null ?
                      (reminder.frequency == 1 ? "Hằng ngày" : reminder.frequency + " ngày một lần")
                      : convertUnixToDate(reminder.specificDate)
                    }
             </Text>
             <Text style={{ fontSize: 10, color: '#434343' }}>{reminder.period}</Text>
                  <Text style={{ fontSize: 10, color: '#434343' }}>{longToTimeFormat(reminder.hour)}</Text>
          <TouchableOpacity onPress={() => {callToApiDeleteRemider(reminder)}}>
            <Image
              style={{height: 12, width: 16}}
              source={require('../../assets/icons/delete1.png')}
            />
            </TouchableOpacity>
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
      
        data={schedulers}
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