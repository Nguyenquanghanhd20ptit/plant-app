import React, { useState } from 'react'
import { FlatList,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/Header'
import ScheduleComponent from '../../components/schedule/ScheduleComponent'
import Menu from '../../components/Menu'
import TaskComponent from '../../components/schedule/TaskComponent'
import SelectWork from '../../components/schedule/SelectWork'
import SelectFrequency from '../../components/schedule/SelectFrequency'
import { useNavigation, useRoute } from '@react-navigation/native';
import StatisticComponnet from '../../components/schedule/StatisticComponnet'
import { Modal } from 'react-native-paper'

export default function Statistic() {
    const route = useRoute();
    const [plant,setPlant] = React.useState(null);
    const [visibleDay, setVisibleDay] = React.useState(false);
    const showModalDay = () => setVisibleDay(true);
    const hideModalDay = () => setVisibleDay(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, marginHorizontal:20,borderRadius:10};
    const [selectedItemDay1, setSelectedItemDay1] = useState(null);
    const [selectedItemDay2, setSelectedItemDay2] = useState(null); 
    const [selectedItemDay3, setSelectedItemDay3] = useState(null); 
    const [selectTime, setSelectTime] = useState(null);
    const [checkBeginTime,setCheckBeginTime] = React.useState(true);
    const [beginTime, setBeginTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);
    if(plant == null){
      setPlant(route.params.plant);
    }
    const dataDay1 = [];
    for (let i = 1; i <= 30; i++) {
      dataDay1.push({ id: `${i}`, text: `${i}` });
    }
    const dataDay2 = [];
    for (let i = 1; i <= 12; i++) {
      dataDay2.push({ id: `${i}`, text: `tháng ${i}` });
    }
    const dataDay3 = [];
    for (let i = 2022; i <= 2024; i++) {
      dataDay3.push({ id: `${i}`, text: `${i}` });
    }

    const setValueTime = () => {
      let dateObject = new Date(+selectedItemDay3, +selectedItemDay2 - 1, +selectedItemDay1);
      console.log(selectedItemDay1 + "/" + selectedItemDay2 + "/" + selectedItemDay3)
      if(checkBeginTime == true){
        setBeginTime(dateObject.getTime());
      }else{
        setEndTime(dateObject.getTime());
      }
      hideModalDay();
    };

  
    const renderItemDay1 = ({ item }) => {
      const itemStyle = selectedItemDay1 === item.id ? styles.selectedItem : styles.item;
    
      return (
        <TouchableOpacity onPress={() => setSelectedItemDay1(item.id)}>
          <View style={itemStyle}>
            <Text style={{
               color: selectedItemDay1 === item.id  ? 'black' : 'gray' 
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
               color: selectedItemDay2 === item.id  ? 'black' : 'gray' 
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
               color: selectedItemDay3 === item.id  ? 'black' : 'gray' 
            }}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      );
    };
   

  return (
    <View style={{
        backgroundColor: '#E7EBF7',
        height: '100%'
    }}>
    <Header></Header>
    <View style={{
        top: 100
    }}>
       <StatisticComponnet
       plant={plant}
       beginTime={beginTime}
       endTime={endTime}
       showModalDay={showModalDay}
       setCheckBeginTime={setCheckBeginTime}></StatisticComponnet>

    </View>
    <View
          style={{
            paddingTop: 30,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Menu />
        </View>
        <Modal
        visible={visibleDay} 
        onDismiss={hideModalDay} 
        contentContainerStyle={containerStyle}
        >
          <View style={{
            flexDirection:'row',
            alignItems: 'center',
            justifyContent:'center',
            height: 200
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
            {/* <View style={{
                paddingHorizontal: 10
            }}>
                <Text>aaa</Text>
            </View>
            <View>
                <Text>aaa</Text>
            </View> */}
            {/* <RNDatePicker date={date} onDateChange={setDate}></RNDatePicker> */}
          </View>
          <TouchableOpacity
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                marginTop: 20
            }}
            onPress={()=>{ setValueTime();}}>
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
        </Modal>
    </View>
  )
}



const styles = StyleSheet.create({
    item: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      backgroundColor: 'white', 
      display:'flex',
      alignItems:'center'
    },
    selectedItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      backgroundColor: 'lightgray', 
      display:'flex',
      alignItems:'center'
    },
  });