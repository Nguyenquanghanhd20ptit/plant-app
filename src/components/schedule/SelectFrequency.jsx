import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];



export default function SelectFrequency({setCheckSelect}) {
    const navigation = useNavigation();
  

  const [text, setText] = React.useState("");
  const [select, setSelect] = React.useState('null');
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSelectDay = (day) => {
    const index = selectedDays.indexOf(day);
    if (index !== -1) {
      // Nếu ngày đã được chọn, loại bỏ nó khỏi danh sách
      setSelectedDays(selectedDays.filter((item) => item !== day));
    } else {
      // Nếu ngày chưa được chọn, thêm nó vào danh sách
      setSelectedDays([...selectedDays, day]);
    }
  };
  const isDaySelected = (day) => {
    // Kiểm tra xem ngày đã được chọn chưa
    return selectedDays.includes(day);
  };
  let option;
  if(select){
    option= text + ' ngày 1 lần';
  }
  else {
    option= "Ngày cụ thể"
  }
  const goToScreen1 = () => {
    navigation.navigate('AddTask', {work:'', frequency: option });
    console.log("mmmm")
  };
  
  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      height: 490,
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

      <View>
        
        <View style={{
          marginVertical:  10,
           backgroundColor: '#F6F6F8',
           paddingHorizontal: 20,
          height: 165,
          width: 300,
          borderRadius: 10,
          display: 'flex',
        //   justifyContent:'center',
          paddingVertical: 20,
        }}>
          <Text style={{
            fontSize: 18,
            paddingBottom: 20
          }}>Chọn tần suất</Text>
          <View>
            <TouchableOpacity 
             style={{
                
                paddingHorizontal: 10,
            }}
            onPress={()=>{setSelect(true); }}
            >
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 10,
                    paddingHorizontal:  10
                }}>
                <View>
                <Text style={{ paddingLeft: 10}}>X ngày 1 lần</Text>
                </View>
                <View style={{
                    flexDirection:'row',
                }}>
                
                {select &&(
                    <Image
                style={{height: 15, width: 20}}
                source={require('../../assets/icons/tick.png')}
                />
                )}
                </View>
                
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
             style={{
                paddingHorizontal: 10,
            }}
            onPress={()=>{setSelect(false); }}
            >
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 10,
                    paddingHorizontal:  10
                }}>
                 <View>
                <Text style={{ paddingLeft: 10}}>Chọn ngày cụ thể trong tuần</Text>
                </View>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between'
                }}>
                
                {!select &&(
                    <Image
                style={{height: 15, width: 20}}
                source={require('../../assets/icons/tick.png')}
                />
                )}
                </View>
               
                
                </View>
            </TouchableOpacity>
           
            </View>
            </View>
           {
            select && (
                <View>
                <View style={{
        //   marginVertical:  10,
           backgroundColor: '#F6F6F8',
           paddingHorizontal: 20,
          height: 175,
          width: 300,
          borderRadius: 10,
          display: 'flex',
        //   justifyContent:'center',
          paddingVertical: 20,
        }}>
            <Text style={{
                paddingBottom: 5
            }}>x ngày 1 lần</Text>
            <TextInput
            onPress={()=>{setCheckSelect(true)}}
            label="number"
            value={text}
            onChangeText={text => setText(text)}
            />
        </View>
        <TouchableOpacity 
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                marginTop: 20
            }}
            onPress={()=>{ goToScreen1()}}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    backgroundColor: '#18B65B',
                    paddingHorizontal: 15,
                    borderRadius: 20,
                }}>     
                <Text style={{color: 'white'}}>Confirm</Text>
                </View>
            </TouchableOpacity>
                </View>
            )
           }

           {
            !select && (
                <View>
                <View style={{
        //   marginVertical:  10,
           backgroundColor: '#F6F6F8',
           paddingHorizontal: 20,
          height: 175,
          width: 300,
          borderRadius: 10,
          display: 'flex',
        //   justifyContent:'center',
          paddingVertical: 20,
        }}>
         <FlatList
        data={daysOfWeek.slice(1)} // Lọc từ thứ 2 đến Chủ nhật
        keyExtractor={(item, index) => index.toString()} // Sử dụng index như một key
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
            }}
            onPress={() => handleSelectDay(item)}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                borderTopStyle: 'solid',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <View>
                <Text style={{ paddingLeft: 10 }}>{item}</Text>
              </View>
              {isDaySelected(item) && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Image
                    style={{ height: 15, width: 20 }}
                    source={require('../../assets/icons/tick.png')}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
        </View>
        <TouchableOpacity 
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                marginTop: 20
            }}
            onPress={()=>{ goToScreen1()}}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    backgroundColor: '#18B65B',
                    paddingHorizontal: 15,
                    borderRadius: 20,
                }}>     
                <Text style={{color: 'white'}}>Confirm</Text>
                </View>
            </TouchableOpacity>
                </View>
            )
           }
           
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