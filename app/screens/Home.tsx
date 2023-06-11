import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const navigation = useNavigation();

  const handleAbrirChamado = (data) => {
    console.log("Entrou");
    console.log(data);
    navigation.navigate("AbrirChamado");
  };

  const handleListaChamados = () => {
    console.log("Entrou lista de chamados");
    // console.log(getChamados())
    navigation.navigate("ListaChamados");
  };

  const handleRelatorioChamados = (data) => {
    console.log("Entrou");
    console.log(data);

    navigation.navigate("RelatorioChamados");
  };

  const handleAdicionarUsuario = (data) => {
    console.log("Entrou");
    console.log(data);

    navigation.navigate("AdicionarUsuario");
  };

  const handleConfiguracao = (data) => {
    console.log("Entrou");
    console.log(data);
    navigation.navigate("Informacao");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerMenu}>
          <TouchableOpacity style={styles.butom} onPress={handleAbrirChamado}>
            <LottieView
              style={styles.LottieViewServico}
              source={require("../../assets/imagens/customerservice.json")}
              loop
              autoPlay
            />
            <Text style={styles.textoIcon}>Abrir Chamado</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerMenu}>
          <TouchableOpacity style={styles.butom} onPress={handleListaChamados}>
            <LottieView
              style={styles.LottieView}
              source={require("../../assets/imagens/listmanual.json")}
              loop
              autoPlay
            />
            <Text style={styles.textoIcon}>Lista de Chamados</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerMenu}>
          <TouchableOpacity
            style={styles.butom}
            onPress={handleRelatorioChamados}
          >
            <LottieView
              style={styles.LottieView}
              source={require("../../assets/imagens/analyst.json")}
              loop
              autoPlay
            />
            <Text style={styles.textoIcon}>Relatorio de Chamados</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerMenu}>
          <TouchableOpacity style={styles.butom} onPress={handleConfiguracao}>
            <LottieView
              style={styles.LottieView}
              source={require("../../assets/imagens/information.json")}
              loop
              autoPlay
            />
            <Text style={styles.textoIcon}>Informação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    paddingTop: 30,
  },
  containerMenu: {
    padding: 15,
  },
  logo: {
    width: 70,
    height: 100,
    resizeMode: "contain",
    flex: 1,
    backgroundColor: "#e9e9e9",
  },
  containerMenuTexto: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  textoIcon: {
    fontSize: 18,
    marginRight: 1,
    marginLeft: 20,
  },
  containerTextoIcon: {
    backgroundColor: "#e9e9e9",
    flex: 1,
    justifyContent: "center",
  },
  butom: {
    backgroundColor: "#e9e9e9",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  buttonImageIconStyle: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  LottieView: {
    width: 110,
  },
  LottieViewServico: {
    width: 150,
  },
});

export default Home;
