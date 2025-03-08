import { Link, LinkProps } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../tokens';

export default function CustomLink({ text, ...props }: LinkProps & { text: string }) {
	return (
		<Link style={styles.link} {...props}>
			<Text>{text}</Text>
		</Link>
	);
}

const styles = StyleSheet.create({
	link: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f18,
		color: Colors.link,
	},
});
