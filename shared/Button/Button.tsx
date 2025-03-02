import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

export function Button ({text, ...props}: PressableProps & {text: string}) {
  return (
    <Pressable {...props}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Radius.r10,
    height: 58,
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: Fonts.f18,
    color: Colors.white,
  }
})