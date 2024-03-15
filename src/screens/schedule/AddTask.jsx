import React from 'react'
import { Text, View } from 'react-native'
import Header from '../../components/Header'
import ScheduleComponent from '../../components/schedule/ScheduleComponent'
import Menu from '../../components/Menu'
import TaskComponent from '../../components/schedule/TaskComponent'
import SelectWork from '../../components/schedule/SelectWork'
import SelectFrequency from '../../components/schedule/SelectFrequency'
import { useRoute } from '@react-navigation/native';

export default function AddTask() {
    const [valueState, setValueState]= React.useState('');
    const [check, setCheck]= React.useState(0);
    const route = useRoute();
    const {work}=route.params;
    const {frequency}=route.params;


    // console.log("....",frequency)
  return (
    <View style={{
        backgroundColor: '#E7EBF7',
        height: '100%'
    }}>
    <Header></Header>
    <View style={{
        top: 100
    }}>
       
        <TaskComponent 
        setValueState={setValueState}
        setCheck={setCheck}
        work={work}
        frequency={frequency}
        ></TaskComponent>
         
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
