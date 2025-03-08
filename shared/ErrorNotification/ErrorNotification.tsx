import { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';
import { Colors, Fonts } from '../tokens';

type Props = {
	error?: string;
};

export function ErrorNotification({ error }: Props) {
	const [isShow, setIsShow] = useState(false);
	const animatedValue = new Animated.Value(-100);

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		if (!error) return;

		setIsShow(true);

		const timeout = setTimeout(() => {
			setIsShow(false);
		}, 3000);

		return () => clearTimeout(timeout);
	}, [error]);

	if (!isShow) {
		return null;
	}

	return (
		<Animated.View style={{ ...styles.error, transform: [{ translateY: animatedValue }] }} onLayout={onEnter}>
			<Text style={styles.text}>{error}</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		top: 50,
		width: Dimensions.get('screen').width,
		backgroundColor: Colors.red,
		padding: 14,
	},
	text: {
		fontSize: Fonts.f16,
		color: Colors.white,
		textAlign: 'center',
		fontFamily: Fonts.regular,
	},
});
