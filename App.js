import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

export default function App () {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idsearch, setIdsearch] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const getUsers = async () => {
     try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const getUsersById = async (id) => {
    try {
     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
     const json = await response.json();
     setData(json);
     if (json.name != null){
       setName(json.name);
       setEmail(json.email)
     }else{
      alert("El id de usuario no existe pruebe nuevamente ...")
     }
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

  useEffect(() => {
    //getUsers();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.touchables,{backgroundColor:'green'}]}
        onPress={()=>getUsers()}
      >
        <Text style={{color:'yellow'}}>Listar Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.touchables,{backgroundColor:'#A12312'}]}
        onPress={()=>getUsersById(idsearch)}
      >
        <Text style={{color:'yellow'}}>Buscar por ID</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.inputs}
        placeholder={'Ingrese el id a buscar'}
        onChangeText={idsearch => setIdsearch(idsearch)}
        value={idsearch}
      />
      <TextInput
        style={styles.inputs}
        onChangeText={name => setName(name)}
        value={name}
      />
      <TextInput
        style={styles.inputs}
        onChangeText={email => setEmail(email)}
        value={email}
      />


      {isLoading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
            style={[styles.touchables,{backgroundColor: item.id % 2 == 1 ? '#7FB5B5':'#D95030'}]}
            onPress={()=>{
              //alert(`Correo: ${item.email}, Usuario: ${item.username}`)
              if (confirm(`Esta seguro de borrar el usuario: ${item.name}?`)){
                alert("El usuario se ha borrado correctamente...");
              }
            }}
            >
              <Text style={{fontWeight:'bold'}} >{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchables:{
    borderRadius:10,
    justifyContent: 'center',
    alignItems:'center',
    height:50,
    marginBottom:10
  },
  inputs:{
    borderColor:'blue',
    borderWidth:1,
    borderRadius:8,
    marginTop:10,
    textAlign:'center',
    padding:5
  }
});
