import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';  // Ícones do FontAwesome
import Buy from './buyManager';
import Home from './home';
import Book from './bookListScreen';
import Register from './RegisterBook';

function HomeScreen() {
  return <Home />;
}

function ListScreen() {
  return <Book/>;
}

function BuyScreen() {
  return <Buy />;
}

function BookScreen() {
  return <Register />;
}

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            let IconComponent = Icon; // Componente padrão será FontAwesome

            switch (route.name) {
              case 'Home':
                iconName = 'home';  // Ícone do FontAwesome
                break;
              case 'Listar':
                iconName = 'list'; // Ícone do FontAwesome
                break;
              case 'Comprar':
                iconName = 'shopping-cart';  // Ícone do FontAwesome
                break;
              case 'Livro':
                  iconName = 'book';  // Ícone do FontAwesome
                  break;
              case 'Ler API': 
                iconName = 'bell';
                break; 
              default:
                iconName = 'add-circle-outline';
                break;
            }
            // Usar IconComponent no retorno (FontAwesome ou Fontisto)
            return <IconComponent name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#4682B4',
          inactiveTintColor: '#000',
          showLabel: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Listar"
          component={ListScreen}
        />
        <Tab.Screen
          name="Comprar"
          component={BuyScreen}
        />
         <Tab.Screen
          name="Livro"
          component={BookScreen}
        />
        <Tab.Screen
          name="Ler API"
          component={NotificationsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTabRound: {
    width: 60,
    height: 90,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
