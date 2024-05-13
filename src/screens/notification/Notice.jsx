import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { ScrollView } from 'react-native';

const Notice = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [schedulers, setSchedulers] = useState([]);

  // if(user == null)
  //  AsyncStorage.getItem(LOCALSTORATE_CONSTANT.MyInfo)
  //   .then((userData) => {
  //     if (userData) {
  //       setUser(JSON.parse(userData));
  //       setCheck(true);
  //       console.log(user);
  //     } else {
  //       console.log('Không có dữ liệu người dùng trong AsyncStorage');
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Lỗi khi lấy dữ liệu người dùng từ AsyncStorage:', error);
  //   });

  //   useEffect(() => {
  //     if(check == true){
  //       callToApiGetAllScheduler();
  //       console.log("fđfsdfdfdffdfd");
  //       setReloadWhenDelete(false);
  //     }

  //   }, [check,isFocused, reloadWhenDelete == true]);
  // if (user == null)
  //   AsyncStorage.getItem(LOCALSTORATE_CONSTANT.MyInfo)
  //     .then((userData) => {
  //       if (userData) {
  //         setUser(JSON.parse(userData));
  //         setCheck(true);
  //         console.log(user);
  //       } else {
  //         console.log('Không có dữ liệu người dùng trong AsyncStorage');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Lỗi khi lấy dữ liệu người dùng từ AsyncStorage:', error);
  //     });

  // useEffect(() => {
  //   if (check == true) {
  //     callToApiGetAllScheduler();
  //     console.log("fđfsdfdfdffdfd");
  //     setReloadWhenDelete(false);
  //   }
  // }, [check, isFocused, reloadWhenDelete == true]);

  const callToApiGetAllScheduler = () => {
    console.log('bắt đầu vào hàm call api');
    fetch(`https://7603-123-16-132-154.ngrok-free.app/plant-app/scheduler/all/?userId=1`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lấy thông tin lịch trình thất bại hãy thử lại');
        }
        console.log('bắt đầu vào hàm call api 1');
        return response.json();
      })
      .then(data => {
        if (data) {
          if (data.errorCode === '00') {
            const value = JSON.parse(data.data);
            console.log('bắt đầu vào hàm call api 2' + value);
            setSchedulers(value);

            value.forEach(element => {
              element.reminders.forEach(element1 => {
                console.log("log hour: " + element1.hour)
              })
            });
            // setNotifications(value.reminders);
          } else if (data.errorMessage) {
            Alert.alert('Thông báo', data.errorMessage);
          } else {
            Alert.alert('Thông báo', 'Lấy thông tin lịch trình thất bại hãy thử lại');
          }
        } else {
          Alert.alert('Thông báo', 'Không có dữ liệu trả về');
        }
      })
      .catch(error => {
        Alert.alert('Thông báo', error.message);
      });
  };
  //Call lấy dữ liệu từ DB rồi set vào scheduler
  useEffect(() => { callToApiGetAllScheduler(); }, []); // empty array as dependency to run only once

  const getTodaysNotifications = () => {
    const today = new Date();
    return notifications.filter((notification) => notification.date <= today);
  };

  const getPreviousNotifications = () => {
    const today = new Date();
    return notifications.filter((notification) => notification.date < today && !notification.read);
  };

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification, status: 'read' };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  const renderItem = ({ item }) => {

    function stringToMinutes(timeString) {
      // Tách các thành phần từ chuỗi
      const parts = timeString.split(' ');

      // Tách ngày, tháng, năm từ phần đầu tiên
      const dateParts = parts[0].split('-');
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1; // Trừ 1 vì tháng bắt đầu từ 0
      const year = parseInt(dateParts[2]);

      // Tách giờ và phút từ phần thứ hai
      const timeParts = parts[1].split(':');
      const hour = parseInt(timeParts[0]);
      const minute = parseInt(timeParts[1]);

      // Tạo đối tượng Date
      const dateTime = new Date(year, month, day, hour, minute);

      // Chuyển đổi thành số phút kể từ nửa đêm
      const midnight = new Date(year, month, day, 0, 0);
      const minutesSinceMidnight = Math.floor((dateTime - midnight) / (1000 * 60));

      return minutesSinceMidnight;
    }

    console.log(`bắt đầu render`)
    var noticeString;
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = "00:00";
    var dateTime = date + ' ' + time;
    var thoigian = stringToMinutes(dateTime);

    item.reminders.forEach(element1 => {
      // console.log("thời gian thực nè" + thoigian + typeof (thoigian));
      // console.log("thời gian cần để chăm sóc cây" + stringToMinutes(element1.hour));
      console.log(element1.hour);
      var check = new Date(element1.hour) <= thoigian;

      console.log(check);
      // if (check) {
      noticeString = item.plant.name + element1.work + element1.hour;
      console.log(`In ra cái thông báo nè` + noticeString)
      // }
    })
    return (
      <View style={styles.notification}>
        <Text style={styles.content}>{noticeString}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity >
            <Image
              style={styles.tick}
              source={require("../../assets/icons/tick.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image
              style={styles.delete}
              source={require("../../assets/icons/delete1.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // //Render Notify pre
  // const renderItemPre = ({ item }) => {

  //   function stringToMinutes(timeString) {
  //     // Tách các thành phần từ chuỗi
  //     const parts = timeString.split(' ');

  //     // Tách ngày, tháng, năm từ phần đầu tiên
  //     const dateParts = parts[0].split('-');
  //     const day = parseInt(dateParts[0]);
  //     const month = parseInt(dateParts[1]) - 1; // Trừ 1 vì tháng bắt đầu từ 0
  //     const year = parseInt(dateParts[2]);

  //     // Tách giờ và phút từ phần thứ hai
  //     const timeParts = parts[1].split(':');
  //     const hour = parseInt(timeParts[0]);
  //     const minute = parseInt(timeParts[1]);

  //     // Tạo đối tượng Date
  //     const dateTime = new Date(year, month, day, hour, minute);

  //     // Chuyển đổi thành số phút kể từ nửa đêm
  //     const midnight = new Date(year, month, day, 0, 0);
  //     const minutesSinceMidnight = Math.floor((dateTime - midnight) / (1000 * 60));

  //     return minutesSinceMidnight;
  //   }
  //   //render Những thông báo trước đó
  //   console.log(`bắt đầu render trước đó`)
  //   var noticeString;
  //   var today = new Date();
  //   var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  //   var time = today.getHours() + ":" + today.getMinutes();
  //   var dateTime = date + ' ' + time;
  //   var thoigian = stringToMinutes(dateTime);

  //   item.reminders.forEach(element1 => {
  //     console.log("thời gian thực nè" + thoigian + typeof (thoigian));
  //     console.log("thời gian cần để chăm sóc cây" + stringToMinutes(element1.hour));

  //     var check = new Date(element1.hour) <= thoigian;

  //     console.log(check);
  //     if (check) {
  //       noticeString = item.plant.name + element1.work + element1.hour;
  //       console.log(`In ra cái thông báo nè` + noticeString)
  //     }
  //   })
  //   return (
  //     <View style={styles.notification}>
  //       <Text style={styles.content}>{noticeString}</Text>
  //       <View style={styles.buttons}>
  //         <TouchableOpacity >
  //           <Image
  //             style={styles.tick}
  //             source={require("../../assets/icons/tick.png")}
  //           />
  //         </TouchableOpacity>
  //         <TouchableOpacity >
  //           <Image
  //             style={styles.delete}
  //             source={require("../../assets/icons/delete1.png")}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <>
      <View style={styles.header1}>
        <Header />
      </View>
      <View style={styles.container}>
        <Text style={styles.textNotice}>Thông báo</Text>
        <View style={styles.today}>
          <Text style={styles.textToday}>Hôm nay</Text>
          <ScrollView>
            <FlatList
              data={schedulers}
              renderItem={renderItem}
              keyExtractor={({ id }, index) => id}
            />
          </ScrollView>
        </View>
        <View style={styles.previous}>
          <Text style={styles.textPre}>Trước đó</Text>
          <ScrollView>
            <FlatList
              data={schedulers}
              renderItem={renderItem}
              keyExtractor={({ id }, index) => id}
            />
          </ScrollView>
        </View>

      </View>
      <View style={styles.footer1}>
        <Menu />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textNotice: {
    fontSize: 20,
    fontWeight: "bold"
  },

  container: {
    paddingHorizontal: 30,
    height: 610,
    padding: 10,
    backgroundColor: "#FADFDF",
    borderRadius: 30,
  },

  today: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    flex: 0.5,
  },

  textToday: {
    fontWeight: "bold",
    marginBottom: 5,
    textDecorationLine: "underline",
  },

  previous: {
  },

  textPre: {
    fontWeight: "bold",
    marginBottom: 5,
    textDecorationLine: "underline"
  },

  notification: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  markAsRead: {
    marginRight: 10,
    color: 'blue',
  },
  delete: {
    width: 26,
    height: 20,
    marginLeft: 10
  },
  footer1: {
    position: "fixed",
    left: 0,
    bottom: 0,
  }
});

export default Notice;
