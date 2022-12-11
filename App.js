import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Item from './components/Item';
import Chart from './components/Chart';
import React, {useRef, useMemo, useState, useEffect} from 'react';
import { SAMPLE_DATA } from './assets/Data/SampleData';
import { BottomSheetModal, BottomSheetModalProvider,} from '@gorhom/bottom-sheet';
import { getMarketData } from './cryptoGetter';
const App = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const openModel = (item) => {  
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  }

  return (

    <BottomSheetModalProvider>
      
      <View style={styles.container}>
        <View style = {styles.titleWrapper}>
          <Text style = {styles.largeTitle}> Markets</Text>
        </View>

        <View style = {styles.horizontalLine}/>

        <FlatList
          data={data}
          keyExtractor={item => item.id}

          renderItem = {({item}) => (
            <Item
              name = {item.name}
              symbol = {item.symbol}
              current_price = {item.current_price}
              price_change_percentage_7d_in_currency = {item.price_change_percentage_7d_in_currency}
              logoUrl = {item.image}
              onPress = {() => openModel(item)}/>
            
          )}
        />

      </View>

      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style = {styles.bottomSheet}>
          
          {
            selectedCoinData ? (
              <Chart
                current_price = {selectedCoinData.current_price}
                logoUrl = {selectedCoinData.image}
                name = {selectedCoinData.name}
                symbol = {selectedCoinData.symbol}
                priceChange7d = {selectedCoinData.price_change_percentage_7d_in_currency}
                sparkline = {selectedCoinData.sparkline_in_7d}
    
              />

            ) : null
          }

        </BottomSheetModal>
    </BottomSheetModalProvider>

  )

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color : 'white'
  },

  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,

  },

  horizontalLine: {
    // backgroundColor: "#121412",
    marginHorizontal: 16,
    marginTop: 16,
    height: StyleSheet.hairlineWidth,
    color : "white",
  },

  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    
  }
});


export default App;