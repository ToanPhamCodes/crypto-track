import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
// import {ChartDot, ChartPath, ChartPathProvider} from '@rainbow-me/animated-charts';
import { LineChart } from 'react-native-wagmi-charts';
import React, { useEffect, useState } from 'react'
import { useSharedValue } from 'react-native-reanimated';
const Chart = ({current_price, logoUrl, name, symbol, priceChange7d, sparkline}) => {
    const color = (priceChange7d > 0 ? "green" : "red")
    const [chartReady, setChartReady] = useState(false);
    const { width: SIZE } = Dimensions.get('window');

    const latestCurrentPrice = useSharedValue(current_price);
    useEffect(() => {
      latestCurrentPrice.value = current_price;
  
      setTimeout(() => {
        setChartReady(true);
      }, 0)
  
    }, [current_price])

    return (
        <LineChart.Provider  style = {styles.chartStyle} data = {sparkline.price}>
            <View style = {styles.chartWrapper}>
                <View styles = {styles.titleWrapper}>

                    <View style = {styles.upperTitle}>
                        <View style = {styles.upperLeftTitle}>
                            <Image style = {styles.image} source = {{uri: logoUrl}}/>
                            <Text style = {styles.upperText}>{name} ({symbol.toUpperCase()})</Text>
                        </View>
                        <Text style = {styles.upperText}> 7d</Text>
                    </View>


                    <View style = {styles.bottomTitle}>
                        <Text style = {styles.boldCurrency}>${current_price.toLocaleString("en-US", {currency: "USD"})}</Text>

                        <Text style = {[styles.title, {color:color}]}>{priceChange7d.toFixed(2)}%</Text>
                    </View>

                </View>

            </View>

            {chartReady ?(
                <LineChart  height={300} width={SIZE}>
                    <LineChart.Path />
                    <LineChart.CursorCrosshair>
                    <LineChart.Tooltip />
                    </LineChart.CursorCrosshair>
                </LineChart>

            ): null
            }

        </LineChart.Provider>
  )


}

const styles = StyleSheet.create ({
    chartWrapper: {
        margin: 16,
    },
    titleWrapper: {
       marginHorizontal: 16,
    },
    upperTitle : {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',

    },

    upperLeftTitle: {
        flexDirection: "row",
        alignItems: 'center',
    },

    image: {
        width: 24,
        height: 24,
        marginRight: 4,
    },
    upperText: {
        fontSize: 14,
        color: 'grey',

    },

    bottomTitle: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    
    },
    boldCurrency: {
        fontWeight: 'bold',
        fontSize: 24,
    },

    title: {
        fontSize: 18,
    },

    chartStyle: {
        marginBottom: 100,
    }

})
  

export default Chart