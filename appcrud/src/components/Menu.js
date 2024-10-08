import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';  // Ícones do FontAwesome
import Icons from 'react-native-vector-icons/Fontisto';    // Ícones do Fontisto
import Home from './home';

function HomeScreen() {
  return <Home />;
}

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
    </View>
  );
}

function UserScreen() {
  return (
    <View style={styles.container}>
      <Text>User Screen</Text>
    </View>
  );
}

function StoreScreen() {
  return (
    <View style={styles.container}>
      <Text>Store Screen</Text>
    </View>
  );
}

function ConfigScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
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
              case 'Explore':
                iconName = 'search'; // Ícone do FontAwesome
                break;
              case 'User':
                iconName = 'user';  // Ícone do FontAwesome
                break;
              case 'Store':
                iconName = 'shopping-cart';  // Ícone do FontAwesome
                break;
              case 'Settings':
                iconName = 'player-settings'; // Ícone do Fontisto
                IconComponent = Icons;        // Mudar para Fontisto
                break;
              default:
                iconName = 'add-circle-outline'; // Ícone padrão
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
          name="Explore"
          component={SearchScreen}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
        />
        <Tab.Screen
          name="Store"
          component={StoreScreen}
        />
        <Tab.Screen
          name="Settings"
          component={ConfigScreen}
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
