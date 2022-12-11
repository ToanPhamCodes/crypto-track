import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Item = ({name, symbol, current_price, price_change_percentage_7d_in_currency, logoUrl, onPress}) => {
  const color = (price_change_percentage_7d_in_currency > 0 ? "green" : "red")
  return (
    
    <TouchableOpacity onPress = {onPress}>

      <View style = {styles.itemWrapper}>
          

          {/* left side */}
          <View style = {styles.leftSideWrapper}>
            <Image style = {styles.image} source = {{uri: logoUrl}} />
            <View style = {styles.titlesWrapper}>
              <Text style = {styles.title}>{name}</Text>
              <Text style = {styles.abbreviate}>{symbol.toUpperCase()}</Text>
            </View>
          </View>


          {/* right side */}
          <View style = {styles.rightSideWrapper}>
            <Text style = {styles.title}>${current_price.toLocaleString("en-US", {currency: "USD"})}</Text>
            <Text style = {[styles.abbreviate, {color: color}]}>{price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
          </View>
      </View>
     
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create ({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection : "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  leftSideWrapper: {
    flexDirection:"row",
    alignItems: 'center',

  },

  rightSideWrapper: {
    alignItems: "flex-end",

  },

  image: {
    height: 48,
    width: 48,
  },

  titlesWrapper: {
    marginLeft: 8,

  },

  title: {
    fontSize: 18,
    color: "white",
  },

  abbreviate: {
    marginTop: 4,
    fontSize: 14,
    color: "grey",
  },



  

  

})

export default Item