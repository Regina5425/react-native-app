import { StyleSheet, Text, View, Image } from 'react-native';
import { Input } from './shared/Input/input';
import { Colors, Gaps } from './shared/tokens';
import { Button } from './shared/Button/Button';
import { useState } from 'react';
import { ErrorNotification } from './shared/ErrorNotification/ErrorNotification';

export default function App() {
	const [error, setError] = useState('');

	const alert = () => {
		setError('Неверный логин или пароль');
	};

	return (
		<View style={styles.container}>
			<ErrorNotification error={error} />
			<View style={styles.content}>
				<Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
				<View style={styles.form}>
					<Input placeholder="Email" />
					<Input placeholder="Пароль" isPassword />
					<Button text="Войти" onPress={alert} />
				</View>
				<Text style={styles.subtitle}>Восстановить пароль</Text>
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
	subtitle: {
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
