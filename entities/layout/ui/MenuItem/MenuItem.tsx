import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/commonjs/src/types';
import { ReactNode, useState } from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import { Href } from 'expo-router';
import { Colors, Fonts, Gaps } from '../../../../shared/tokens';

interface MenuItemProps {
	drawer: DrawerContentComponentProps;
	icon: ReactNode;
	text: string;
	path: Href;
}

export function MenuItem({ icon, drawer, path, text, ...props }: MenuItemProps & PressableProps) {
	const [clicked, setClicked] = useState(false);
	const isActive = drawer.state.routes[drawer.state.index].name === path;

	return (
		<Pressable
			{...props}
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
			onPress={() => drawer.navigation.navigate(path.toString())}
		>
			<View
				style={{
					...styles.menu,
					backgroundColor: clicked || isActive ? Colors.violetDark : Colors.black,
					borderColor: isActive ? Colors.primary : Colors.black,
				}}
			>
				{icon}
				<Text style={styles.text}>{text}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	menu: {
		flexDirection: 'row',
		gap: Gaps.g20,
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderRightWidth: 5,
		alignItems: 'center',
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f16,
		fontFamily: Fonts.regular,
	},
});
