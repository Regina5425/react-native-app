import { Pressable, PressableProps, View, StyleSheet } from 'react-native';
import MenuIcon from '../../../../assets/icons/menu';
import { useState } from 'react';
import { Colors } from '../../../../shared/tokens';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MenuButton({ navigation, ...props }: PressableProps & { navigation: any }) {
	const [clicked, setClicked] = useState(false);

	return (
		<Pressable {...props} onPressIn={() => setClicked(true)} onPressOut={() => setClicked(false)} onPress={() => navigation.toggleDrawer()}>
			<View style={{ ...styles.button, backgroundColor: clicked ? Colors.violetDark : Colors.blackLight }}>
				<MenuIcon />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingHorizontal: 20,
	},
});
