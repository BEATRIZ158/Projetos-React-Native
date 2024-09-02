// Rotas
import Home from './home';  
import Login from './login'  

// createStackNavigator -> Ela permite a criação de diferentes tipos de navegação, 
// como navegação por pilha (stack), navegação por abas (tab), e muito mais

import { createAppContainer, createStackNavigator } from 'react-navigation';  

const Routers = createAppContainer(  
  createStackNavigator({  
    Home: Home,  
    Login: Login,  
  })    
);  

export default Routers;
