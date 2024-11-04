import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import firebase from '../services/connectionFirebase';  // Importe sua configuração do Firebase

const BookListScreen = () => {
    const [searchValue, setSearchValue] = useState('');  // Valor do TextInput
    const [books, setBooks] = useState([]);              // Lista de livros
    const [filteredBooks, setFilteredBooks] = useState([]);  // Lista de livros filtrada

    // Função para buscar livros no Firebase
    useEffect(() => {
        const fetchBooks = async () => {
            const snapshot = await firebase.database().ref('Book').once('value');
            const data = snapshot.val();
            const bookArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setBooks(bookArray);
            setFilteredBooks(bookArray);  // Inicialmente, sem filtro
        };
        fetchBooks();
    }, []);

    // Função para filtrar livros com base no valor de busca
    const handleSearch = () => {
        if (searchValue) {
            const filtered = books.filter(book =>
                (book.title || '').toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredBooks(filtered);
        } else {
            setFilteredBooks(books);  // Reseta para exibir todos os livros se a busca estiver vazia
        }
    };

    return (
        <View style={styles.container}>
            {/* Input e botão de busca */}
            <TextInput
                style={styles.input}
                placeholder="Buscar por título"
                value={searchValue}
                onChangeText={text => setSearchValue(text)}
            />
            <Button title="Buscar" onPress={handleSearch} />
        
            {/* Lista de livros */}
            <View style={[{paddingTop: 15}]}>
            <FlatList
                data={filteredBooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.bookItem, {paddingTop: 10}]}>
                        <Text style={styles.title}>Titúlo: {item.tittle}</Text>
                        <Text>Autor: {item.author}</Text>
                        <Text>Gênero: {item.gender}</Text>
                        <Text>Preço: {item.price}</Text>
                    </View>
                )}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    bookItem: {
        padding: 15,
        marginBottom: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        height: 120
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 4,
    },
});

export default BookListScreen;
