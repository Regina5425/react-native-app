// import { useAtomValue } from 'jotai';
import { Text, View } from 'react-native';
import { Button } from '../../shared/Button/Button';
import { useSetAtom } from 'jotai';
import { logoutAtom } from '../../entities/auth/model/auth.state';
// import { authAtom } from '../../entities/auth/model/auth.state';
// import { useEffect } from 'react';
// import { router, useRootNavigationState } from 'expo-router';

export default function MyCourses() {
	// 1 вариант редиректа
	// const { access_token } = useAtomValue(authAtom);
	// const state = useRootNavigationState();

	// useEffect(() => {
	// 	if (!state?.key) return;

	// 	if (!access_token) {
	// 		router.replace('/login');
	// 	}
	// }, [access_token, state]);

	const logout = useSetAtom(logoutAtom);

	return (
		<View>
			<Text>index</Text>
			<Button text="Выйти" onPress={logout} />
		</View>
	);
}
