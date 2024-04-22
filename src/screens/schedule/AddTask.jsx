import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Modal } from 'react-native-paper'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import TaskComponent from '../../components/schedule/TaskComponent'


export default function AddTask() {
  const [valueState, setValueState] = React.useState('');
  const [check, setCheck] = React.useState(0);
  const route = useRoute();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, marginHorizontal: 20, borderRadius: 10 };
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedHorse, setSelectedHorse] = useState('9 giờ 00');
  const [selectedDay, setSelectedDay] = useState('18/3/2024');
  const [reminder, setReminder] = useState({
    work: "Tưới nước",
    frequency: 1,
    specificDate: null,
    hour: 32400000,
    timeStart: 1713688082000,
    note: null,
  });

  const [plant,setPlant] = useState(null);

  console.log(route.params)
  useEffect(() => {
    if (route.params !== undefined && route.params.reminder !== undefined) {
      setReminder(route.params.reminder);
    }
    if (route.params !== undefined && route.params.plant !== undefined) {
      setPlant(route.params.plant);
    }
  }, [route.params]);

  console.log(reminder);
  const data = [];
  for (let i = 0; i <= 24; i++) {
    data.push({ id: `${i}`, text: `${i} giờ` });
  }
  const data1 = [];
  for (let i = 0; i <= 59; i++) {
    data1.push({ id: `${i}`, text: `${i} phút` });
  }


  const renderItem = ({ item }) => {
    const itemStyle = selectedItem === item.id ? styles.selectedItem : styles.item;

    return (
      <TouchableOpacity onPress={() => setSelectedItem(item.id)}>
        <View style={itemStyle}>
          <Text style={{
            color: selectedItem === item.id ? 'black' : 'gray'
          }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem1 = ({ item }) => {
    const itemStyle = selectedItem1 === item.id ? styles.selectedItem : styles.item;

    return (
      <TouchableOpacity onPress={() => setSelectedItem1(item.id)} style={{

      }}>
        <View style={itemStyle}>
          <Text style={{
            color: selectedItem1 === item.id ? 'black' : 'gray'
          }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };



  const [visibleDay, setVisibleDay] = React.useState(false);
  const showModalDay = () => setVisibleDay(true);
  const hideModalDay = () => setVisibleDay(false);
  const containerStyleDay = { backgroundColor: 'white', padding: 20, marginHorizontal: 20, borderRadius: 10 };
  const [selectedItemDay1, setSelectedItemDay1] = useState(null);
  const [selectedItemDay2, setSelectedItemDay2] = useState(null);
  const [selectedItemDay3, setSelectedItemDay3] = useState(null);
  const dataDay1 = [];
  for (let i = 1; i <= 30; i++) {
    dataDay1.push({ id: `${i}`, text: `${i}` });
  }
  const dataDay2 = [];
  for (let i = 1; i <= 12; i++) {
    dataDay2.push({ id: `${i}`, text: `tháng ${i}` });
  }
  const dataDay3 = [];
  for (let i = 2022; i <= 2028; i++) {
    dataDay3.push({ id: `${i}`, text: `${i}` });
  }


  const renderItemDay1 = ({ item }) => {
    const itemStyle = selectedItemDay1 === item.id ? styles.selectedItem : styles.item;

    return (
      <TouchableOpacity onPress={() => setSelectedItemDay1(item.id)}>
        <View style={itemStyle}>
          <Text style={{
            color: selectedItemDay1 === item.id ? 'black' : 'gray'
          }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemDay2 = ({ item }) => {
    const itemStyle = selectedItemDay2 === item.id ? styles.selectedItem : styles.item;

    return (
      <TouchableOpacity onPress={() => setSelectedItemDay2(item.id)} style={{

      }}>
        <View style={itemStyle}>
          <Text style={{
            color: selectedItemDay2 === item.id ? 'black' : 'gray'
          }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemDay3 = ({ item }) => {
    const itemStyle = selectedItemDay3 === item.id ? styles.selectedItem : styles.item;

    return (
      <TouchableOpacity onPress={() => setSelectedItemDay3(item.id)} style={{

      }}>
        <View style={itemStyle}>
          <Text style={{
            color: selectedItemDay3 === item.id ? 'black' : 'gray'
          }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const [visibleNote, setVisibleNote] = React.useState(false);
  const showModalNote = () => setVisibleNote(true);
  const hideModalNote = () => setVisibleNote(false);

  const handleConfirmHorse = () => {
    const dateObject = new Date();
    dateObject.setHours(+selectedItem);
    dateObject.setMinutes(+selectedItem1);
    setReminder({ ...reminder, hour: dateObject.getTime() });
    hideModal();
  };

  const handleConfirmDay = () => {
    let dateObject = new Date(+selectedItemDay3, +selectedItemDay2 - 1, +selectedItemDay1);
    console.log(selectedItemDay1 + "/" + selectedItemDay2 + "/" + selectedItemDay3)
    console.log(dateObject.getTime())
    setReminder({ ...reminder, timeStart: dateObject.getTime() });
    hideModalDay();
  };
  return (
    <View style={{
      backgroundColor: '#E7EBF7',
      height: '100%'
    }}>
      <Header></Header>
      <View style={{
        top: 100
      }}>

        <TaskComponent
          reminder={reminder}
          setReminder={setReminder}
          plant={plant}
          setValueState={setValueState}
          showModal={showModal}
          showModalDay={showModalDay}
          showModalNote={showModalNote}
        ></TaskComponent>

      </View>
      <View
        style={{
          paddingTop: 30,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Menu />
      </View>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200
        }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <FlatList
            data={data1}
            renderItem={renderItem1}
            keyExtractor={(item) => item.id}
          />
          {/* <View style={{
                paddingHorizontal: 10
            }}>
                <Text>aaa</Text>
            </View>
            <View>
                <Text>aaa</Text>
            </View> */}
          {/* <RNDatePicker date={date} onDateChange={setDate}></RNDatePicker> */}
        </View>
        <TouchableOpacity
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}
          onPress={() => { hideModal() }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            backgroundColor: '#18B65B',
            paddingHorizontal: 15,
            borderRadius: 20,
          }}>
            <TouchableOpacity onPress={handleConfirmHorse}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={visibleDay}
        onDismiss={hideModalDay}
        contentContainerStyle={containerStyle}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200
        }}>
          <FlatList
            data={dataDay1}
            renderItem={renderItemDay1}
            keyExtractor={(item) => item.id}
          />
          <FlatList
            data={dataDay2}
            renderItem={renderItemDay2}
            keyExtractor={(item) => item.id}
          />
          <FlatList
            data={dataDay3}
            renderItem={renderItemDay3}
            keyExtractor={(item) => item.id}
          />
          {/* <View style={{
                paddingHorizontal: 10
            }}>
                <Text>aaa</Text>
            </View>
            <View>
                <Text>aaa</Text>
            </View> */}
          {/* <RNDatePicker date={date} onDateChange={setDate}></RNDatePicker> */}
        </View>
        <TouchableOpacity
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}
          onPress={() => { hideModalDay() }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            backgroundColor: '#18B65B',
            paddingHorizontal: 15,
            borderRadius: 20,
          }}>
            <TouchableOpacity onPress={handleConfirmDay}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={visibleNote}
        onDismiss={hideModalNote}
        contentContainerStyle={containerStyle}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

        }}>

          <TextInput
            multiline
            numberOfLines={4} // Số dòng tối đa trước khi xuống dòng
            style={{ height: '90%', width: '80%', padding: 10 }}
            placeholder="Type here to translate!"
            onChangeText={newText => setReminder({ ...reminder, note: newText })}
            defaultValue={reminder.note}
          />

          {/* <Text style={{padding: 10, fontSize: 42}}>
            {text
              .split(' ')
              .map(word => word && '🍕')
              .join(' ')}
          </Text> */}
        </View>
        <TouchableOpacity
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}
          onPress={() => { hideModalNote() }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            backgroundColor: '#18B65B',
            paddingHorizontal: 15,
            borderRadius: 20,
          }}>
            <Text style={{ color: 'white' }}>Confirm</Text>
          </View>
        </TouchableOpacity>
      </Modal>


    </View>
  )
}


const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center'
  },
  selectedItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: 'lightgray',
    display: 'flex',
    alignItems: 'center'
  },
});