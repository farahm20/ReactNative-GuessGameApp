import { View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '../../constants/colors'

const Card = ({ children }) => {
  return (
    <View style={styles.cardContainer}>
      <Text>{children}</Text>
    </View>
  )
}

export default Card
const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.viewBoxBlue,
    borderWidth: 1,
    borderColor: Colors.blueBorder,
  },
})
