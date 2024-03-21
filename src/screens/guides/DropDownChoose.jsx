import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Hoa hồng", value: "1" },
  { label: "Hoa cúc", value: "2" },
  { label: "Hoa mặt trời", value: "3" },
  { label: "Cây rau ngót", value: "4" },
  { label: "Cây cảnh Pháp", value: "5" },
  { label: "Rau muống", value: "6" },
];
const dataOption = [
  { label: "Theo mùa vụ", value: "1" },
  { label: "Theo điều kiện thời tiết", value: "2" },
  { label: "Theo tình trạng cây", value: "3" },
];

export default function DropdownChoose() {
  return (
    <View>
      <DropdownTree />
      <DropdownOption />
    </View>
  );
}


const DropdownTree = () => {
  const [value, setValue] = useState(null);
  return (
    <View style={styles.DropTree}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Chọn cây"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <Image
            style={styles.icon}
            source={require("D:/Code/Projects/Web_TakeCare_Tree/plant-app/src/assets/iconGuide/plant-pot.png")}
          />
          // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
    </View>
  );
};

const DropdownOption = () => {
  const [value, setValue] = useState(null);
  return (
    <View style={styles.DropTree}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataOption}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Chăm sóc cây theo"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <Image
            style={styles.icon}
            source={require("D:/Code/Projects/Web_TakeCare_Tree/plant-app/src/assets/iconGuide/weather-forecast.png")}
          />
          // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  DropTree: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 5,
  },
  dropdown: {
    width: "80%",
    justifyContent: "space-around",
    margin: 6,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginLeft: 10,
    height: 22,
    width: 22,
    marginRight: 13,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    borderBottomLeftRadius: 50,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
