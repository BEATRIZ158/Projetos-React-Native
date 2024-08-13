import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        FATEC JALES!
      </Text>
      <Text>
        ANÁLISE E DESENVOLVIMENTO DE SISTEMAS
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20B2AA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    fontSize: 30,
    color: '#FFFAFA', 
    fontStyle: 'italic',
  }
});
