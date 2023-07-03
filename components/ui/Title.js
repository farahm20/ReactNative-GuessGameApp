import { StyleSheet, View, Text } from 'react-native'

const Title = ({ children, style }) => {
  return (
    <View>
      <Text style={[styles.title, style]}>{children}</Text>
    </View>
  )
}

export default Title
const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: 'black',
  },
})
