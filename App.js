import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import StartGameScreen from './screens/StartGameScreen'
import GameOverScreen from './screens/GameOverScreen'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import GameScreen from './screens/GameScreen'
import Colors from './constants/colors'

SplashScreen.preventAutoHideAsync()
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [userNumber, setUserNumber] = useState() //set to null
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRoundsNumber, setGuessRoundsNumber] = useState(0)

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        })
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true)
    setGuessRoundsNumber(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null)
    setGameIsOver(true)
    setGuessRoundsNumber(0)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRoundsNumber}
        onStartNewGame={startNewGameHandler}
      />
    )
  }

  return (
    <LinearGradient
      colors={[Colors.backgroundPrimary, Colors.backgroundSecondary]}
      style={styles.rootScreen}
      onLayout={onLayoutRootView}
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
