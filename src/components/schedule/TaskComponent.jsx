import React from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import moment from 'moment';
import { API_URL } from '../../constants/commonConstant';

export default function TaskComponent({ reminder,setReminder,plant,setValueState,
   showModal, showModalDay, showModalNote}) {
   
   const convertUnixToDate = (unixTime) => {
      return moment(unixTime).format('DD-MM-YYYY');
    };

    const longToTimeFormat = (timeLong) => {
      const dateObject = new Date(timeLong);
      const hours = ("0" + dateObject.getHours()).slice(-2);
      const minutes = ("0" + dateObject.getMinutes()).slice(-2);
      return `${hours} giờ ${minutes}`;
  };

  const navigation = useNavigation();
  const goToScreen = () => {
    navigation.navigate('AddWork', { reminder });
  };

  const goToScreen1 = () => {
    navigation.navigate('AddFrequency',{ reminder });
  };
  
  const goToScreenScheduler = () =>{
    navigation.navigate('AddSchedule', { plant: plant });
  }

  const callToApiAddRemider = () => {
    console.log("fdf")
    fetch(  API_URL.PlantApp +'/reminder/addNew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reminder),
    })
      .then(response => {
        console.log(response);
        console.log(reminder);
        if (!response.ok) {
          throw new Error('Thêm mới thất bại hãy thử lại');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.errorCode === '00') {
          const value = JSON.parse(data.data);
          console.log(value);
          goToScreenScheduler();
        } else if (data && data.errorMessage) {
          Alert.alert('Thông báo', data.errorMessage);
        } else {
          Alert.alert('Thông báo', 'Thêm mới thất bại hãy thử lại');
        }
      })
      .catch(error => {
        Alert.alert('Thông báo', error.message);
      });
  };
  
  const frequencyStr = reminder.frequency != null ? 
  (reminder.frequency == 1 ? "Hằng ngày" : reminder.frequency +" ngày một lần")
  : convertUnixToDate(reminder.specificDate);

  const startTimeStr = convertUnixToDate( reminder.timeStart );
  const hourStr = longToTimeFormat(reminder.hour);
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
          paddingTop: 20,
          paddingBottom: 10,
      }}>
          Tạo lịch trình
      </Text>
      {/* <Button style={{marginTop: 30, color:'black'}} onPress={showModal}>
        Show
      </Button> */}
      <View>
        
        <View style={{
          marginVertical:  10,
           backgroundColor: '#F6F6F8',
           paddingHorizontal: 20,
          height: 300,
          width: 300,
          borderRadius: 10,
          display: 'flex',
        //   justifyContent:'center',
          paddingVertical: 20,
        }}>
          <Text style={{
            fontSize: 18,
            paddingBottom: 20
          }}>Nhắc nhở</Text>
          <View>
            <TouchableOpacity onPress={()=>{setValueState('congViec'); goToScreen()}}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 12,
                }}>
                <View style={{
                    flexDirection:'row',
                }}>
                <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/icons/cv.png')}
                />
                <Text style={{color:'#18B65B', paddingLeft: 10}}>Công việc</Text>
                </View>
                <Text>{reminder.work}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setValueState('tanSuat'); goToScreen1()}}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 12,
                }}>
                <View style={{
                    flexDirection:'row',
                }}>
                <Image
                style={{height: 20, width: 25}}
                source={require('../../assets/icons/ts.png')}
                />
                <Text style={{color:'#18B65B', paddingLeft: 10}}>Tần suất</Text>
                </View>
                <Text>{frequencyStr } </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setValueState('gio'); showModal()}}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 12,
                }}>
                <View style={{
                    flexDirection:'row',
                }}>
                <Image
                style={{height: 20, width: 25}}
                source={require('../../assets/icons/g.png')}
                />
                <Text style={{color:'#18B65B', paddingLeft: 10}}>Giờ</Text>
                </View>
                <Text>{hourStr}</Text>
                </View>
            </TouchableOpacity>
       
            <TouchableOpacity onPress={()=>{setValueState('batDau'), showModalDay()}}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 12,
                }}>
                <View style={{
                    flexDirection:'row',
                }}>
                <Image
                style={{height: 20, width: 25}}
                source={require('../../assets/icons/bd.png')}
                />
                <Text style={{color:'#18B65B', paddingLeft: 10}}>Ngày bắt đầu</Text>
                </View>
                <Text>{startTimeStr}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setValueState('ghiChu'); showModalNote()}}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 12,
                }}>
                <View style={{
                    flexDirection:'row',
                }}>
                <Image
                style={{height: 20, width: 25}}
                source={require('../../assets/icons/gc.png')}
                />
                <Text style={{color:'#18B65B', paddingLeft: 10}}>Ghi chú</Text>
                </View>
                <Text>{reminder.note}</Text>
                </View>
            </TouchableOpacity>
            
        </View>
        </View>
      </View>
      <View style={{
          // paddingTop: 30,
          flex: 1,
          justifyContent: 'flex-end',
        }} >
        <TouchableHighlight 
          style={{
            backgroundColor: '#18B65B',
            paddingVertical: 12,
            paddingHorizontal: 140,
            borderRadius: 10,
            marginBottom: 10,
          }}
          onPress={() => callToApiAddRemider() }>
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