import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Componente Header (default export)
const Principal = () => {
    return (
        <View style={styles.container}>
            {/* View da Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Eternal Grace</Text>
                {/* Caixa de Busca */}
                <TextInput
                    style={styles.serchBox}
                    placeholder="Digite sua busca..."
                />
                {/* Ícone de Menu */}
                <Icon name="menu-outline" size={30} color="#fff" style={styles.icon} />
            </View>
            <View>
                {/* Adicionando o componente Buttons */}
                <Buttons />
            </View>
        </View>
    );
};

// Componente Buttons
const Buttons = () => {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => alert('Botão CATEGORIAS clicado!')}>
                <Text style={styles.buttonText}>Categorias</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Faz o container ocupar todo o espaço disponível
        justifyContent: 'flex-start', // Centraliza o conteúdo verticalmente
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        backgroundColor: '#FFFF', // Cor de fundo para visualizar melhor
    },
    header: {
        height: 200,  // Ajustado para caber os novos componentes
        width: 400,
        backgroundColor: '#8B008B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'left',
        padding: 10,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 5,
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
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        height: '38%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Principal;
