import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useRoute } from '@react-navigation/native';

// Componente Header (default export)
const Principal = () => {
    const handleCardPress = (text) => {
        Alert.alert('Card clicado!', `Você clicou no card: ${text}`);
    };
    let iconName;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton iconName="list" iconSize={30} iconColor="#000" position={{ top: 3, left: -195}} 
                />
                <Text style={[styles.title, {top: 15, left: 55}]}>Eternal Grace</Text>
                <IconButton iconName="user-circle" iconSize={40} iconColor='#000' position={{ top: -40, left: 100}}/>
            </View>
            {/* Layout com Botões em Posições Diferentes */}
            <View style={styles.buttonContainer}>
                <Text style={[styles.title, {top: 30, left: -115}]}>Main Categories:</Text>
                <CardButton 
                    imageSource={require('../../assets/images/Jesus_Cristo.jpg')} 
                    buttonText="Jesus Cristo" 
                    onPress={() => handleCardPress("Jesus Cristo")} 
                    style={[styles.card, {top: 70, left: -90}]} // Estilo personalizado para este card
                />
                <CardButton
                    imageSource={require('../../assets/images/Herois.jpg')} 
                    buttonText="Heróis Da Fé" 
                    onPress={() => handleCardPress("Heróis Da Fé")} 
                    style={[styles.card, {top: -105, left: 85}]} // Estilo personalizado para este card
                />
                <CardButton
                    imageSource={require('../../assets/images/Apostolos.webp')} 
                    buttonText="Os Milagres" 
                    onPress={() => handleCardPress("Os Milagres")} 
                    style={[styles.card, {top: -105, left: -90}]} // Estilo personalizado para este card
                />
                <CardButton
                    imageSource={require('../../assets/images/Milagres.jpg')} 
                    buttonText="Os 12 Apostolos" 
                    onPress={() => handleCardPress("Os 12 Apostolos")} 
                    style={[styles.card, {top: -280, left: 87}]} // Estilo personalizado para este card
                />
                <CardButton
                    imageSource={require('../../assets/images/Mandamentos.jpg')} 
                    buttonText="10 Mandamentos" 
                    onPress={() => handleCardPress("Os 10 Mandamentos")} 
                    style={[styles.card, {top: -280, left: -87}]} // Estilo personalizado para este card
                />
                <CardButton
                    imageSource={require('../../assets/images/Apocalipse.png')} 
                    buttonText="Apocalipse" 
                    onPress={() => handleCardPress("Apocalipse")} 
                    style={[styles.card, {top: -454, left: 87}]} // Estilo personalizado para este card
                />
                {/* Adicione mais CardButtons conforme necessário */}
            </View>
        </View>
    );
};

// Componente IconButton

const IconButton = ({
    iconName,
    iconSize = 30,
    iconColor = "#000",
    onPressMessage = 'Ícone clicado!',
    position = { top: 1, left: -200 } // Posição padrão
}) => {
    const handlePress = () => {
        Alert.alert(onPressMessage, 'Você clicou no ícone do menu.');
    };

    return (
        <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
            <TouchableOpacity onPress={handlePress} style={[styles.iconButton, position]}>
                <Icon name={iconName} size={iconSize} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
};

// Componente CardButton
const CardButton = ({ imageSource, buttonText, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E6D853',
    },
    header: {
        height: 80,
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
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        padding: 10,
        alignItems: 'center',
        marginVertical: 10,
        width: 145,
        height: 155,
    },
    image: {
        width: 115,
        height: 110,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: '#000',
        marginTop: 5, // Adiciona um pequeno espaço acima do texto
    },
    iconButton: {
        position: 'absolute',
        height: 30,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
});

export default Principal;
