import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChamadoMsgConfirmacao = () => {

    const navigation = useNavigation();
  
    function handleSingIn(data){
        console.log("Chamado Realizado com Sucesso ");
        console.log(data);
        navigation.navigate("Home")
    }

   return (
    <View style={styles.container}>
            
        <View style={styles.containerTextoEmail}>
            <Text style={styles.title}>Chamado Realizado com Sucesso!</Text>
        </View>
        <View style={styles.containerImageEmail}>
        <LottieView style={styles.LottieView} source={require("../../assets/imagens/confirmation")} loop autoPlay />
        </View>
        <View style={styles.containerForm}>
            <Text style={styles.titleTexto}>A Companhe o Estatos de Seus Chamados Abertos</Text>
            <TouchableOpacity style={styles.button} onPress={handleSingIn}>
                            <Text style={styles.buttonOk}>Ok</Text>
            </TouchableOpacity>
        </View>
        
        
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:"center",
      height:"100%",
      paddingTop:30,
    },
    containerForm: {
        flex: 1,
        justifyContent:'center',
        alignItems:"center",
        borderColor: 'black',
    },
    title:{
        textAlign:'center',
        fontSize:34,
        marginBottom:34,
        color:'rgba(18, 70, 255, 1)',
        fontWeight: 'bold'
    },
      titleTexto:{
        textAlign:'center',
        fontSize:20,
        marginBottom:34,
        color:'#666666',
        fontWeight: 'Inter'
    },
      button: {
        
        marginTop:"7%",
        backgroundColor:'rgba(18, 70, 255, 1)',
        width:"60%",
        height:40,
        borderRadius: 7,
        justifyContent:'center',
        alignItems:"center",
    },
    buttonOk:{
        color:'#FFF',
    },
    logoOk: {
        alignItems:"center",
        width:100,
        height:100,
        resizeMode:'contain',
      },
    containerImageEmail:{
        marginTop:"20%",
        alignItems:"center",
        height:10,
    },
    containerTextoEmail:{
        paddingTop:10,
    },
    LottieView:{
        width:150,
      }

});   

export default ChamadoMsgConfirmacao;