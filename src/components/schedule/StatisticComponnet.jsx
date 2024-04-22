import React, { useEffect } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { API_URL } from '../../constants/commonConstant';
import moment from 'moment';
import { Alert } from 'react-native';



export default function StatisticComponnet({ plant,beginTime,endTime, showModalDay, setCheckBeginTime }) {
  const navigation = useNavigation();
  const [drawChart, setDrawChart] = React.useState(null);
  const [columnTime, setColumnTime] = React.useState([""]);
  const [plantHeight, setPlantHeight] = React.useState([1]);
  const [plantQuantityFlower, setPlantQuantityFlower] = React.useState([1]);
  const goToScreen = () => {
    navigation.navigate('SelectTree');
    console.log("mmmm")
  };

  const convertUnixToDate = (unixTime) => {
    return moment(unixTime).format('DD-MM-YYYY');
  };

  useEffect(() => {
    callToApiDrawChart();
  }, []);

  const callToApiDrawChart = () => {
    console.log("fdsdfffdfdffds")
    fetch(`${API_URL.PlantApp}/plant/draw-chart/${plant.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "numColumn": 8,
        "beginTime": beginTime == null ? 1711109469000 : beginTime,
        "endTime": endTime == null ? 1713787869000 : endTime,
        "searchRequest": {
          "filters": [
            {
              "name": "createdAt",
              "value": beginTime == null ? 1711109469000 : beginTime,
              "operation": "gt"
            },
            {
              "name": "createdAt",
              "value": endTime == null ? 1713787869000 : endTime,
              "operation": "lt"
            }
          ],
          "pageable": {
            "page": 1,
            "pageSize": 500,
            "sort": [
              {
                "property": "createdAt",
                "direction": "desc"
              }
            ]
          }
        }
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lấy thông tin biểu đồ thất bại hãy thử lại');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          console.log(data);
          if (data.errorCode === '00') {
            const value = JSON.parse(data.data);
            setDrawChart(value);
            convertDataDrawchart(value);
          } else if (data.errorMessage) {
            Alert.alert('Thông báo', data.errorMessage);
          } else {
            Alert.alert('Thông báo', 'Lấy thông tin biểu đồ thất bại hãy thử lại');
          }
        } else {
          Alert.alert('Thông báo', 'Không có dữ liệu trả về');
        }
      })
      .catch(error => {
        Alert.alert('Thông báo', error.message);
      });
  };
 const convertDataDrawchart = (value) => {
  if (value != null) {
    let labels = [];
    let data1 = [];
    let data2 = [];
    console.log(value.length)
    for (let i = 0; i < value.length; i++) {
      labels.push(convertUnixToDate(value[i].time));
      data1.push(value[i].height);
      data2.push(value[i].quantityFlower);  
    }
    setColumnTime(labels);
    setPlantHeight(data1);
    setPlantQuantityFlower(data2);
    console.log(labels);
  }
  
  }
  const data = {
    labels:  columnTime,
    datasets: [
      {
        data: plantHeight,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 4
      },
      {
        data: plantQuantityFlower,
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
      height: 500,
      display: 'flex',
      alignItems: 'center',
    }}>
      <Text style={{
        fontSize: 24,
        paddingTop: 20,
        paddingBottom: 20,
      }}>
        Thống kê tiến độ
      </Text>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 30
      }}>
        <View>
          <Text style={{
            fontSize: 20
          }}> {plant.name}</Text>
        </View> 
        <View>
          <TouchableOpacity onPress={() => {
            setCheckBeginTime(true);
            showModalDay();
          }}>
            <View style={{
              flexDirection: 'row',
            }}>

              <Text style={{ color: '#ccc', paddingLeft: 10 }}>{beginTime == null ? "Chọn ngày bắt đầu" : convertUnixToDate(beginTime)} </Text>
              <Image
                style={{ height: 20, width: 25 }}
                source={require('../../assets/icons/show.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setCheckBeginTime(false);
            showModalDay();
          }}>
            <View style={{
              flexDirection: 'row',
            }}>

              <Text style={{ color: '#ccc', paddingLeft: 10 }}>{endTime == null ? "Chọn ngày kết thúc" : convertUnixToDate(endTime)}</Text>
              <Image
                style={{ height: 20, width: 25 }}
                source={require('../../assets/icons/show.png')}
              />
            </View>
          </TouchableOpacity>
          <View>
        <TouchableOpacity style={{
            paddingHorizontal: 10,
            paddingVertical:10,
            borderRadius: 5,
            backgroundColor: '#18B65B'
        }}
        onPress={callToApiDrawChart}>
            <Text style={{color:'white',}}>Search</Text>
        </TouchableOpacity> 
    

    </View>
        </View>
      </View>
      <LineChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
      />
      <View style={{
        width: '60%'
      }}>
        <Text style={{ textAlign: 'center' }}>
          Đồ thị biểu diễn độ phát triển của {plant.name} theo thời gian
        </Text>
      </View>


    </View>
  )
}

