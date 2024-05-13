import React from 'react'
import { View, Text, StyleSheet, Image, Button, Pressable } from 'react-native'

import Header from '../../components/Header'
import Menu from '../../components/Menu'

export default function NotificationScreen() {
  return (
    <View style={styles.containerNotice}>
      <View style={styles.header1}>
        <Header></Header>
      </View>

      <View style={styles.body}>
        <Text style={styles.textNotice}>Thông báo</Text>
        <Text style={styles.textToday}>Hôm nay</Text>

        <View style={styles.listToday}>
          <View style={styles.item}>
            <Text style={styles.nameOfItem1}>Cây hồng:</Text>
            <Text style={styles.noticeOfItem1}>Cần tưới nước</Text>



            <Pressable
              onPress={() => console.log("Tuyen dap trai")}
              style={styles.press}
            >
              <Image
                style={styles.imageTick}
                source={require('../../assets/icons/tick.png')}
              />
            </Pressable>

            <Pressable
              onPress={() => console.log("Tuyen dap trai")}
              style={styles.press}
            >
              <Image
                style={styles.imageTick}
                source={require('../../assets/icons/delete1.png')}
              />
            </Pressable>

          </View>
        </View>

        <Text style={styles.beforeToday}>Trước đó</Text>

      </View>
      <View style={styles.footer1}>
        <Menu></Menu>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerNotice: {
    flex: 1,
  },

  header1: {
    flex: 1,
  },

  textNotice: {
    marginLeft: 21,
    fontSize: 30,
    fontWeight: '700',
  },

  body: {
    flex: 6,
    color: 'red',
    backgroundColor: '#FADFDF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },

  textToday: {
    marginTop: 10,
    marginLeft: 21,
    marginRight: 21,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
  },


  listToday: {
    marginTop: 10,
    marginLeft: 21,
    marginRight: 21
  },
  item: {
    flexDirection: 'row',
    height: 40,
    paddingVertical: 10,
    borderRadius: 7,
    alignItems: 'center',
    backgroundColor: '',
  },

  beforeToday: {
    marginTop: 10,
    marginLeft: 21,
    marginRight: 21,
    backgroundColor: '#FFFFFF',
    fontSize: 20,

  },

  imageTick: {
    marginLeft: 28,
  },

  footer1: {
    flex: 1,
  },
})