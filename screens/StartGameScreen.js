//Text: Guess my Number
//box with text
// Enter a number
// a input to enter number
// two buttons reset and confirm
import { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  useWindowDimensions,
} from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'
import Colors from '../constants/colors'

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('')
  const { width, height } = useWindowDimensions()

  function numberInputHandler(numberInput) {
    setEnteredNumber(numberInput)
  }
  function confirmInputHandler() {
    //parse received string into number
    const chosenNumber = parseInt(enteredNumber)

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number',
        'Input should be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }],
      )
      return
    }
    onPickNumber(chosenNumber)
  }
  function resetInputHandler() {
    setEnteredNumber('')
  }

  const marginTopSpace = height < 500 ? 30 : 100

  return (
    <>
      <View style={[styles.rootContainer, { marginTop: marginTopSpace }]}>
        <Title style={styles.titleText}>Guess the number! </Title>

        <View style={styles.inputContainer}>
          <View style={styles.internalContainer}>
            <Title style={styles.instructionsText}>
              Enter a number between 1-100
            </Title>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              placeholder="00"
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler} //to handle value typed in input
              value={enteredNumber}
            />
            <View style={styles.buttonsRow}>
              <View style={styles.buttonSingle}>
                <PrimaryButton onPressProp={resetInputHandler}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonSingle}>
                <PrimaryButton onPressProp={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default StartGameScreen

//
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 500 ? 30 : 100,
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 36,
    padding: 7,
    backgroundColor: Colors.viewBoxPeach,
    marginHorizontal: 24,
    borderRadius: 10,
    elevation: 4, //android specific for shadow
    //shadows for iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  internalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 40,
    borderRadius: 10,
    borderColor: Colors.backgroundPrimary,
    borderWidth: 2,
  },
  titleText: {
    color: Colors.orangeDark,
    fontSize: 30,
  },
  instructionsText: {
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    color: Colors.rippleOrange,
  },
  numberInput: {
    height: 50,
    width: 50,
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'open-sans-bold',
    borderBottomColor: Colors.orange,
    borderBottomWidth: 2,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  buttonSingle: {
    flex: 1,
  },
})
