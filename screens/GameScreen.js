import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, Text, Alert } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import NumberContainer from '../components/game/NumberContainer'

import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import Colors from '../constants/colors'

function generateRandomBetween(min, max, exclude) {
  console.log(
    '🚀 ~ file: GameScreen.js:11 ~ generateRandomBetween ~ min, max, exclude:',
    min,
    max,
    exclude,
  )

  const roundedNumber = Math.floor(Math.random() * (max - min)) + min
  if (roundedNumber === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return roundedNumber
  }
}

let minBoundary = 1
let maxBoundary = 100
const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  console.log(
    '🚀 ~ file: GameScreen.js:24 ~ GameScreen ~ currentGuess:',
    currentGuess,
  )
  //useEffect will run whenever the currentGuess will change.
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver()
    }
  }, [currentGuess, userNumber, onGameOver])

  function nextGuessHandler(direction) {
    // direction => 'lower', 'greater'
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'higher' && currentGuess > userNumber)
    ) {
      Alert.alert('Gotcha!', 'Tricking me!! Try again :-) ', [
        { text: 'Sorry!', style: 'cancel' },
      ])
      return
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    )
    setCurrentGuess(newRndNumber)
  }

  return (
    <View style={styles.gameScreen}>
      <View style={styles.mainContainer}>
        <Title>Opponent's Guess!</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View>
          <Text style={styles.instructionsText}>Higher or Lower?</Text>
          <View style={styles.buttonsRow}>
            <View style={styles.buttonSingle}>
              <PrimaryButton onPressProp={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name="md-remove" size={24} color={'black'}></Ionicons>
              </PrimaryButton>
            </View>
            <View style={styles.buttonSingle}>
              <PrimaryButton
                style={styles.buttonStyle}
                onPressProp={nextGuessHandler.bind(this, 'higher')}
              >
                <Ionicons name="md-add" size={24} color={'black'}></Ionicons>
              </PrimaryButton>
            </View>
          </View>
        </View>
      </View>

      <Card>Previous guess {currentGuess}</Card>
    </View>
  )
}

export default GameScreen
const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    padding: 24,
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.viewBoxPink,
    borderWidth: 1,
    borderColor: Colors.pinkBorder,
    marginBottom: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  buttonSingle: {
    flex: 1,
  },
  instructionsText: {
    fontFamily: 'open-sans',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15,
    color: Colors.orangeDark,
  },
})
