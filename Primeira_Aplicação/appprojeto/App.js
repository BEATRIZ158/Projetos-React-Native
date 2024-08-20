import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';

export default function App() {
  return (
    <View style={{backgroundColor: '#DA70D6'}}>
       <Image style={styles.imagem} source={require('../appprojeto/assets/logo.png')}
        />
        <TouchableOpacity style={styles.button} onPress={''}>
          <Text style={{fontSize: 20}}>Aperte Aqui!</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imagem:{
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    alignItems:'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
  }
});
