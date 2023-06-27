import { StyleSheet, ImageBackground, Text, View } from 'react-native'
import StartGameScreen from './screens/StartGameScreen'
import { LinearGradient } from 'expo-linear-gradient'

export default function App() {
  return (
    <LinearGradient
      colors={['#rgb(247, 218, 177)', 'rgb(249 249 249)']}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/questionMarks.jpeg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.back}
      >
        <StartGameScreen />
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    backgroundColor: 'rgb(249 249 249)',
    // height: '100%', //or
    flex: 1, //to utilize the whole space
  },
  backgroundImage: {
    opacity: 0.15,
  },
})
