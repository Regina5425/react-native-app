import { ActivityIndicator, Animated, GestureResponderEvent, Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import { Colors, Fonts, Radius } from '../tokens';

export function Button({ text, isLoading, ...props }: PressableProps & { text: string; isLoading?: boolean }) {
	const animatedValue = new Animated.Value(100);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.primaryHover, Colors.primary],
	});

	const fadeIn = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true,
		}).start();
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		props.onPressIn && props.onPressIn(e);
	};

	const fadeOut = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: true,
		}).start();
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		props.onPressOut && props.onPressOut(e);
	};

	return (
		<Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
			<Animated.View style={{ ...styles.button, backgroundColor: color }}>
				{isLoading ? <ActivityIndicator size="large" color={Colors.white} /> : <Text style={styles.text}>{text}</Text>}
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Radius.r10,
		height: 58,
	},
	text: {
		fontSize: Fonts.f18,
		color: Colors.white,
		fontFamily: Fonts.regular,
	},
});
