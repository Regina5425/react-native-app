import { Stack } from 'expo-router';
import { Colors } from '../shared/tokens';

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				statusBarBackgroundColor: Colors.black,
				contentStyle: {
					backgroundColor: Colors.black,
				},
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="restore"
				options={{
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
}
