import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  nome: yup.string().required("Informe Seu Nome"),
  email: yup.string().required("Informe Seu Email"),
  usuario: yup.string().required("Informe Seu Nome De Usuário"),
  senha: yup.string().required("Informe Sua Senha"),
  confirmasenha: yup.string().required("Repita Sua Senha"),
});

const ListaChamados = () => {
  
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSingIn(data) {
    console.log("Entrou");
    console.log(data);
    navigation.reset({
      index: 2,
      routes: [{ name: "Home" }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Adicionar Novo Usuário</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleSingIn)}
        >
          <Text style={styles.titleInputRegistrar}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  imageBackground: {
    flex: 3,
    resizeMode: "cover",
    width: "100%",
  },
  title: {
    fontSize: 34,
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
  titleInput: {
    color: "rgba(18, 70, 255, 1)",
    fontSize: 16,
  },
  Text: {
    marginTop: "7%",
    color: "#121212",
  },
  button: {
    marginTop: "7%",
    backgroundColor: "rgba(18, 70, 255, 1)",
    width: "60%",
    height: 40,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
  titleInputRegistrar: {
    color: "#FFF",
  },
});

export default ListaChamados;