import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import LottieView from "lottie-react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Loading from "../../components/loading";

const schema = yup.object({
  email: yup
    .string()
    .email("O campo deve ter um Email Valido.")
    .required("Informe Seu Email Cadastrado"),
});

const Recuperar = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  function recoverPassword(email) {
    console.log("Recuperar Senha");
    console.log(email);
    setLoading(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email.email)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        navigation.navigate("SenhaRecuperada");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);

        if (errorCode == "auth/user-not-found") {
          alert("Usuario Não existe");
          return;
        }
        if (errorCode == "auth/invalid-email") {
          alert("Digite um Email válido");
          return;
        }

        console.error(errorMessage, errorCode);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Loading loading={loading} />
        <View style={styles.containerForm}>
          <Text style={styles.title}>Recuperar Senha</Text>
          <View>
            <LottieView
              style={styles.LottieView}
              source={require("../../assets/imagens/data-security.json")}
              loop
              autoPlay
            />
          </View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.email && 1,
                    borderColor: errors.email && "#ff375b",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur} //chamado quando o textinput é tocado.
                value={value}
                keyboardType="email-address"
                placeholder="Digite Seu Email Cadastrado"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.labelError}>{errors.email?.message}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(recoverPassword)}
          >
            <Text style={styles.buttonRecuperar}>Enviar</Text>
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
  },
  imageBackground: {
    flex: 3,
    resizeMode: "cover",
    width: "100%",
  },
  title: {
    fontSize: 34,
    marginBottom: 30,
    marginTop: 30,
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
  buttonRecuperar: {
    color: "#FFF",
  },
  LottieView: {
    width: 150,
  },
});

export default Recuperar;
