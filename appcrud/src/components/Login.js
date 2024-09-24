import React, { useState } from 'react'; 
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'; 
import { Card, TextInput } from 'react-native-paper'; 
import firebase from '../services/connectionFirebase';

export default function Login() {
  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para verificar se é logar ou cadastrar usuário 
  function handleLogin(){
    if (type === 'login') {
      // Aqui fazemos o login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Email ou senha não cadastrados!');
          return;
        })
 
    } else {
      // Aqui cadastramos o usuario 
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Erro ao Cadastrar!');
          return;
        })
      }
  }

  return (
    <View> 
      <Image 
        source={require('../../assets/Pola Books.png')} 
        style={{ width: 390, height: 320 }} 
        />
        <Text style={styles.text}>LOGIN</Text> 
        <Card style={styles.card}> 
          <TextInput style={styles.input} 
            label="E-mail" 
            right={<TextInput.Icon icon="email" />} 
            value={email}
            onChangeText={(text) => setEmail(text)} 
          />
          <TextInput 
            label="Senha" 
            secureTextEntry 
            right={<TextInput.Icon icon="eye" />} 
            value={password} 
            onChangeText={(text) => setPassword(text)}
          />
        </Card>
        <TouchableOpacity 
        style={[styles.handleLogin, 
          { backgroundColor: type === 'login' ? '#3ea6f2' : 'black' } ]}  
        onPress={handleLogin}
        >        
        <Text style={styles.loginText}>  
        { type === 'login' ? 'Acessar' : 'Cadastrar' }  
      </Text>
      </TouchableOpacity>  
      <TouchableOpacity onPress={ () => setType(type => type === 'login' ? 'cadastrar' : 'login')} >  
        <Text style={{ textAlign: 'center', fontSize:20, fontWeight: 'bold' }}>  
          {type === 'login' ? 'Criar uma conta?' : 'Já possuo uma conta!' }  
        </Text> 
      </TouchableOpacity> 
    </View>
  ); 
}

const styles = StyleSheet.create({ 
  card: { 
    borderRadius: 10, 
    backgroundColor: "#8B008B", 
    alignItems: 'center', 
    height: 200,
    width: 350,
    marginLeft: 10
  },
  handleLogin:{ 
  alignItems: 'center', 
  justifyContent:'center', 
  height: 45,
  marginTop:30,
  },
  loginText:{ 
    color: '#FFF', 
    fontSize: 24, 
  },
  input:{ 
    width: 320, 
    marginTop: 42 
  },
   text:{ 
    fontSize:30, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    marginTop: 50 
   } 
});
