import React from 'react'
import { Text, View } from 'react-native'
import Header from '../../components/Header'
import ScheduleComponent from '../../components/schedule/ScheduleComponent'
import Menu from '../../components/Menu'
import AddComponent from '../../components/schedule/AddComponent'
import { useRoute } from '@react-navigation/native';


export default function AddSchedule() {
  const route = useRoute();
  const {name} = route.params;
  console.log('bbb',name);
  return (
    <View style={{
        backgroundColor: '#E7EBF7',
        height: '100%'
    }}>
    <Header></Header>
    <View style={{
        top: 90
    }}>
        {/* <AddComponent></AddComponent> */}
        <AddComponent
        name={name}></AddComponent>
    </View>
    <View
          style={{
            paddingTop: 30,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Menu />
        </View>
    </View>
  )
}
