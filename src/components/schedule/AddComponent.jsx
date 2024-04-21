import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const flowerTrees = [
  {
    id: 1,
    tasks: [
      { id: 1,date: 'Hàng ngày', name: 'Tưới nước',session:'Buổi sáng', time: '7:00 AM' },
      { id: 2, date: 'Hàng ngày', name: 'Bón phân', session:'Buổi sáng', time: '9:00 AM' },
    ]
  },
  {
    id: 2,
    tasks: [
      { id: 1, date: 'Hàng ngày', name: 'Tưới nước', session:'Buổi sáng', time: '8:00 AM' },
      { id: 2, date: 'Hàng ngày', name: 'Bón phân', session:'Buổi sáng', time: '10:00 AM' },
    ]
  },
  // Thêm các cây hoa khác nếu cần
];

export default function AddComponent({plant}) {
  const navigation = useNavigation();
  const goToScreen = () => {
    // Chuyển đến màn hình có tên là "AddSchedule"
    navigation.navigate('SelectTree');
    console.log("mmmm")
  };
let v=''
  const goToScreen1 = () => {
    // Chuyển đến màn hình có tên là "AddSchedule"
    navigation.navigate('AddTask');
    console.log("mmmm")
  };


  
  const renderItem = ({ item }) => (
    <View style={styles.treeContainer}>
      <FlatList
        data={item.tasks}
        renderItem={({ item }) => (
          <View style={{
            flexDirection:'row'
          }}>
            <View style={{
              // display:'flex',
              // justifyContent:'center',
              // alignItems:'center'
              paddingTop: 5,
              paddingRight: 5
            }}>
            <Image
              style={{height: 20, width: 16}}
              source={require('../../assets/icons/notigreen.png')}
            />
            </View>
            <View>
            <View>
            <View>
            <Text  style={{fontSize: 16}} >{item.name}</Text>
            </View>
            <View style={styles.taskContainer}>
            <Text style={{fontSize: 10, color: '#434343'}}>{item.date}</Text>
            <Text style={{fontSize: 10, color: '#434343'}}>{item.session}</Text>
            <Text style={{fontSize: 10, color: '#434343'}}>{item.time}</Text>
            <Image
              style={{height: 12, width: 16}}
              source={require('../../assets/icons/delete1.png')}
            />
            </View>
          </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
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
          paddingVertical: 20
      }}>
          Thêm lịch trình
      </Text>
      <View>
        <View style={{
           backgroundColor: '#F6F6F8',
           paddingHorizontal: 20,
          height: 50,
          width: 300,
          borderRadius: 10,
          display: 'flex',
          justifyContent:'center'
        }}>
        <TouchableOpacity  onPress={goToScreen}>
        <View style={{
          flexDirection: 'row',
          }}>
             <Image
              style={{height: 18, width: 16}}
              source={require('../../assets/icons/treegray.png')}
            />
            {
              plant===''?(
                <Text style={{color: '#717086', paddingLeft: 10}}>Chọn cây</Text>
              ):
              (
                <Text style={{color: 'black', paddingLeft: 10}}>{plant.name}</Text>
              )
            }
            
        </View>
        </TouchableOpacity>
        </View>
        <View style={{
          marginVertical: 20,
           backgroundColor: '#F6F6F8',
           paddingHorizontal: 20,
          height: 220,
          width: 300,
          borderRadius: 10,
          display: 'flex',
          justifyContent:'center',
          paddingVertical: 20,
        }}>
          <Text style={{
            fontSize: 18,
            paddingBottom: 20
          }}>Nhắc nhở</Text>
          <View style={styles.container}>
          
      <FlatList
      
        data={flowerTrees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
    <TouchableOpacity onPress={goToScreen1}>
    <View style={{flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10}}>
     <Image
              style={{height: 18, width: 16}}
              source={require('../../assets/icons/add.png')}
            />
      <Text>
        Thêm mới
      </Text>
    </View>
    </TouchableOpacity>
        </View>
      </View>
      <View style={{
          // paddingTop: 30,
          flex: 1,
          justifyContent: 'flex-end',
        }} >
        <TouchableHighlight 
          style={{
            backgroundColor: '#18B65B',
            paddingVertical: 15,
            paddingHorizontal: 140,
            borderRadius: 10,
            marginBottom: 10,
          }}
         >
          <View>
          <Text style={{
            color: 'white'
          }}>
            Lưu
          </Text>
          </View>
        </TouchableHighlight>

      </View>
  </View>
  )
}



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 20,
    // backgroundColor: '#fff',
    // width: '85%',
    height: '65%'

  },
  treeContainer: {
    // backgroundColor:'#F6F6F8',
    // paddingHorizontal: 20,
    // paddingVertical: 20,
    // borderRadius: 10,
    // marginBottom: 20,
  },
  treeName: {
    fontSize: 20,
    color: '#18B65B',
    // fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 5,
    paddingVertical: 5,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    width: '95%'
  },
});