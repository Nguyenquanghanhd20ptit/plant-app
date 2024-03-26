import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { ScrollView, Image } from 'react-native';

const Notice = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      content: 'Thông báo 1',
      status: 'unread',
      date: new Date('2023-11-14'),
    },
    {
      id: 2,
      content: 'Thông báo 2',
      status: 'unread',
      date: new Date('2023-11-14'),
    },
    {
      id: 3,
      content: 'Thông báo 3',
      status: 'read',
      date: new Date('2023-11-14'),
    },
    {
        id: 4,
        content: 'Thông báo 4',
        status: 'read',
        date: new Date('2023-11-14'),
      },
      {
        id: 5,
        content: 'Thông báo 5',
        status: 'read',
        date: new Date('2023-11-14'),
      },
      {
        id: 6,
        content: 'Thông báo 6',
        status: 'read',
        date: new Date('2023-11-14'),
      },
      {
        id: 7,
        content: 'Thông báo 7',
        status: 'read',
        date: new Date('2023-11-14'),
      },
      {
        id: 8,
        content: 'Thông báo 8',
        status: 'read',
        date: new Date('2024-03-25'),
      },
      {
        id: 9,
        content: 'Thông báo 9',
        status: 'read',
        date: new Date('2024-03-25'),
      },
      {
        id: 10,
        content: 'Thông báo 10',
        status: 'read',
        date: new Date('2024-03-25'),
      },
      {
        id: 11,
        content: 'Thông báo 11',
        status: 'read',
        date: new Date('2024-03-25'),
      },

  ]);

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
    return (
        <View style={styles.notification}>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => handleMarkAsRead(item.id)}>
                    {/* <Text style={styles.markAsRead}>Done</Text> */}
                    <Image
                      style={styles.tick}
                      source={require("../../assets/icons/tick.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
                    {/* <Text style={styles.delete}>Xoá</Text> */}
                    <Image
                      style={styles.delete}
                      source={require("../../assets/icons/delete1.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
  };

  return (
    <>
    <View style={styles.header1}>
        <Header></Header>
    </View>
    <View style={styles.container}>
        <Text style={styles.textNotice}>Thông báo</Text>
        <View style={styles.today}>
          <Text style={styles.textToday}>Hôm nay</Text>
            <ScrollView>
              <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} />
            </ScrollView>
        </View>
        <View style={styles.previous}>
          <Text style={styles.textPre}>Trước đó</Text> 
        </View>
          
    </View>
    <View style={styles.footer1}>
        <Menu></Menu>
    </View>      
    </>
  );
};

const styles = StyleSheet.create({
  textNotice:{
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

  today:{
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    flex: 0.5,
  },

  textToday:{
    fontWeight:"bold",
    marginBottom:5,
    textDecorationLine: "underline",
  },

  previous:{
  },

  textPre:{
    fontWeight:"bold",
    marginBottom:5,
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
    color: 'red',
    width: 26,
    height: 20,
    marginLeft: 10
  },
  footer1:{
    position: "fixed",
    left: 0,
    bottom: 0,
  }
});

export default Notice;
