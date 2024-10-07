import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Componente Header (default export)
const Principal = () => {
    return (
        <View style={styles.container}>
            {/* View da Header */}
            <View style={styles.header}>
                <IconButton/>
                <Text style={[styles.title, {top: 14, left: 50}]}>Eternal Grace</Text>
            </View>
        </View>
    );
};

// Componente IconButton
const IconButton = () => {
    // Função chamada ao clicar no botão
    const handlePress = () => {
        Alert.alert('Ícone clicado!', 'Você clicou no ícone do menu.');
    };

    return (
        <View style={[styles.container, {backgroundColor: '#FFFFFF'}]}>
            {/* Ícone dentro de um botão */}
            <TouchableOpacity onPress={handlePress} style={[styles.iconButton, {top: 1, left: -200,}]}>
                <Icon name="list" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    );
}

const CardButton = ({ imageSource, buttonText, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Imagem do Card */}
      <Image source={imageSource} style={styles.image} />
      
      {/* Texto do Card */}
      <Text style={styles.text}>Jesus Cristo</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Faz o container ocupar todo o espaço disponível
        justifyContent: 'flex-start', // Centraliza o conteúdo verticalmente
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        backgroundColor: '#E6D853', // Cor de fundo para visualizar melhor
    },
    header: {
        height: 80,  // Ajustado para caber os novos componentes
        width: 400,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        position: 'absolute',
        color: '#000000',
        fontSize: 20,
        textAlign: 'right',
        padding: 10,
    },
    card: {
        backgroundColor: '#fff', // Cor de fundo do card
        borderRadius: 10, // Bordas arredondadas
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        padding: 10,
        alignItems: 'center', // Centraliza o conteúdo
        marginVertical: 10, // Espaçamento vertical entre os cards
    },
    image: {
        width: 100, // Largura da imagem
        height: 100, // Altura da imagem
        borderRadius: 10, // Bordas arredondadas para a imagem
      },
    serchBox: {
        height: 40,
        width: '80%',
        borderColor: '#FFFFF0',
        borderWidth: 1,
        paddingLeft: 20,
        marginTop: 10,
        backgroundColor: '#FFFFF0',
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconButton: {
        position: 'absolute',
        height: 30,
        padding: 20,  // Área clicável ao redor do ícone
        backgroundColor: '#FFFFFF',  // Fundo (opcional)
    },
});

export default Principal;
