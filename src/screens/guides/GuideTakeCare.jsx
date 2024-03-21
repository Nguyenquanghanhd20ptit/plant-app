import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, TextInput, Button } from 'react-native'
import Header from '../../components/Header'
import ScheduleComponent from '../../components/schedule/ScheduleComponent'
import Menu from '../../components/Menu'
import HeaderGuide from '../../components/HeaderGuide'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropdownChoose from './DropDownChoose';
import { DropdownPicker } from 'react-native-dropdown-picker';

export default function GuideTakeCare() {
    const [open, setOpen] = useState(false); // Biến trạng thái đóng/mở dropdown
    const [value, setValue] = useState(null); // Biến lưu giá trị được chọn
    const [items, setItems] = useState([ // Danh sách các mục dropdown
      { label: 'Item 1', value: '1' },
      { label: 'Item 2', value: '2' },
      { label: 'Item 3', value: '3' },
    ]);

    return (
        <View>
            
        </View>
 )
}

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];