//Text: Guess my Number
//box with text
// Enter a number
// a input to enter number
// two buttons reset and confirm

import { StyleSheet, View, TextInput } from 'react-native'
import PrimaryButton from '../components/PrimaryButton'
import { useState } from 'react'

function StartGameScreen() {
  const [enteredNumber, setEnteredNumber] = useState('')
  console.log(
    '🚀 ~ file: StartGameScreen.js:13 ~ StartGameScreen ~ enteredNumber:',
    enteredNumber,
  )

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.internalContainer}>
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
              <PrimaryButton>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonSingle}>
              <PrimaryButton>Cancel</PrimaryButton>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default StartGameScreen

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 100,
    padding: 7,
    backgroundColor: '#ffefde',
    marginHorizontal: 24,
    borderRadius: '10%',
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
    borderRadius: '10%',
    borderColor: 'rgb(247, 218, 177)',
    borderWidth: 2,
  },
  numberInput: {
    height: 50,
    width: 50,
    textAlign: 'center',
    fontSize: 32,
    borderBottomColor: '#ff7e44',
    borderBottomWidth: 2,
    color: '#6b6d70',
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  buttonSingle: {
    flex: 1,
  },
})
