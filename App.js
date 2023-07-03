import { useState } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { expoFonts, useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import StartGameScreen from './screens/StartGameScreen'
import GameOverScreen from './screens/GameOverScreen'

import GameScreen from './screens/GameScreen'
import Colors from './constants/colors'

export default function App() {
  const [userNumber, setUserNumber] = useState() //set to null
  const [gameIsOver, setGameIsOver] = useState(true)
  const [fontsLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  function gameOverHandler() {
    setGameIsOver(true)
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} />
  }

  return (
    <LinearGradient
      colors={[Colors.backgroundPrimary, Colors.backgroundSecondary]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/questionMarks.jpeg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    // height: '100%', //or
    flex: 1, //to utilize the whole space
  },
  backgroundImage: {
    opacity: 0.15,
  },
})
