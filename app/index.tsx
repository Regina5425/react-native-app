import { StyleSheet, Text, View, Image } from 'react-native';
import { Input } from '../shared/Input/input';
import { Colors, Gaps } from '../shared/tokens';
import { Button } from '../shared/Button/Button';
import { useState } from 'react';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import { Link } from 'expo-router';

export default function Login() {
	const [error, setError] = useState('');

	const alert = () => {
		setError('Неверный логин или пароль');
	};

	return (
		<View style={styles.container}>
			<ErrorNotification error={error} />
			<View style={styles.content}>
				<Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
				<View style={styles.form}>
					<Input placeholder="Email" />
					<Input placeholder="Пароль" isPassword />
					<Button text="Войти" onPress={alert} />
				</View>
				<Link style={styles.link} href="/restore">
					<Text>Восстановить пароль</Text>
				</Link>
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
	link: {
		color: Colors.link,
		fontSize: 18,
		fontWeight: 400,
	},
	form: {
		justifyContent: 'space-between',
		gap: Gaps.g16,
	},
	logo: {
		width: 220,
	},
});
