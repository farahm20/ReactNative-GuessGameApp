import { View, Image, Text, StyleSheet } from 'react-native'

import Title from '../components/ui/Title'
import PrimaryButton from '../components/ui/PrimaryButton'
import Colors from '../constants/colors'

const GameOverScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Title style={styles.titleText}>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/mountain-clip-art.png')}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlightText}>X</Text> rounds to
        guess the <Text style={styles.highlightText}>Y</Text> number.
      </Text>
      <PrimaryButton
        style={styles.buttonStyle}
        // onPressProp={newGameHandler.bind(this, 'new')}
      >
        Play again!
      </PrimaryButton>
    </View>
  )
}

export default GameOverScreen
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    color: Colors.textDarkOrange,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: Colors.pinkBorder,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    //refer to the container image and percentage refers to width and height of the view that hold the image
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontSize: 22,
    fontFamily: 'open-sans',
    textAlign: 'center',
    marginBottom: 15,
  },
  highlightText: {
    color: Colors.textDarkOrange,
    fontFamily: 'open-sans-bold',
  },
  buttonStyle: {
    padding: 20,
  },
})
