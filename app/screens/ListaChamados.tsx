import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Loading from "../../components/loading";
import { db } from "../../firebaseConfig";

declare type Chamado = {
  id: string;
  local: string;
  usuario: string;
  titulo: string;
  descricao: string;
  dataAbertura: string;
  hora: string;
  url?: string;
};

const ListaChamados = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [listaChamadosAbertos, setListaChamadosAbertos] = useState(
    Array<Chamado>()
  );

  useEffect(() => {
    getChamados();
  }, []);

  async function getChamados() {
    setLoading(true);
    console.log("recuperando chamados");
    const querySnapshot = await getDocs(collection(db, "chamados"));
    const lista: Array<Chamado> = Array<Chamado>();
    querySnapshot.forEach((doc) => {
      const dados = doc.data();
      const chamadosAbertos = {
        id: doc.id,
        local: dados.data.local,
        usuario: dados.data.usuario,
        titulo: dados.data.titulo,
        descricao: dados.data.descricao,
        dataAbertura: dados.dataAbertura,
        hora: dados.hora,
        url: dados.url ?? null,
      };

      lista.push(chamadosAbertos);
    });
    setLoading(false);
    setListaChamadosAbertos(lista);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Loading loading={loading} />
        <View style={styles.containerForm}>
          <Text style={styles.title}> Lista de Chamados</Text>
        </View>
        {listaChamadosAbertos.map((chamado) => (
          <View style={styles.item} key={chamado.id}>
            <View style={styles.itemChamados}>
              <Text style={styles.textoTituloLista}> Solicitante </Text>
              <Text style={styles.textoPrioridades}>{chamado.usuario}</Text>
              <View>
                <LottieView
                  style={styles.LottieView}
                  source={require("../../assets/imagens/customerservice.json")}
                  loop
                  autoPlay
                />
              </View>
              <View style={styles.containerPrioridades}>
                <Text style={styles.textoPrioridades}>
                  Local: {chamado.local}
                </Text>
                <Text style={styles.textoPrioridades}>
                  Titulo: {chamado.titulo}
                </Text>
                <Text style={styles.textoPrioridades}>
                  Data de Abertura: {chamado.dataAbertura}
                </Text>
                <Text style={styles.textoPrioridades}>
                  Descrição: {chamado.descricao}
                </Text>
                {chamado.url ? (
                  <View>
                    <Image
                      source={{ uri: chamado.url }}
                      style={{ width: 200, height: 200 }}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    marginBottom: 34,
    color: "rgba(18, 70, 255, 1)",
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    flexDirection: "row-reverse",
    justifyContent: "center",
    marginBottom: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 10.68,
    elevation: 16,
  },
  itemChamados: {
    alignItems: "center",
    marginTop: 10,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  quadradoVermelho: {
    width: "40%",
    backgroundColor: "#ff0000",
    opacity: 0.9,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  quadradoVermelhoChamado: {
    width: "auto",
    backgroundColor: "#ff0000",
    opacity: 0.9,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  quadradoLaranja: {
    width: "40%",
    backgroundColor: "#f7ff00",
    opacity: 0.9,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  quadradoVerde: {
    backgroundColor: "#00ff00",
    opacity: 0.9,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  containerPrioridade: {
    flexDirection: "row",
    marginBottom: 3,
  },

  containerPrioridades: {
    flexDirection: "column",
  },

  textoPrioridades: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 3,
  },

  textoTitulo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  textoTituloLista: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
    color: "rgba(18, 70, 255, 1)",
    fontWeight: "bold",
  },
  ImageIconStyle: {
    marginRight: 6,
    height: 30,
    width: 30,
  },

  containerForm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  },
  LottieView: {
    width: 180,
  },
});

export default ListaChamados;
