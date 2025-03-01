import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { Input } from './shared/Input/input';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode='contain' />
        <View style={styles.form}>
          <Input placeholder='Email' />
          <Input placeholder='Пароль' />
          <Button
            title="Войти"
            color='#6C38CC'
          />
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
    gap: 50,
    backgroundColor: '#16171D'
  },
  content: {
    gap: 50,
    alignItems: 'center'
  },
  subtitle: {
    color: '#A97BFF',
    fontSize: 18,
    fontWeight: 400,
  },
  form: {
    justifyContent: 'space-between',
    gap: 16,
  },
  logo: {
    width: 220,
  }
});
