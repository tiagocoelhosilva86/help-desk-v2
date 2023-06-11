import React, { useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import Home from "./screens/Home";
import Cadastro from "./screens/Cadastro";
import Recuperar from "./screens/Recuperar";
import Login from "./screens/Login";
import AbrirChamado from "./screens/AbrirChamado";
import AdicionarUsuario from "./screens/AdicionarUsuario";
import SenhaRecuperada from "./screens/SenhaRecuperada";
import ListaChamados from "./screens/ListaChamados";
import RelatorioChamados from "./screens/RelatorioChamados";
import ChamadoMsgConfirmacao from "./screens/ChamadoMsgConfir";
import Informacao from "./screens/Informacao"
import Popup from "./screens/Popup";
import { BackHandler } from "react-native";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login" >

      <Stack.Screen name="Login" component={Login} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}}  />

      <Stack.Screen name="Home" component={Home} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}}  />

      <Stack.Screen name="Cadastro" component={Cadastro} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}}  />

      <Stack.Screen name="RecuperarSenha" component={Recuperar} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}}  />

      <Stack.Screen name="SenhaRecuperada" component={SenhaRecuperada} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}} />

         <Stack.Screen name="AbrirChamado" component={AbrirChamado} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}} />

        <Stack.Screen name="ChamadoMsgConfirmacao" component={ChamadoMsgConfirmacao} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}} />

        <Stack.Screen name="Popup" component={Popup} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}} />

         <Stack.Screen name="ListaChamados" component={ListaChamados} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}} />
         
         <Stack.Screen name="RelatorioChamados" component={RelatorioChamados} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}} />

         <Stack.Screen name="AdicionarUsuario" component={AdicionarUsuario} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}} />

         <Stack.Screen name="Informacao" component={Informacao} options={{headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: '#0000FF' },
         title:'HELP DESK'}} />

    </Stack.Navigator>
  );
}


export default function App() {
  const navigationRef = useNavigationContainerRef();
  
  const backAction = () => {
    if ( navigationRef.canGoBack() )
      navigationRef.goBack();
  else
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <NavigationContainer independent={true}  ref={navigationRef}>
      <MyStack />
    </NavigationContainer>
  );
}
