import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  useWindowDimensions,
  Dimensions,
} from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import NumberContainer from '../components/game/NumberContainer'
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import Colors from '../constants/colors'
import GuessLogItem from '../components/game/GuessLogItem'

function generateRandomBetween(min, max, exclude) {
  const roundedNumber = Math.floor(Math.random() * (max - min)) + min
  if (roundedNumber === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return roundedNumber
  }
}
//outside the component function because when the component is re-executed(example with each guess) we don't want to reset them every time. But we want to to reset these when the new game starts
let minBoundary = 1
let maxBoundary = 100
const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guessRounds, setGuessRounds] = useState([initialGuess])
  const { width, height } = useWindowDimensions()

  //useEffect will run whenever the currentGuess will change.
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length)
    }
  }, [currentGuess, userNumber, onGameOver])

  //useEffect with empty dependencies means, the componment
  useEffect(() => {
    minBoundary = 1
    maxBoundary = 100
  }, [])
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
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds])
  }
  const guessRoundsListLength = guessRounds.length

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
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
      </Card>
    </>
  )

  if (width > 500) {
    content = (
      <>
        {/* <Text style={styles.instructionsText}>Higher or Lower?</Text> */}
        <View style={styles.buttonsRowWide}>
          <PrimaryButton onPressProp={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color={'black'} />
          </PrimaryButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonsRowWide}>
            <PrimaryButton
              style={styles.buttonStyle}
              onPressProp={nextGuessHandler.bind(this, 'higher')}
            >
              <Ionicons name="md-add" size={24} color={'black'}></Ionicons>
            </PrimaryButton>
          </View>
        </View>
      </>
    )
  }
  return (
    <View style={styles.gameScreen}>
      <View style={styles.mainContainer}>
        <Title>Opponent's Guess!</Title>
        {content}
      </View>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <Card key={guessRound}>{guessRound}</Card>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  )
}
export default GameScreen

const deviceHeight = Dimensions.get('window').height

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
    marginTop: deviceHeight < 900 ? 25 : 55,
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
  buttonsRowWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
})
