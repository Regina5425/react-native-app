import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { Colors } from '../shared/tokens';

export default function Restore() {
	return (
		<View>
			<Stack.Screen options={{ title: 'Восстановить пароль', statusBarBackgroundColor: Colors.black }} />
			<Link href="/">
				<Text>retstore page</Text>
			</Link>
		</View>
	);
}
