import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
  const navigation = useNavigation();
  const goToScreen = () => {
    // Chuyển đến màn hình có tên là "AddSchedule"
    navigation.navigate('Test');
    // console.log("mmmm")
  };
   const goToScreen1 = () => {
    // Chuyển đến màn hình có tên là "AddSchedule"
    navigation.navigate('Crops');
    // console.log("mmmm")
  };

  return (
    <View style={{
        flexDirection: 'row', justifyContent: 'space-between',  paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#FFFFFF'
    }}>
      <TouchableOpacity onPress={goToScreen1}>
      <View style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image
         style={{height: 20, width: 18}}
        source={require('../assets/icons/cay-trong.png')}
      />
      <Text>Cây trồng</Text>
      </View>
      </TouchableOpacity>
      <View style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image
         style={{height: 20, width: 20}}
         source={require('../assets/icons/lich.png')}
      />
      <Text>Lịch trình</Text>
      </View>
      <View style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image
         style={{height: 16, width: 25}}
        source={require('../assets/icons/chup.png')}
      />
      <Text>Chụp cây</Text>
      </View>
      <TouchableOpacity onPress={goToScreen}>
      <View style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image
         style={{height: 20, width: 18}}
        source={require('../assets/icons/cham-soc.png')}
      />
      <Text>Chăm sóc</Text>
      </View>
      </TouchableOpacity>
     
      <View style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image
         style={{height: 20, width: 20}}
        source={require('../assets/icons/user.png')}
      />
      <Text>Tài khoản</Text>
      </View>
    </View>
  )
}
