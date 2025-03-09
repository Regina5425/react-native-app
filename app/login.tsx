import { StyleSheet, View, Image } from 'react-native';
import { Input } from '../shared/Input/input';
import { Colors, Gaps } from '../shared/tokens';
import { Button } from '../shared/Button/Button';
import { useEffect, useState } from 'react';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import CustomLink from '../shared/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';

export default function Login() {
	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [{ access_token, error: loginError, isLoading }, login] = useAtom(loginAtom);

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
			<View style={styles.content}>
				<Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
				<View style={styles.form}>
					<Input placeholder="Email" onChangeText={setEmail} />
					<Input placeholder="Пароль" isPassword onChangeText={setPassword} />
					<Button text="Войти" onPress={submit} isLoading={isLoading} />
				</View>
				<CustomLink href="/restore" text="Восстановить пароль" />
			</View>
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
		width: 220,
	},
});
