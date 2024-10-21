import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import firebase from '../services/connectionFirebase';


export default function Login({changeStatus}) {
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
    <View style={styles.container}>
      <Image 
        source={require('../../assets/Pola Books.png')} 
        style={{ width: 390, height: 320 }} 
        />
        <Text style={styles.text}>Login</Text> 
        <Card style={styles.card}> 
          <TextInput style={[styles.input, styles.inputSpacing]} 
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
          {backgroundColor: type === 'login' ? '#DAA520' : '#000' } ]}  
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
  container: {
    flex: 1, // Para preencher toda a tela
    backgroundColor: '#6c3c0c', // Aqui você define a cor de fundo
    justifyContent: 'center', // Para centralizar verticalmente
    padding: 5 // Ajuste o padding conforme necessário
  },
  card: {
    backgroundColor: '#DAA520',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 0,
    height: 160,
    width: 350,
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 30
  },
  inputSpacing: {
    marginBottom: 5, // Ajusta o espaço entre os elementos
  },
  handleLogin:{ 
    backgroundColor: '#DAA520',
    alignItems: 'center', 
    justifyContent:'center',
    width: 380, 
    height: 45,
    marginTop:30,
  marginLeft: 0
  },
  loginText:{ 
    color: '#FFF', 
    fontSize: 24, 
  },
  input:{
    width: 320, 
    marginTop: 20,
    borderRadius: 5
  },
   text:{ 
    color: '#DAA520',
    fontSize:30, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    marginTop: 50 
   }
});
