import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ScrollView,
  Modal,
} from "react-native";
import Header from "../../components/Header";
import ScheduleComponent from "../../components/schedule/ScheduleComponent";
import Menu from "../../components/Menu";
import HeaderGuide from "../../components/HeaderGuide";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropdownChoose from "./DropDownChoose";
import { DropdownPicker } from "react-native-dropdown-picker";

export default function GuideTakeCare() {
  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };
  return (
    <View style={styles.main}>
      <View style={styles.main2}>
        <View style={styles.rowTitle}>
          <Text style={styles.title}>Chọn công việc</Text>
        </View>
        <ScrollView style={{ width: "92%" }}>
          <TuoiNuoc />
          <BonPhan />
          <CheckSauBenh />
        </ScrollView>
      </View>
    </View>
  );
}
const TuoiNuoc = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleView = () => setIsVisible(!isVisible);
  return (
    <View>
      <View style={styles.waterMain}>
        <Image
          style={styles.imageMain}
          source={require("../../assets/iconGuide/plant.png")}
        />
        <Text style={{ fontSize: 17 }}>Tưới nước</Text>
        <TouchableOpacity
          onPress={handleToggleView}
          style={styles.imageDownMain}
        >
          {isVisible ? (
            <Image
              style={styles.imageDownMain}
              source={require("../../assets/iconGuide/upload.png")}
            />
          ) : (
            <Image
              style={styles.imageDownMain}
              source={require("../../assets/iconGuide/down-arrow.png")}
            />
          )}
        </TouchableOpacity>
      </View>
      {isVisible && (
        <View style={styles.contentMain}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Thời gian: </Text>
            <Text style={styles.contentRowContent}>Buổi sáng</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Lưu lượng nước: </Text>
            <Text style={styles.contentRowContent}>300ml</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Phương pháp tưới: </Text>
            <Text style={styles.contentRowContent}>Phun sương</Text>
          </View>
          <View style={{ flexDirection: "row", width: "88%" }}>
            <Text style={styles.contentRowWarning}>Lưu ý: </Text>
            <Text style={styles.contentRowContent}>
              Tưới nước đều tay, không tưới quá ngập khỏi mặt đất
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const BonPhan = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleView = () => setIsVisible(!isVisible);
  return (
    <View>
      {/* Bon phan */}
      <View style={styles.waterMain}>
        <Image
          style={styles.imageMain}
          source={require("../../assets/iconGuide/npk.png")}
        />
        <Text style={{ fontSize: 17}}>Bón phân</Text>
        <TouchableOpacity
          onPress={handleToggleView}
          style={styles.imageDownMain}
        >
          {isVisible ? (
            <Image
              style={styles.imageDownMain}
              source={require("../../assets/iconGuide/upload.png")}
            />
          ) : (
            <Image
              style={styles.imageDownMain}
              source={require("../../assets/iconGuide/down-arrow.png")}
            />
          )}
        </TouchableOpacity>
      </View>
      {isVisible && (
        <View style={styles.contentMain}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Thời gian: </Text>
            <Text style={styles.contentRowContent}>Buổi trưa</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Loại phân: </Text>
            <Text style={styles.contentRowContent}>Hỗn hợp phân hạt NPK</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Lưu lượng phân: </Text>
            <Text style={styles.contentRowContent}>450grm</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Phương pháp bón: </Text>
            <Text style={styles.contentRowContent}>Bề mặt</Text>
          </View>
          <View style={{ flexDirection: "row", width: "88%" }}>
            <Text style={styles.contentRowWarning}>Lưu ý: </Text>
            <Text style={styles.contentRowContent}>
              San phẳng bề mặt chậu cũng như lên luống cao đều nhau và mặt luống
              bằng phẳng ,được nạo vét thấp hơn dõng trong chậu.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const CheckSauBenh = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleView = () => setIsVisible(!isVisible);
  const [value, setValue] = useState(null);
  return (
    <View>
      {/* Kiểm tra sâu bệnh */}
      <View style={styles.waterMain}>
        <Image
          style={styles.imageMain}
          source={require("../../assets/iconGuide/caterpillar.png")}
        />
        <Text style={{ fontSize: 17 }}>Kiểm tra sâu bệnh</Text>
        <TouchableOpacity
          onPress={handleToggleView}
          style={styles.imageDownMain}
        >
          {isVisible ? (
            <Image
              style={styles.imageDownMain}
              source={require("../../assets/iconGuide/upload.png")}
            />
          ) : (
            <Image
              style={styles.imageDownMain}
              source={require("../../assets/iconGuide/down-arrow.png")}
            />
          )}
        </TouchableOpacity>
      </View>

      {isVisible && (
        <View style={styles.contentMainFinal}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Dấu hiệu bệnh: </Text>
            <Text style={styles.contentRowContent}>Lá đổi màu</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Phương pháp điều trị: </Text>
            <Text style={styles.contentRowContent}>Phun thuốc sâu H23Q</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contentRow}>Thời gian kiểm tra: </Text>
            <Text style={styles.contentRowContent}>1 ngày/lần</Text>
          </View>
          <View style={styles.rowWarning}>
            <Text style={styles.contentRowWarning}>Lưu ý: </Text>
            <Text style={styles.contentRowContent}>
              Thường xuyên kiểm tra đồng ruộng, khi thấy mật độ rầy khoảng 20
              con/khóm hoặc 3 con/dảnh trở lên
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  rowWarning: {
    flexDirection: "row",
    width: "80%",
    // marginLeft: 10
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowTitle: {
    width: "88%",
    paddingTop: 10,
    alignSelf: "flex-start",
    // paddingBottom: 12, // Khoảng cách dưới
    marginLeft: 20,
    marginBottom: 7,
    marginTop: 5,
    // borderBottomWidth: 0.5,
  },
  title: {
    fontWeight: "bold",
    color: "#3D3737",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  col: {
    width: "33%",
    padding: 10,
  },
  selectedJob: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  description: {
    textAlign: "justify",
  },
  main2: {
    backgroundColor: "#FFFFFF",
    height: "90%",
    width: "80%",
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  imageDown: {
    // marginRight: 10,
    position: "absolute",
    right: 0,
  },
  imageDownMain: {
    marginTop: 6,
    width: 17,
    height: 17,
    marginRight: 3,
    position: "absolute",
    right: 0,
  },
  imageMain: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  waterMain: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    paddingTop: 10,
    borderTopWidth: 0.2,
    borderTopColor: '#A6A6A6'
  },
  contentMain: {
    width: "96%",
    marginTop: 5,
    marginBottom: 8,
    paddingBottom: 8,
  },
  contentMainFinal: {
    width: "100%",
    marginTop: 5,
    marginBottom: 8,
    paddingBottom: 8,
  },
  contentRow: {
    fontSize: 15.5,
    lineHeight: 24,
    color: "#179459",
  },
  contentRowContent: {
    fontSize: 15.5,
    lineHeight: 24,
  },
  contentRowWarning: {
    color: "red",
    fontWeight: "bold",
    marginTop: 1.5,
    marginBottom: 1.5,
    lineHeight: 22,
    fontSize: 15.5,
  },
  imageNpkMain: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
});
