import { View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
const PrimaryButton = ({ children, onPressProp }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPressProp}
        android_ripple={{ color: Colors.rippleOrange }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  buttonOuterContainer: {
    padding: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    elevation: 4, //android specific for shadow
    //shadows for iOS
    shadowColor: Colors.buttonShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.orange,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 2,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    padding: 2,
  },
  pressed: {
    opacity: 0.75,
  },
})
