import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';



export default function StatisticComponnet({name, showModalDay}) {
    const navigation = useNavigation();
  const goToScreen = () => {
    navigation.navigate('SelectTree');
    console.log("mmmm")
  };
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [50, 60, 70, 80, 90, 100], // Dữ liệu thứ 2
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Màu của dòng thứ 2
        strokeWidth: 2
      }
    ]
  };
  
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };
  
  const screenWidth = Dimensions.get('window').width;

  

  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      height: 450,
      display: 'flex',
      alignItems: 'center',
  }}>
      <Text style={{
          fontSize:24,
          paddingTop: 20,
          paddingBottom: 20,
      }}>
          Thống kê tiến độ
      </Text>

      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 30
      }}>
        <View>
        <Text style={{
            fontSize: 20
        }}> {name}</Text>
        </View>
        <View>
        <TouchableOpacity onPress={showModalDay}>
        <View style={{
                    flexDirection:'row',
                }}>
               
                <Text style={{color:'#ccc', paddingLeft: 10}}>Chọn ngày bắt đầu</Text>
                <Image
                style={{height: 20, width: 25}}
                source={require('../../assets/icons/show.png')}
                />
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={showModalDay}>
        <View style={{
                    flexDirection:'row',
                }}>
               
                <Text style={{color:'#ccc', paddingLeft: 10}}>Chọn ngày kết thúc</Text>
                <Image
                style={{height: 20, width: 25}}
                source={require('../../assets/icons/show.png')}
                />
                </View>
        </TouchableOpacity>
        </View>
      </View>
      <LineChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
      />
     <View  style={{
        width: '60%'
     }}>
     <Text style={{ textAlign: 'center'}}>
        Đồ thị biểu diễn độ phát triển của {name} theo thời gian
     </Text>
     </View>

      
  </View>
  )
}

