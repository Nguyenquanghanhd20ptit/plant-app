import React from 'react'
import { Text, View } from "react-native";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import SelectFrequency from '../../components/schedule/SelectFrequency';
import { useNavigation,useRoute } from '@react-navigation/native';

export default function AddFrequency() {
    const route = useRoute();
    const [ reminder, setReminder] = React.useState(route.params.reminder);
    const navigation = useNavigation();
    const goToScreen1 = () => {
            navigation.navigate('AddTask', {reminder:  reminder });
      };
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
               <SelectFrequency 
                  reminder={reminder}
                  setReminder={setReminder}
                  goToScreen1={goToScreen1}
               ></SelectFrequency>
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
