import React, { useState, useEffect, useRef } from 'react'; 
import { 
  View, Text, StyleSheet, 
  TouchableOpacity, Keyboard, FlatList, ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Dialog, Portal, Button, Provider } from 'react-native-paper'; 
import ListBook from './list_book';
import firebase from '../services/connectionFirebase';

const Separator = () => { 
  return <View style={styles.separator} />; 
}

export default function registerBook() {
  const [author, setAuthor] = useState(''); 
  const [gender, setGender] = useState(''); 
  const [tittle, setTittle] = useState(''); 
  const [price, setPrice] = useState(''); 
  const [key, setKey] = useState(''); 
  const [buys, setBuys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false); // Estado para controle do diálogo
  const [selectedKey, setSelectedKey] = useState(null); // Estado para guardar o item a ser deletado
  const inputRef = useRef(null);

  //métodos do arquivo insert/ipdate/search/edit/delete
  useEffect(() => {
    async function search() {
      await firebase.database().ref('Book').on('value', 
      (snapshot) => {
        setBuys([]);
        snapshot.forEach((chilItem) => {
          let data = {
            key: chilItem.key,
            author: chilItem.val().author,
            gender: chilItem.val().gender,
            tittle: chilItem.val().tittle,
            price: chilItem.val().price,           
          };
          setBuys(oldArray => [...oldArray, data].reverse());
        })
        setLoading(false);
      })
    }
    search();
  }, []);
  
  async function insertUpdate() {
    if ((author !== "") & (gender !== "") & (tittle !== "") & (price !== "") & (key !== "")) {
      firebase.database().ref("Book").child(key).update({
        author: author,
        gender: gender,
        tittle: tittle,
        price: price,
      });
      Keyboard.dismiss();
      alert("Cadastro Alterado!");
      clearData();
      setKey("");
      return;
    }

    let buy = await firebase.database().ref("Book");
    let keyprod = buy.push().key;
  
    buy.child(keyprod).set({
      author: author,
      gender: gender,
      tittle: tittle,
      price: price,
    });
    alert("Cadastro Realizado!");
    clearData();
  }
  
  function clearData() {
    setAuthor("");
    setGender("");
    setTittle("");
    setPrice("");
  }

  function handleEdit(data){
    setKey(data.key);
    setAuthor(data.author);
    setGender(data.gender);
    setTittle(data.tittle);
    setPrice(data.price);
  }

  function confirmDelete(key){
    setSelectedKey(key);
    setVisible(true); // Exibe o diálogo de confirmação
  }

  function handleDelete() {
    if (selectedKey) {
      firebase.database().ref('Book').child(selectedKey).remove()
      .then(() =>{
        const findBook = buys.filter(item => item.key !== selectedKey);
        setBuys(findBook);
        setVisible(false);
      });
    }
  }

  return (
    <Provider>
      <View style={[styles.container, {margin:0}]}>
        <View style={styles.container}> 
            <TextInput
                placeholder='Autor' 
                left={<TextInput.Icon icon="account" />} 
                style={styles.input} 
                onChangeText={(texto) => setAuthor(texto)} 
                value={author}
                ref={inputRef}
            />
            <Separator />
            <TextInput
                placeholder='Gênero' 
                left={<TextInput.Icon icon="book-open-variant" />}
                style={styles.input} 
                onChangeText={(texto) => setGender(texto)} 
                value={gender}
                ref={inputRef}
            /> 
            <Separator />
            <TextInput
                placeholder='Título' 
                left={<TextInput.Icon icon="book-alphabet" />} 
                style={styles.input} 
                onChangeText={(texto) => setTittle(texto)} 
                value={tittle}
                ref={inputRef}
            /> 
            <Separator /> 
            <TextInput 
                placeholder='Preço (R$)' 
                left={<TextInput.Icon icon="cash" />} 
                style={styles.input} 
                onChangeText={(texto) => setPrice(texto)} 
                value={price}
                ref={inputRef}
            />
            <Separator /> 
            <TouchableOpacity onPress={insertUpdate} 
                style={[styles.button, {marginLeft: 40}]}
                activeOpacity={0.5}> 
                <Text style={styles.buttonTextStyle}> 
                    Salvar
                </Text>
            </TouchableOpacity> 
            <View>
                <Text style={[styles.listar, {color: '#FFFFFF'}]}>Histórico de Cadastros</Text> 
            </View>

            {loading ? (
              <ActivityIndicator color="#121212" size={45} />
            ) : (
              <FlatList
                keyExtractor={(item) => item.key}
                data={buys}
                renderItem={({ item }) => (
                  <ListBook 
                    data={item} 
                    deleteItem={() => confirmDelete(item.key)} 
                    editItem={handleEdit} 
                  />
                )}
              />
            )}
        </View> 

        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Confirmação de Exclusão</Dialog.Title>
            <Dialog.Content>
              <Text>Tem certeza que deseja deletar este livro?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancelar</Button>
              <Button onPress={handleDelete}>Deletar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  ); 
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1,
        margin: 10,
        backgroundColor: '#6c3c0c'
    },
    input: { 
        borderWidth: 1, 
        borderColor: '#121212', 
        height: 40, 
        fontSize: 13, 
        borderRadius: 8 
    }, 
    separator: { 
        marginVertical: 5, 
    }, 
    button: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#DAA520', 
        borderWidth: 0.5, 
        borderColor: '#fff', 
        height: 40, 
        borderRadius: 5, 
        margin: 5,
        width: 300
    },
    buttonTextStyle: { 
        color: '#fff',
        marginBottom: 4, 
        marginLeft: 100, 
        fontSize: 20
    }, 
    listar: { 
        fontSize: 20, 
        textAlign: 'center' 
    } 
});
