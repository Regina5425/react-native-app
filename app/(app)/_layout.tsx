import { Redirect } from 'expo-router';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../entities/auth/model/auth.state';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'react-native-drawer-layout';

export default function AppLayout() {
	const { access_token } = useAtomValue(authAtom);

	// 2 вариант редиректа
	if (!access_token) {
		return <Redirect href="/login" />;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer />
		</GestureHandlerRootView>
	);
}
