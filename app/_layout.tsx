import { Navigator, Slot } from 'expo-router';
import { Text } from 'react-native';

export default function RootLayout() {
	return (
		<Navigator>
			<Text>Header</Text>
			<Slot />
			<Text>Footer</Text>
		</Navigator>
	);
}
