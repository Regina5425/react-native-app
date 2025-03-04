import { Animated, Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

export function Button ({text, ...props}: PressableProps & {text: string}) {
	const animatedValue = new Animated.ValueXY({x: 0, y: 0});

	Animated.timing(animatedValue, {
		toValue: {
			x: 100,
			y: 100
		},
		duration: 2000,
		useNativeDriver: true
	}).start()

  return (
    <Pressable {...props}>
      <Animated.View style={{...styles.button, transform: [
				{translateX: animatedValue.x},
				{translateY: animatedValue.y}
			]}}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
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