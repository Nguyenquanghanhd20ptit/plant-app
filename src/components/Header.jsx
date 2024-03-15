import React from 'react'
import { Image, Text, View } from 'react-native'

export default function Header() {
  return (
    <View style={{
        flexDirection: 'row', justifyContent: 'space-between',  paddingTop: 60, paddingHorizontal: 40
    }}>
      <View style={{ flexDirection: 'row'}}>
      <View>
      <Image
        style={{height: 35, width: 40}}
        source={require('../assets/icons/logo.png')}
      />
      </View>
      <View style={{paddingHorizontal: 10}}>
      <Text style={{color: '#2ECC71', fontSize: 24, fontWeight: 'bold'}}>Plant</Text>
      </View>
      </View>
      {/* <View>
      </View> */}
      <View>
      <Image
        style={{height: 40, width: 40}}
        source={require('../assets/icons/noti.png')}
      />
      </View>
    </View>
  )
}
