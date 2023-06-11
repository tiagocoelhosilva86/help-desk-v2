import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Loading from "../../components/loading";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerResult } from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import LottieView from "lottie-react-native";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { db } from "../../firebaseConfig";

const schema = yup.object({
  local: yup.string().required("Informe o Local para o Atendimento"),
  titulo: yup.string().required("Informe o Titulo do Chamado"),
  usuario: yup.string().required("Informe seu Nome Completo"),
  descricao: yup.string().required("Descrição"),
});

// if (!getApps().length) {
//   initializeApp(firebaseConfig);
// }

type RegistroData = {
  local: string;
  titulo: string;
  descricao: string;
  usuario: string;
  dataAbertura: string;
};

const AbrirChamado = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [imagemChamado, setimagemChamado] = useState({} as Blob);

  const modalVisivel = () => {
    setModalVisible(!modalVisible);
  };

  const [loading, setLoading] = useState(false);

  async function handleAbrirChamado(data: SubmitHandler<FieldValues>) {
    const novaData = new Date();
    const horas = novaData.getHours();
    const minutos = novaData.getMinutes();
    const dataAbertura = novaData.toLocaleDateString("pt-BR");
    const hora = new Date().toLocaleTimeString();
    setLoading(true);
    let url;
    try {
      const storageRef = ref(getStorage(), `Chamados/image-${Date.now}`);
      await uploadBytes(storageRef, imagemChamado);
      url = await getDownloadURL(storageRef);
    } catch (error) {
      alert(`Error : ${error}`);
    }
    //salvando os dados
    addDoc(collection(db, "chamados"), {
      data,
      dataAbertura,
      hora,
      url,
    })
      .then((dados) => {
        console.log(dados.id);

        setLoading(false);
        setModalVisible(true);
        console.log("documento enviado");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(
      "Dia " + dataAbertura + " Hora " + horas + ":" + minutos + "h."
    );

    console.log(data);
  }

  function handleHome() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  }

  const [image, setImage] = useState<string>();

  const escolherImagemDaGaleria = async () => {
    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })) as ImagePickerResult;

    console.log(result);

    setImage(result.assets ? result.assets[0].uri : undefined);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImageAsync(result.assets[0].uri);
      setInterval(() => {
        setLoading(false);
      }, 2000);
    } else {
      setImage(undefined);
      setInterval(() => {}, 2000);
    }
  };

  const uploadImageAsync = async (uri: string) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        setimagemChamado(xhr.response as Blob);
        setImage(xhr.response);

        resolve(xhr.response as Blob);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("A solicitação de rede falhou"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Loading loading={loading} />

        <View style={styles.containerForm}>
          <Text style={styles.title}> Formulario</Text>

          <View style={styles.texto}>
            <Text style={styles.tituloImput}>Local do Atendimento</Text>
          </View>

          <Controller
            control={control}
            name="local"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.local && 1,
                    borderColor: errors.local && "#ff375b",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur} //chamado quando o textinput é tocado.
                value={value}
                placeholder="Informe o Local Para o Atendimento"
              />
            )}
          />
          {errors.local && (
            <Text style={styles.labelError}>
              {errors.local.message as string}
            </Text>
          )}

          <View style={styles.texto}>
            <Text style={styles.tituloImput}>Nome</Text>
          </View>

          <Controller
            control={control}
            name="usuario"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.usuario && 1,
                    borderColor: errors.usuario && "#ff375b",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur} //chamado quando o textinput é tocado.
                value={value}
                placeholder="Informe Seu Nome Completo"
              />
            )}
          />
          {errors.usuario && (
            <Text style={styles.labelError}>
              {(errors.usuario.message as string) ?? ""}
            </Text>
          )}

          <View style={styles.textoInput}>
            <Text style={styles.tituloImput}>Titulo</Text>
          </View>

          <Controller
            control={control}
            name="titulo"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.titulo && 1,
                    borderColor: errors.titulo && "#ff375b",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur} //chamado quando o textinput é tocado.
                value={value}
                placeholder="Digite o Titulo do chamado"
              />
            )}
          />
          {errors.titulo && (
            <Text style={styles.labelError}>
              {errors.titulo.message as string}
            </Text>
          )}

          <View style={styles.textoInput}>
            <Text style={styles.tituloImput}>Descrição Do Problema</Text>
          </View>

          <Controller
            control={control}
            name="descricao"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.textDescricao,
                  {
                    borderWidth: errors.descricao && 1,
                    borderColor: errors.descricao && "#ff375b",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur} //chamado quando o textinput é tocado.
                value={value}
                editable
                multiline
                numberOfLines={4}
                maxLength={250}
                placeholder="Descreva em curtas palavras o Chamado"
              />
            )}
          />
          {errors.descricao && (
            <Text style={styles.labelError}>
              {errors.descricao.message as string}
            </Text>
          )}

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
          >
            <View style={{ padding: 10 }}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              ) : null}
            </View>

            <View>
              <TouchableOpacity onPress={escolherImagemDaGaleria}>
                <LottieView
                  style={styles.uploadIcon}
                  source={require("../../assets/imagens/uploading.json")}
                  loop
                  autoPlay
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Chamado Realizado com Sucesso !");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Chamado Realizado com Sucesso!
                  </Text>
                  <TouchableOpacity  onPress={handleHome}>
                    <LottieView
                      style={styles.LottieView}
                      source={require("../../assets/imagens/confirmation")}
                      loop
                      autoPlay
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <Pressable
            style={styles.button}
            //  onPress={modalVisivel}>
            onPress={handleSubmit(handleAbrirChamado)}
          >
            <Text style={styles.titleInputRegistrar}>Abrir Chamado</Text>
          </Pressable>
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
  },
  tituloImput: {
    fontSize: 15,
    color: "rgba(18, 70, 255, 1)",
    fontWeight: "bold",
    paddingLeft: "5%",
    paddingTop: "5%",
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    marginBottom: 34,
    color: "rgba(18, 70, 255, 1)",
    fontWeight: "bold",
  },
  containerForm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  },
  multiSelect: {
    paddingHorizontal: 8,
    width: "95%",
  },
  input: {
    width: "90%",
    height: 40,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 12,
    color: "#121212",
    margin: "5%",
  },
  textDescricao: {
    width: "90%",
    height: 100,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 12,
    color: "#121212",
    margin: "5%",
  },
  titleInput: {
    color: "rgba(18, 70, 255, 1)",
    fontSize: 16,
  },
  texto: {
    width: "100%",
    padding: 7,
  },
  textoInput: {
    width: "100%",
    paddingLeft: 5,
  },
  button: {
    marginTop: "7%",
    backgroundColor: "rgba(18, 70, 255, 1)",
    width: "60%",
    height: 40,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    margin: 9,
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
  titleInputRegistrar: {
    color: "#FFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    height: 40,
    borderRadius: 7,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  logoOk: {
    alignItems: "center",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  cameraIcon: {
    width: 100,
  },
  uploadIcon: {
    width: 100,
  },
  LottieView: {
    width: 150,
  },
});

export default AbrirChamado;
