import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/commonjs/src/types';
import { ReactNode, useState } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';
import { Href } from 'expo-router';

interface MenuItemProps {
	navigation: DrawerNavigationHelpers;
	icon: ReactNode;
	text: string;
	path: Href;
}

export function MenuItem({ icon, navigation, path, text, ...props }: MenuItemProps & PressableProps) {
	const [clicked, setClicked] = useState(false);

	return (
		<Pressable
			{...props}
			onPress={() => navigation.navigate(path.toString())}
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
		>
			<View>
				{icon}
				<Text>{text}</Text>
			</View>
		</Pressable>
	);
}
