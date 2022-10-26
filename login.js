import React, {useState, useContext} from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, Text, Alert, FlatList } from "react-native";
import authContext from "./authContext";
import userContext from "./userContext";


//Fonction de Log In permettant à l'utilisateur de se connecter et d'enregistrer son statut d'authentification et son username

export default function LogIn() {

  //Récupération des contextes d'authentification et d'utilisateur
  const { setAuthenticated } = useContext(authContext);
  const {userName, setUserName} = useContext(userContext);
  const LogIn = ()=>{
    setAuthenticated(true)
  }
  const [password, SetPW] = useState(null);

  const Separator = () => (
    <View style={styles.separator} />
  );


  return(
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Veuillez vous connecter
        </Text>
        <Separator />
        {/* Entrée du nom d'utilisateur */}
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={(text)=>setUserName(text)}
          placeholder="Username"
        />
        {/* Entrée du mot de passe (sans vérification) */}
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={SetPW}
          placeholder="Password"
          secureTextEntry={true}
        />      
        <Separator /> 
        {/* Validation et connexion */}     
        <Button
          title="Se connecter"
          onPress={LogIn}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });