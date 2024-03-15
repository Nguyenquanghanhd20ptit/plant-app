import React from 'react'
import { Button, FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import Menu from '../../components/Menu';
import { useNavigation } from '@react-navigation/native';

const treesData = [
    {
      id: 1,
      name: 'Cây 1',
      type: 'Loại cây 1',
      image: require('../../assets/icons/flower.jpg'),
    },
    {
      id: 2,
      name: 'Cây 2',
      type: 'Loại cây 2',
      image: require('../../assets/icons/flower.jpg'),
    },
    {
        id: 3,
        name: 'Cây 2',
        type: 'Loại cây 2',
        image: require('../../assets/icons/flower.jpg'),
      },
      {
        id: 4,
        name: 'Cây 2',
        type: 'Loại cây 2',
        image: require('../../assets/icons/flower.jpg'),
      },
      {
        id: 5,
        name: 'Cây 2',
        type: 'Loại cây 2',
        image: require('../../assets/icons/flower.jpg'),
      },
    // Thêm các cây khác nếu cần
  ];

export default function SelectTree() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredTrees, setFilteredTrees] = React.useState(treesData);
    const handleSearch = () => {
        const filtered = treesData.filter(tree =>
          tree.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTrees(filtered);
      };
    
      const handleSelectName = (item) => {
       console.log(item.name)
       const name=item.name;
       navigation.navigate('AddSchedule',{name: name})
      };

    //   console.log(searchQuery)
    
  return (
    <View style={{
        backgroundColor:'#E7EBF7',
        height: '100%'
    }}>
    <View style={{
        paddingHorizontal: 25,
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
    {/* <Text>Search</Text> */}
     <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={{
        backgroundColor:'#FFFFFF',
        // paddingVertical: 10
        width: '75%',
        marginRight: 10
      }}
    />
    <View>
    <TouchableOpacity style={{
        paddingHorizontal: 10,
        paddingVertical:10,
        borderRadius: 5,
        backgroundColor: '#18B65B'
    }}
   onPress={handleSearch}>
        <Text style={{color:'white',}}>Search</Text>
    </TouchableOpacity> 
    

    </View>
    </View>
    <View style={{
        backgroundColor: '#FFFFFF',
        marginTop: 40,
        height: '61%',
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 20
    }}>
        <Text style={styles.treeCount}> có {filteredTrees.length} kết quả</Text>
        <FlatList
            data={filteredTrees}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectName(item)}>
                <View style={styles.treeItem}>
                    <Image source={item.image} style={styles.treeImage} />
                    <View style={styles.treeInfo}>
                    <Text style={styles.treeName}>{item.name}</Text>
                    <Text style={styles.treeType}>{item.type}</Text>
                    </View>
                </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            />
    </View>
    <View
          style={{
            // paddingTop: 30,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Menu />
        </View>
    </View>
  )

  
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    treeCount: {
      fontSize: 14,
      marginBottom: 20,
      color:'#717086'
    },
    treeItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      backgroundColor:'#F5F6FC',
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 10
    },
    treeImage: {
      width: 80,
      height: 80,
      borderRadius: 50,
      marginRight: 10,
    },
    treeInfo: {
      flex: 1,
    },
    treeName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    treeType: {
      fontSize: 16,
    },
  });