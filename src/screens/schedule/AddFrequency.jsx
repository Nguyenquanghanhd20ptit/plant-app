import React from 'react'
import { Text, View } from 'react-native'
import Header from '../../components/Header'
import ScheduleComponent from '../../components/schedule/ScheduleComponent'
import Menu from '../../components/Menu'
import TaskComponent from '../../components/schedule/TaskComponent'
import SelectWork from '../../components/schedule/SelectWork'
import SelectFrequency from '../../components/schedule/SelectFrequency'
import { useNavigation } from '@react-navigation/native';

export default function AddFrequency() {
    const [valueState, setValueState]= React.useState('');
    const [selectWork, setSelectWork]= React.useState('');
    const [check, setCheck]= React.useState(0);
    const navigation = useNavigation();
    console.log("<<<<<",selectWork)
    const goToScreen1 = () => {
      
            navigation.navigate('AddTask', {work:  selectWork, frequency:'' });
        
       
        console.log("mmmm", selectWork)

      };
     
      const [checkSelect, setCheckSelect] = React.useState(false);
  console.log("bbbb",checkSelect)
   return (
    <View style={{
        backgroundColor: '#E7EBF7',
        height: '100%'
    }}>
    <Header></Header>
    <View style={{
        top: 60,
        // backgroundColor: selectedWork === 'Kiểm tra sâu bệnh' ? '#18B65B' : 'transparent',
    }}>
       
        
           
               <SelectFrequency setCheckSelect={setCheckSelect}></SelectFrequency>
            
        
       
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
