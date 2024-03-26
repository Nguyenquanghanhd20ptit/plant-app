import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, TextInput, Button } from 'react-native'
import Menu from '../../components/Menu'
import HeaderGuide from '../../components/HeaderGuide'
import DropdownChoose from './DropDownChoose';
import GuideTakeCare from './GuideTakeCare';

export default function MainGuide() {
  return (
    <View style={styleMain.mainGuide}>
      <HeaderGuide></HeaderGuide>
      <CareGuide />
      <SearchBar />
      <View style={styleMain.mainGuide_Menu}>
        <Menu />
      </View>
    </View>
  )
}
const CareGuide = () => {
  return (
    <View style={styleMain.careGuide}>
      <View style={styleMain.careGuideHeader}>
        <Text style={styleMain.careGuideTitle}>Hướng dẫn chăm sóc</Text>
      </View>
      <DropdownChoose />
      <GuideTakeCare />
    </View>
  );
};

const SearchBar = () => {
  return (
    <View style={styleMain.searchContain}>
      <TouchableOpacity
        onPress={() => console.log('Tìm kiếm...')}
        style={styleMain.searchBar}
      >
        <Text style={styleMain.searchTitle}>Tìm Kiếm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styleMain = StyleSheet.create({
  mainGuide: {
    backgroundColor: '#E7EBF7',
    height: '100%'
  },
  mainGuide_Menu: {
    // paddingTop: 30,
    flex: 1,
    justifyContent: 'flex-end',
  },
  careGuide: {
    marginTop: 23,
    width: '100%',
    height: '57.5%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: '#f5f5f5',
    borderWidth: 2,
    backgroundColor: '#f6f6f6',
  },
  careGuideHeader: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  careGuideTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 6
  },
  careGuideContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  plantImage: {
    width: 50,
    height: 50,
  },
  plantName: {
    fontSize: 16,
    marginLeft: 10,
  },
  careGuideText: {
    fontSize: 14,
    marginLeft: 10,
  },
  searchContain: {
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchBar: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '70%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  searchTitle: {
    fontSize: 17,
    color: '#f5f5f5',
    justifyContent: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
  },
  tabItem: {
    padding: 10,
    alignItems: 'center',
  },
});

