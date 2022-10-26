import React, {useState, useContext} from 'react';
import { StyleSheet, TextInput, Button, View, Text, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as WebBrowser from 'expo-web-browser';
import linkContext from "./linkContext";


//Onglet d'entrée des informations de recherche d'archive et de gestion et exécution de la requête

export default function Input() {

  //Récupération du contexte de lien d'archive et initialisation des states (url et date recherchées, lien et date d'archive, result webbrowser)
  const Separator = () => (
    <View style={styles.separator} />
  );
  const [link, setLink] = useState("");
  const {value, value2} = useContext(linkContext); 
  const [resultlink, setResultlink] = value; 
  const [date, setDate] = useState(new Date(1598051730000));
  const [linkdate, setLinkdate] = value2;
  const [timestamp, setTimestamp] = useState(1598051730000); 
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [result, setResult] = useState(null);
  function pad2(n) { return n < 10 ? '0' + n : n }
    
  //Gestion des actions sur le DateTimePicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    let STime = currentDate.getFullYear().toString() + pad2(currentDate.getMonth() + 1) + pad2( currentDate.getDate()) + pad2( currentDate.getHours() ) + pad2( currentDate.getMinutes() ) + pad2( currentDate.getSeconds() );
    setTimestamp(STime);
  };
  
  //Affichage du DateTimePicker pour la date
  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };
  
  //Affichage du DateTimePicker pour l'heure
  const showTimepicker = () => {
    setShow(true);
    setMode('time');
  };

  //Création et envoi de la requête, enregistrement du lien et date d'archive retournée ou message d'erreur
  async function wayback(){
    Alert.alert("Veuillez patienter...");
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    };
    let reponse = await fetch("https://archive.org/wayback/available?url="+link+"&timestamp="+timestamp, options);
    let donnees = await reponse.json();
    if (donnees.archived_snapshots.closest!=undefined){
      Alert.alert("Archive trouvée");
      setResultlink(donnees.archived_snapshots.closest.url); 
      let dateString=donnees.archived_snapshots.closest.timestamp;
      let newdateString = dateString.substring(6, 8)+"/"+dateString.substring(4, 6)+"/"+dateString.substring(0, 4);
      setLinkdate(newdateString);
    }
    else{Alert.alert("Archive inconnue, veuillez choisir une autre date")}
  }


    
  //Affichage du webbrowser
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(resultlink);
    setResult(result);
  };
  



  return(
    <View>
      <Text style={styles.title}>
          Veuillez entrer l'URL et la date souhaitées
      </Text>
      <Separator />

      {/* Entrée de l'URL recherchée */}
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={(text)=>setLink(text)}
        placeholder="Lien"
      />
      <Separator />

      {/* Boutons d'affichage du DateTimePicker pour la date et l'heure */}
      <Button onPress={showDatepicker} title="Sélectionner la date" />
      <Separator />
      <Button onPress={showTimepicker} title="Sélectionner l'heure" />
      <Separator />

      {/* Affichage de la date et de l'heure sélectionnées */}
      <Text style={styles.title}>Date sélectionnée : {date.toLocaleString()}</Text>
      {show &&(
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}           
      <Separator />
        
      {/* Bouton de lancement de la requête */}
      <Button
        title="Valider"
        onPress={wayback}
      />
      <Separator />

      {/* Lorsqu'un résultat est enregistré, affichage de la date de l'archive et du bouton d'affichage webbrowser */}
      {resultlink?<View><Text style={styles.title}>Archive trouvée en date du {linkdate}</Text><Button title="Ouvrir dans le navigateur" onPress={_handlePressButtonAsync} /></View>:<View></View>}
    </View>
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