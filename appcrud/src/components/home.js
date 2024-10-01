import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Importa os ícones do Ionicons

// const Header -> É um componente funcional, basicamente é uma função JSX, para renderizar uma interface 
const Header = () => {
    return(
        <View style={styles.header}>
            <Text style={styles.title} >Eternal Grace</Text>

        {/* Caixa de Busca*/}
        <TextInput
            style={styles.serchBox}
            placeholder="Digite sua busca..."
        />

        {/* Icone de Menu */}
        <Icon name="menu-outline" size={30} color="#fff" style={styles.icon} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 100, // Altura do cabeçalho
        backgroundColor: '#8B008B', // Cor de fundo
        justifyContent: 'center', //Centraliza o título verticalmente
        alignItems: 'center', //Centraliza o título horizontalmente
    },
    title: {
        color: '#fff', //Cor do título
        fontSize: 20, // Tamanho da fonte
    },
    icon: {
        position: 'absolute',
        right: 10,  // Coloca o ícone no lado direito da tela
        top: 5,
    },
    serchBox:{
        height: 40,
        width: '80%',
        borderColor: '#FFFFF0',
        borderWidth: 1,
        paddingLeft: 20,
        marginTop: 10,
        backgroundColor: '#FFFFF0',
    }
});

export default Header
