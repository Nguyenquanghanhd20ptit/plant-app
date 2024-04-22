import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Menu from '../../components/Menu';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../constants/commonConstant';


export default function Crops() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredTrees, setFilteredTrees] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalTrees, setTotalTrees] = useState(0);

  useEffect(() => {
    callToApiSearchTree();
  }, []);

  const handleSearch = () => {
    setCurrentPage(1);
    callToApiSearchTree();
  };
  
const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
    callToApiSearchTree();
  }
};

const handleNextPage = () => {
  const totalPages = Math.ceil(totalTrees / pageSize);
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
    callToApiSearchTree();
  }
};
const callToApiSearchTree = () => {
  fetch(API_URL.PlantApp + '/plant/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      keyword: searchQuery,
      searchColumns: ["name"],
      pageable: {
        page: currentPage,
        pageSize: pageSize,
        sort: [{ property: 'id', direction: 'asc' }],
      },
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('search thất bại');
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.errorCode === '00') {
        const pageResponse = JSON.parse(data.data);
        const total = pageResponse.total;
        const plants = pageResponse.items;
        setTotalTrees(total);
        setFilteredTrees(plants);
      } else if (data && data.errorMessage) {
        Alert.alert('Thông báo', data.errorMessage);
      } else {
        Alert.alert('Thông báo', 'Search thất bại');
      }
    })
    .catch((error) => {
      Alert.alert('Thông báo', error.message);
    });
};
  
const handleSelectName = (plant) => {
  navigation.navigate('Statistic',{plant: plant})
 };


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
      <Text style={styles.treeCount}> có {totalTrees} kết quả</Text>
      <FlatList
          data={filteredTrees}
          renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectName(item)}>
              <View style={styles.treeItem}>
                  <Image source={{ uri: item.imageUrl }} style={styles.treeImage} />
                  <View style={styles.treeInfo}>
                  <Text style={styles.treeName}>{item.name}</Text>
                  <Text style={styles.treeType}>{item.description}</Text>
                  </View>
              </View>
              </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          />
  </View>

  <View style={styles.paginationContainer}>
      <TouchableOpacity style={styles.paginationButton} onPress={handlePrevPage}>
        <Text style={styles.paginationButtonText}>Trang trước</Text>
      </TouchableOpacity>
      <Text style={styles.paginationText}>Trang {currentPage}</Text>
      <TouchableOpacity style={styles.paginationButton} onPress={handleNextPage}>
        <Text style={styles.paginationButtonText}>Trang tiếp theo</Text>
      </TouchableOpacity>
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#18B65B',
  },
  paginationButtonText: {
    color: 'white',
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});