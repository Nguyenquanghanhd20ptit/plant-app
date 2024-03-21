import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
export default function HeaderGuide() {
  return (
    <View>
      <Header />
      <CurrentWeather />
      <Location />
    </View>
    
  )
}
const Header = () => {
    return (
      <View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between',  paddingTop: 60, paddingHorizontal: 40
        }}>
          <View style={{ flexDirection: 'row', marginTop: 10}}>
            
            <View>
              <Image
                  style={{height: 32, width: 32}}
                  source={require('../assets/iconGuide/sun.png')}
              />
            </View>
            <View style={{paddingHorizontal: 10}}>
                <Text style={styles.headerText}>Thời tiết</Text>
            </View>
          </View>
          
        <View style={{paddingHorizontal: 10, marginTop: 10}}>
          <Image
              style={styles.headerNotify}
              source={require('../assets/icons/noti.png')}
          />
        </View>
        </View>
    </View>
    );
};

const CurrentWeather = () => {
  return (
    <View style={styles.weather}>
      <View style={styles.currentWeather}>
        <View>
          <Text style={styles.temperature}>23</Text>
        </View>
        <View>
          <Image
            style={{height: 25, width: 25, marginTop: 21}}
            source={require('../assets/iconGuide/celsius.png')}
          />
        </View>
      </View>
      <View>
        <View style={styles.weatherDetails}>
          <Text style={styles.humidity}>Độ ẩm: 64%</Text>
          <Text style={styles.wind}>Sức gió: 14 km/h</Text>
          <Text style={styles.rainText}>Lượng mưa: 80%</Text>
        </View>
      </View>
    </View>
  );
};
const Location = () => {
  return (
    <View style={styles.locationContainer}>
      <View>
        <Image
              style={{height: 25, width: 25, marginLeft: 40, marginRight: 10}}
              source={require('../assets/iconGuide/location.png')}
        />
      </View>
      <View>
        <Text style={styles.location}>Thôn Đồng Hạ, Ha Ninh, Hà Nam</Text>
      </View>
      
    </View>
    
  );
};


const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    color: '#37A720', 
    fontSize: 24, 
    fontWeight: 'bold'
  },
  headerNotify: {
    height: 26, 
    width: 26, 
    position: 'absolute',   
    right: 5, 
    marginTop: 2
  },
  weather:{
    marginTop: 5,
    flexDirection: 'row', 
    marginLeft: 40
    // justifyContent: 'space-evenly',
  },
  time: {
    fontSize: 18,
  },
  menuIcon: {
    color: '#666',
  },
  currentWeather: {
    flexDirection: 'row',
  },
  temperature: {
    fontSize: 70,
    color: '#3373BA'
  },
  weatherDetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 20
  },
  humidity: {
    fontSize: 16,
  },
  wind: {
    fontSize: 16,
  },
  rain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rainText: {
    fontSize: 16,
  },
  location: {
    fontSize: 17,
    marginTop: 3,
    textAlign: 'center',
  },
});