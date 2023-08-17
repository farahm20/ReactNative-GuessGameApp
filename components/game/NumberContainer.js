import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import Colors from '../../constants/colors'

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  )
}

export default NumberContainer

const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    padding: deviceHeight > 500 ? 15 : 5,
    borderRadius: 10,
    backgroundColor: Colors.viewBoxBlue,
    borderWidth: 1,
    borderColor: Colors.blueBorder,
    margin: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: Colors.textPrimary,
    fontSize: 36,
    fontWeight: 'bold',
  },
})
