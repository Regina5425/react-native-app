import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

export default function App() {
  // const width = Dimensions.get('window').width;
  // width: (width / 2) - 5, где 5  - gap (условно если gap = 10, то между двумя элементами 10 / 2)
  // const {height, width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.textStyle}>Hello Android!</Text>
        <Button
          title="Learn More"
          color="#841584"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  textStyle: {color: 'green'},
  top: {
    flexDirection: 'row'
  }
});
