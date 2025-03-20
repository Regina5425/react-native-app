import { StyleSheet, View, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '../shared/Input/input';
import { Colors, Gaps } from '../shared/tokens';
import { Button } from '../shared/Button/Button';
import { useEffect, useState } from 'react';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import CustomLink from '../shared/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';
import { useScreenOrientation } from '../shared/hooks';
import { Orientation } from 'expo-screen-orientation';

export default function Login() {
	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [{ access_token, error: loginError, isLoading }, login] = useAtom(loginAtom);
	const orientation = useScreenOrientation();

	const submit = () => {
		if (!email) {
			setError('Введите email');
			return;
		}

		if (!password) {
			setError('Введите пароль');
			return;
		}

		login({ email, password });
	};

	useEffect(() => {
		if (loginError) {
			setError(loginError);
		}
	}, [loginError]);

	useEffect(() => {
		if (access_token) {
			router.replace('/');
		}
	}, [access_token]);

	return (
		<View style={styles.container}>
			<ErrorNotification error={error} />
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
				<Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
				<View style={styles.form}>
					<View style={{ ...styles.inputs, flexDirection: orientation === Orientation.PORTRAIT_UP ? 'column' : 'row' }}>
						<Input
							style={{
								width: orientation === Orientation.PORTRAIT_UP ? 'auto' : Dimensions.get('window').width / 2 - 16 - 48,
							}}
							placeholder="Email"
							onChangeText={setEmail}
						/>
						<Input
							style={{
								width: orientation === Orientation.PORTRAIT_UP ? 'auto' : Dimensions.get('window').width / 2 - 16 - 48,
							}}
							placeholder="Пароль"
							isPassword
							onChangeText={setPassword}
						/>
					</View>

					<Button text="Войти" onPress={submit} isLoading={isLoading} />
				</View>
				<CustomLink href="/restore" text="Восстановить пароль" />
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: Gaps.g50,
		backgroundColor: Colors.black,
	},
	content: {
		gap: Gaps.g50,
		alignItems: 'center',
	},
	form: {
		justifyContent: 'space-between',
		gap: Gaps.g16,
	},
	logo: {
		width: Platform.select({ ios: 220, android: 300 }),
	},
	inputs: {
		gap: Gaps.g16,
	},
});
