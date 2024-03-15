import React from 'react'
import { Image, Text, View } from 'react-native'

export default function Menu({navigation}) {
  return (
    <View style={{
        flexDirection: 'row', justifyContent: 'space-between',  paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#FFFFFF'
    }}>
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