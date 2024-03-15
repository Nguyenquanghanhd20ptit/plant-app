import { View, Text } from 'react-native'
import React, { useEffect } from 'react'


export default function Onboarding({navigation}) {
    useEffect(() => {
        const timer = setTimeout(() => {
          // Chuyển sang màn hình khác sau 2 giây
          navigation.replace('MainSchedule'); // Thay 'NextScreen' bằng tên màn hình tiếp theo
        }, 1000);
    
        return () => clearTimeout(timer); // Xóa timer nếu component unmounted
      }, [navigation]);
    return (
        <View>
            <Text>Onboarding</Text>
        </View>
    )
}