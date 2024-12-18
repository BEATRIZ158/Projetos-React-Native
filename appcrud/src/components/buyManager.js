import React, { useState, useEffect, useRef } from 'react'; 
import { 
    View, Text, StyleSheet, 
    TouchableOpacity, Keyboard, FlatList, ActivityIndicator 
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Dialog, Portal, Button, Provider } from 'react-native-paper';
import ListBuys from './list_buys';
import firebase from '../services/connectionFirebase';

const Separator = () => { 
  return <View style={styles.separator} />; 
}

export default function buyManager() {
  const [date, setDate] = useState(''); 
  const [product, setProduct] = useState(''); 
  const [brand, setBrand] = useState(''); 
  const [price, setPrice] = useState(''); 
  const [key, setKey] = useState(''); 
  const [buys, setBuys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false); // Estado para controle do diálogo
  const [selectedKey, setSelectedKey] = useState(null); // Estado para guardar o item a ser deletado
  //useRef utilizado para carregar os dados da lista para alterar
  const inputRef = useRef(null);

  //métodos do arquivo insert/ipdate/search/edit/delete
  useEffect(() => {
    //método para selecionar todas as compras cadastradas
    async function search() {
      await firebase.database().ref('Buys').on('value', 
      (snapshot) => {
        setBuys([]);
        snapshot.forEach((chilItem) => {
          let data = {
            //de acordo com a chave de cada item busca os valores
            //cadastrados na relação e atribui nos dados
            key: chilItem.key,
            date: chilItem.val().date,
            product: chilItem.val().product,
            brand: chilItem.val().brand,
            price: chilItem.val().price,           
          };
          setBuys(oldArray => [...oldArray, data].reverse());
        })
        setLoading(false);
      })
    }
    search();
  }, []);
  
  //método para inserir ou alterar os dados produtos
  //async -> assíncrono executa um método e espera
  //o processamento dele retornando uma mensagem
  async function insertUpdate() {
    //editar dados
    if (
      (date !== "") &
      (product !== "") &
      (brand !== "") &
      (price !== "") &
      (key !== "")
    ) {
      firebase.database().ref("Buys").child(key).update({
        date: date,
        product: product,
        brand: brand,
        price: price,
      });
      //para o teclado do celular fixo abaixo do formulário (não flutuante)
      Keyboard.dismiss();
      alert("Data Alterada!");
      clearData();
      setKey("");
      return;
    }
    //cadastrar dados - insert
    let buy = await firebase.database().ref("Buys");
    let keyprod = buy.push().key; //cadastar os dados
  
    buy.child(keyprod).set({
      date: date,
      product: product,
      brand: brand,
      price: price,
    });
    alert("Compra Realizada!");
    clearData();
  }
  
  function clearData() {
    setDate("");
    setProduct("");
    setBrand("");
    setPrice("");
  }

  function handleEdit(data){
    setKey(data.key);
    setDate(data.date);
    setProduct(data.product);
    setBrand(data.brand);
    setPrice(data.price);
  }

  function confirmDelete(key){
    setSelectedKey(key);
    setVisible(true); // Exibe o diálogo de confirmação
  }

  function handleDelete() {
    if (selectedKey) {
      firebase.database().ref('Buys').child(selectedKey).remove()
      .then(() =>{
        const findBuys = buys.filter(item => item.key !== selectedKey);
        setBuys(findBuys);
        setVisible(false);
      });
    }
  }

  return (
  <Provider>
  <View style={[styles.container, {margin:0}]}>
  	<View style={styles.container}> 
      <TextInput 
        placeholder='Data da Compra' 
        left={<TextInput.Icon icon="calendar" />} 
        style={styles.input} 
        onChangeText={(texto) => setDate(texto)} 
        value={date}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder='Produto'
        left={<TextInput.Icon icon="book-open-variant" />}
        style={styles.input} 
        onChangeText={(texto) => setProduct(texto)} 
        value={product}
        ref={inputRef}
      /> 
      <Separator />
      <TextInput
        placeholder='Marca' 
        left={<TextInput.Icon icon="book-alphabet" />} 
        style={styles.input} 
        onChangeText={(texto) => setBrand(texto)} 
        value={brand}
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
        <Text style={[styles.listar, {color: '#FFFFFF'}]}>Histórico de Compras</Text> 
      </View>

      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.key}
          data={buys}
          renderItem={({ item }) => (
          <ListBuys 
            data={item} 
            deleteItem={() => confirmDelete(item.key)} 
            editItem={handleEdit} />
          )}
        />
      )}
    </View>  

    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Confirmação de Exclusão</Dialog.Title>
        <Dialog.Content>
          <Text>Tem certeza que deseja excluir esta Compra?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancelar</Button>
          <Button onPress={handleDelete}>Excluir</Button>
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
    buttonImageIconStyle: { 
      padding: 10, 
      margin: 5, 
      height: 25, 
      width: 25, 
      resizeMode: 'stretch', 
    }, 
    buttonTextStyle: { 
      color: '#fff',
      marginBottom: 4, 
      marginLeft: 100, 
      fontSize: 20
    }, 
    buttonIconSeparatorStyle: { 
      backgroundColor: '#fff', 
      width: 1, 
      height: 20, 
    }, 
    listar: { 
      fontSize: 20, 
      textAlign: 'center' 
    } 
});
