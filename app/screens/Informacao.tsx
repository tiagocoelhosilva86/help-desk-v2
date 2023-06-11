import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Informacao = () => {
  const navigation = useNavigation();

  const handleAbrirChamado = () => {};

  return (
    <View style={styles.container}>
      <ScrollView>
        
        <View>
            <Image
              source={require("../../assets/imagens/icon.png")}
              style={styles.logo}
            />
            <View style={styles.containerTexto}>
                <Text style={styles.textoIcon}>Verção do APP v 1.0.1</Text>
            </View>
            
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    height: "100%",
    paddingTop: 100,
    backgroundColor:"#FFFFFF",
  },

  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    backgroundColor: "#e9e9e9",
  },
  containerTexto: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  textoIcon: {
    fontSize: 18,
    marginRight: 1,
  },
  
});

export default Informacao;
