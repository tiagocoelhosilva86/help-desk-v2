import { collection, getDocs } from "firebase/firestore";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Loading from "../../components/loading";
import { db } from "../../firebaseConfig";

const RelatorioChamados = () => {
  const [loading, setLoading] = useState(false);
  const [listaChamadosAbertos, setListaChamadosAbertos] = useState(0);

  useEffect(() => {
    getChamados();
  }, []);

  async function getChamados() {
    setLoading(true);
    console.log("lista de quantidade de chamados ");
    const querySnapshot = await getDocs(collection(db, "chamados"));
    const quantidade = querySnapshot.size;

    setLoading(false);
    setListaChamadosAbertos(quantidade);
    console.log(quantidade);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Loading loading={loading} />
        <View style={styles.containerTexto}>
          <Text style={styles.title}>Relatorio de Chamados</Text>
        </View>

        <View style={styles.containerCards}>
          <View style={styles.card}>
            <View>
              <LottieView
                style={styles.LottieView}
                source={require("../../assets/imagens/99115-help-blue.json")}
                loop
                autoPlay
              />
            </View>
            <Text style={styles.textoCard}>Total de Chamados Abertos</Text>
            <Text style={styles.textoCard}>Total: {listaChamadosAbertos}</Text>
          </View>

          <View style={styles.card}>
            <View>
              <LottieView
                style={styles.LottieView}
                source={require("../../assets/imagens/customerservice.json")}
                loop
                autoPlay
              />
            </View>
            <Text style={styles.textoCard}>Chamados Em Atendimento</Text>
            <Text style={styles.textoCard}>Total: 12</Text>
          </View>

          <View style={styles.card}>
            <View>
              <LottieView
                style={styles.LottieView}
                source={require("../../assets/imagens/waiting.json")}
                loop
                autoPlay
              />
            </View>
            <Text style={styles.textoCard}>Chamados em Espera</Text>
            <Text style={styles.textoCard}>Total: 22</Text>
          </View>

          <View style={styles.card}>
            <View>
              <LottieView
                style={styles.LottieViewSuporte}
                source={require("../../assets/imagens/support.json")}
                loop
                autoPlay
              />
            </View>
            <Text style={styles.textoCard}>Chamados Encerrados</Text>
            <Text style={styles.textoCard}>Total: 45</Text>
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
    height: "100%",
    paddingTop: 30,
  },

  title: {
    marginTop: 10,
    fontSize: 24,
    marginBottom: 34,
    color: "rgba(18, 70, 255, 1)",
    fontWeight: "bold",
  },
  containerTexto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  },
  containerCards: {
    flexDirection: "column",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    height: 210,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 10.68,
    elevation: 16,
  },
  textoCard: {
    fontWeight: "bold",
    fontSize: 19,
    marginTop: 8,
  },
  LottieView: {
    width: 180,
  },
  LottieViewSuporte: {
    width: 125,
  },
});

export default RelatorioChamados;
