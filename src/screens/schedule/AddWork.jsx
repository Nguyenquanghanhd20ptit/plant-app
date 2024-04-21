import React from 'react'
import { Text, View } from 'react-native'
import Header from '../../components/Header'
import ScheduleComponent from '../../components/schedule/ScheduleComponent'
import Menu from '../../components/Menu'
import TaskComponent from '../../components/schedule/TaskComponent'
import SelectWork from '../../components/schedule/SelectWork'
import SelectFrequency from '../../components/schedule/SelectFrequency'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
export default function AddWork() {
    const route = useRoute();
    const [ reminder, setReminder] = React.useState(route.params.reminder);
    const navigation = useNavigation();
    const goToScreen1 = () => {
            navigation.navigate('AddTask', {reminder:  reminder});
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
          <SelectWork 
          reminder={reminder}
          setReminder={setReminder}
          goToScreen1={goToScreen1}>
          </SelectWork>
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
