import React, {useState, useContext, useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LogIn from './login';
import authContext from './authContext';
import userContext from "./userContext";
import linkContext from "./linkContext";
import { WebView } from 'react-native-webview';
import Input from './input';


const Tab = createBottomTabNavigator();


export default function App() {
  //Récupération des contextes authentification, utilisateur et lien d'archive
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [linkdate, setLinkdate] = useState("");
  const [resultlink, setResultlink] = useState("");
  const valuename = useMemo(
    () => ({ userName, setUserName }), 
    [userName]
  );
  
  
  //Onglet d'accueil, d'entrée des informations de recherche d'archive et de gestion et exécution de la requête
  function Accueil() {
    const {userName} = useContext(userContext);
    return(
    <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.htitle}>Bienvenue, {userName} !</Text>
          <Input />
        </View>
    </SafeAreaView>)
  }

  //Onglet d'affichage de la web preview du résultat
  function Preview() {
    const {value, value2} = useContext(linkContext); 
    const [valueresultlink, setvalueResultlink] = value; 
    let previewlink=valueresultlink;
    return(
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.container}
        source={{ uri: previewlink }}
      />
    </SafeAreaView>)
  }

  //Onglet A propos d'affichage d'informations sur l'application
  const Propos = ()=>{
    return(<SafeAreaView>
      <Text style={styles.htitle}>App Web Time Machine</Text>
      <Text style={styles.contenttext}>
        Version : V1{"\n"}{"\n"}
        Date : 25/10/2022{"\n"}{"\n"}
        Développeur : Yann{"\n"}{"\n"}
        Powered by React Native{"\n"}{"\n"}
        Using MaterialCommunityIcons{"\n"}{"\n"}{"\n"}{"\n"}
      </Text>
      <Text style={styles.contenttextitalic}>
        Créé dans le cadre de la formation Bocal Academy
      </Text>
      </SafeAreaView>)
  }

  
  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }} >
    <userContext.Provider value={valuename}>
    <linkContext.Provider value={{value:[resultlink, setResultlink], value2:[linkdate, setLinkdate]}}>
      <NavigationContainer>
        {/* Si l'utilisateur n'est pas encore connecté, affichage de l'écran de login. Si il est connecté, affichage des autres onglets */}
        {!authenticated?<Tab.Navigator sceneContainerStyle={{ backgroundColor: '#FFFFFF' }}>
          <Tab.Screen name="Connexion" component={LogIn} options={{
            tabBarLabel: 'Log In',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}/></Tab.Navigator>:
          <Tab.Navigator sceneContainerStyle={{ backgroundColor: '#FFFFFF' }}>
            <Tab.Screen name="Recherche" component={Accueil} options={{
              tabBarLabel: "Recherche",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home-search" color={color} size={size} />
              ),            
            }}/>
            <Tab.Screen name="Preview" component={Preview} options={{
              tabBarLabel: 'Preview',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="file-find" color={color} size={size} />
              ),            
            }}/>
            <Tab.Screen name="A propos" component={Propos} options={{
              tabBarLabel: 'A propos',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="information" color={color} size={size} />
              ),
            }}/>
          </Tab.Navigator>
    }
      </NavigationContainer>
    </linkContext.Provider>
    </userContext.Provider>
    </authContext.Provider>
  );
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
  htitle: {
    textAlign: 'center',
    marginVertical: 12,
    fontSize:20,
    fontWeight: "bold",
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  contenttext: {
    marginVertical: 8,
    marginLeft:10,
  },
  contenttextitalic: {
    marginVertical: 8,
    marginLeft:10,
    fontStyle:"italic",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
