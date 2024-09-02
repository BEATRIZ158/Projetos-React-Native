import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import Login from './login';

const Separator = () => <View style={styles.separator} />;

const Home = ({navigation}) => {
    return (
        <View style={{backgroundColor: '#DA70D6'}}>
           <Image style={styles.imagem} source={require('../../assets/logo.png')}/>
           <Separator/>
            <TouchableOpacity style={styles.button} onPress={''}>
              <Text style={{fontSize: 20}}>Acessar Tela de Login!</Text>
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
  },
  separator:{
    marginVertical: 20,
  }
});
