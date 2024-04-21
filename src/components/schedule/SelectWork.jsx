import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';



export default function SelectWork({reminder,setReminder, goToScreen1}) {
    const navigation = useNavigation();
  const goToScreen = () => {
    navigation.navigate('SelectTree');
    console.log("mmmm")
  };

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
          paddingBottom: 10,
      }}>
          Tạo lịch trình
      </Text>

      <View>
        
        <View style={{
          marginVertical:  10,
           backgroundColor: '#F6F6F8',
           paddingHorizontal: 20,
          height: 280,
          width: 300,
          borderRadius: 10,
          display: 'flex',
        //   justifyContent:'center',
          paddingVertical: 20,
        }}>
          <Text style={{
            fontSize: 18,
            paddingBottom: 20
          }}>Chọn công việc</Text>
          <View>
            <TouchableOpacity 
             style={{
                backgroundColor: reminder.work === 'Tưới nước' ? '#ccc' : 'transparent',
                paddingHorizontal: 10,
            }}
            onPress={() => {
              setReminder({ ...reminder, work: 'Tưới nước' });
            }}>            
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 20,
                }}>
                <View style={{
                    flexDirection:'row',
                }}>
                <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/icons/cv.png')}
                />
                <Text style={{ paddingLeft: 10}}>Tưới nước</Text>
                </View>
                
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
             style={{
                backgroundColor: reminder.work === 'Bón phân' ? '#ccc' : 'transparent',
                paddingHorizontal: 10,
            }}
            onPress={() => {
              setReminder(prevReminder => ({
                ...prevReminder,
                work: 'Bón phân' 
              }));
            }}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 20,
                }}>
                <View style={{
                    flexDirection:'row',
                }}>
                <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/icons/cv.png')}
                />
                <Text style={{ paddingLeft: 10}}>Bón phân</Text>
                </View>
                
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
            style={{
                backgroundColor: reminder.work === 'Kiểm tra sâu bệnh' ? '#ccc' : 'transparent',
                paddingHorizontal: 10,
            }}  onPress={()=> setReminder({ ...reminder, work: 'Kiểm tra sâu bệnh' })}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1, 
                    borderTopColor: '#ccc', 
                    borderTopStyle: 'solid',
                    paddingVertical: 20,
                }}>
                <View style={{
                    flexDirection:'row',
                }}>
                <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/icons/cv.png')}
                />
                <Text style={{ paddingLeft: 10}}>Kiểm tra sâu bệnh</Text>
                </View>
                
                </View>
            </TouchableOpacity>
            </View>
            </View>
            <TouchableOpacity 
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                marginTop: 20
            }}
            onPress={()=>{ goToScreen1()}}>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    backgroundColor: '#18B65B',
                    paddingHorizontal: 15,
                    borderRadius: 20,
                }}>     
                <Text style={{color: 'white'}}>Confirm</Text>
                </View>
            </TouchableOpacity>
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