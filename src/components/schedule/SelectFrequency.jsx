import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];



export default function SelectFrequency({ reminder, setReminder, goToScreen1 }) {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [select, setSelect] = useState(null);
  const [selectedItemDay1, setSelectedItemDay1] = useState(null);
  const [selectedItemDay2, setSelectedItemDay2] = useState(null);
  const [selectedItemDay3, setSelectedItemDay3] = useState(null);


  const dataDay1 = [];
  for (let i = 1; i <= 31; i++) {
    dataDay1.push({ id: `${i}`, text: `${i}` });
  }
  const dataDay2 = [];
  for (let i = 1; i <= 12; i++) {
    dataDay2.push({ id: `${i}`, text: `tháng ${i}` });
  }
  const dataDay3 = [];
  for (let i = 2023; i <= 2026; i++) {
    dataDay3.push({ id: `${i}`, text: `${i}` });
  }


  const handleConfirmDay = () => {
    console.log("dfdsfdsfkololll");
    dateObject = new Date(+selectedItemDay3, +selectedItemDay2 - 1, +selectedItemDay1);
    console.log(selectedItemDay1 + "/" + selectedItemDay2 + "/" + selectedItemDay3)
    console.log(dateObject.getTime());
    setReminder(reminder => ({ ...reminder, frequency: null, specificDate: dateObject.getTime() }));
    console.log(reminder);
    goToScreen1();
  };

  const handleFrequency = () => {
    console.log(text);
    setReminder({ ...reminder, frequency: 4, specificDate: null });
    setReminder({ ...reminder, work: 'Bón phân' });
    console.log(reminder);
    goToScreen1();
  }
  const renderItemDay1 = ({ item }) => {
    const itemStyle = selectedItemDay1 === item.id ? styles.selectedItem : styles.item;

    return (
      <TouchableOpacity onPress={() => setSelectedItemDay1(item.id)}>
        <View style={itemStyle}>
          <Text style={{
            color: selectedItemDay1 === item.id ? 'black' : 'gray'
          }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemDay2 = ({ item }) => {
    const itemStyle = selectedItemDay2 === item.id ? styles.selectedItem : styles.item;

    return (
      <TouchableOpacity onPress={() => setSelectedItemDay2(item.id)} style={{

      }}>
        <View style={itemStyle}>
          <Text style={{
            color: selectedItemDay2 === item.id ? 'black' : 'gray'
          }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemDay3 = ({ item }) => {
    const itemStyle = selectedItemDay3 === item.id ? styles.selectedItem : styles.item;

    return (
      <TouchableOpacity onPress={() => setSelectedItemDay3(item.id)} style={{

      }}>
        <View style={itemStyle}>
          <Text style={{
            color: selectedItemDay3 === item.id ? 'black' : 'gray'
          }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
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
        fontSize: 24,
        paddingTop: 20,
        paddingBottom: 10,
      }}>
        Tạo lịch trình
      </Text>

      <View>

        <View style={{
          marginVertical: 10,
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
              onPress={() => { setSelect(true); }}
            >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                borderTopStyle: 'solid',
                paddingVertical: 10,
                paddingHorizontal: 10
              }}>
                <View>
                  <Text style={{ paddingLeft: 10 }}>X ngày 1 lần</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                }}>

                  {select && (
                    <Image
                      style={{ height: 15, width: 20 }}
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
              onPress={() => { setSelect(false); }}
            >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                borderTopStyle: 'solid',
                paddingVertical: 10,
                paddingHorizontal: 10
              }}>
                <View>
                  <Text style={{ paddingLeft: 10 }}>Chọn ngày cụ thể</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>

                  {!select && (
                    <Image
                      style={{ height: 15, width: 20 }}
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
                marginVertical: 10,
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
                  onPress={() => { setCheckSelect(true) }}
                  label="number"
                  value={text}
                  onChangeText={text => setText(text)}
                />
              </View>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20
                }}
                onPress={() => { handleFrequency() }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  backgroundColor: '#18B65B',
                  paddingHorizontal: 15,
                  borderRadius: 20,
                }}>
                  <Text style={{ color: 'white' }}>Confirm</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }

        {
          !select && (
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
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 160
              }}>
                <FlatList
                  data={dataDay1}
                  renderItem={renderItemDay1}
                  keyExtractor={(item) => item.id}
                />
                <FlatList
                  data={dataDay2}
                  renderItem={renderItemDay2}
                  keyExtractor={(item) => item.id}
                />
                <FlatList
                  data={dataDay3}
                  renderItem={renderItemDay3}
                  keyExtractor={(item) => item.id}
                />

              </View>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20
                }}
                onPress={() => {handleConfirmDay()}} >
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  backgroundColor: '#18B65B',
                  paddingHorizontal: 15,
                  borderRadius: 20,
                }}>
                    <Text>Confirm</Text>
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

    height: '65%'

  },
  treeContainer: {

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
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center'
  },
  selectedItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: 'lightgray',
    display: 'flex',
    alignItems: 'center'
  },
});