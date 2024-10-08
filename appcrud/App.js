import React, { useState } from 'react';
import Login from './src/components/login'; 
import Menu from './src/components/Menu';

export default function App() {  
  const [user, setUser] = useState(null);

  //Se não estiver logado acessa a tela de login
  if(!user){
    return <Login changeStatus={(user) => setUser(user)} />
  }
  return <Menu/>
}
