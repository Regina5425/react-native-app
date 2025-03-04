import { StyleSheet, Text, View, Image, Alert, ToastAndroid, Platform } from 'react-native';
import { Input } from './shared/Input/input';
import { Colors, Gaps } from './shared/tokens';
import { Button } from './shared/Button/Button';

export default function App() {
	const alert = () => {
		Alert.alert('Ошибка', 'Неверный логин и пароль', [
			{
				text: 'Ок',
				onPress: () => {},
				style: 'cancel'
			}
		]);
		if(Platform.OS === 'android') {
			ToastAndroid.showWithGravity(
				'Неверный логин и пароль',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM
			)
		}
		
	}

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode='contain' />
        <View style={styles.form}>
          <Input placeholder='Email' />
          <Input placeholder='Пароль' isPassword />
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
    alignItems: 'center'
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
  }
});
