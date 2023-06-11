import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loading from "../../components/loading";
import { useNavigation } from "@react-navigation/native";
import LottieView from  "lottie-react-native";

const schema = yup.object({
  email: yup
    .string()
    .email("O campo deve ter um Email Valido.")
    .required("O campo Email é obrigatório."),
  senha: yup
    .string()
    .min(6, "Password minimum 6 characters")
    .required("O campo Senha é obrigatório."),
});

type loginData = {
  email: string;
  senha: string;
};

const Login = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  function handleSingIn(data: loginData) {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.senha)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log("logou");
        console.log(data);
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);

        if (errorCode == "auth/user-not-found") {
          alert("Usuario Não existe");
          return;
        }if (errorCode == "auth/wrong-password") {
          alert("Senha Incorreta");
          return;
        }
        console.error(errorMessage, errorCode);
      });
  }

  function handlePrimeiroAcesso() {
    console.log("Cadastrar Usuario");

    navigation.navigate("Cadastro");
  }

  function handleEsqueceuSuaSenha() {
    console.log("Esqueceu Sua Senha");

    navigation.navigate("RecuperarSenha");
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Loading loading={loading} />
        <View style={styles.containerForm}>
          <View>
          <LottieView style={styles.LottieView} source={require("../../assets/imagens/helpdesk-blue.json")} loop autoPlay />
            {/* <Image
              source={require("../../assets/imagens/helpDesk.png")}
              style={styles.logo}
            /> */}
          </View>
          <Controller
            control={control}
            name="email"
            type="email"
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
                keyboardType="name-phone-pad"
                placeholder="Digite seu Email"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.labelError}>{errors.email?.message}</Text>
          )}

          <Controller
            control={control}
            name="senha"
            type="number"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.senha && 1,
                    borderColor: errors.senha && "#ff375b",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur} //chamado quando o textinput é tocado.
                value={value}
                placeholder="Digite Sua Senha"
                keyboardType="numeric"
                secureTextEntry={true}
              />
            )}
          />
          {errors.senha && (
            <Text style={styles.labelError}>{errors.senha?.message}</Text>
          )}

          <TouchableOpacity
            style={styles.buttonEsqueceuSuaSenha}
            onPress={handlePrimeiroAcesso}
          >
            <Text style={styles.titleInput}>Primeiro Acesso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonPrimeiroAcesso}
            onPress={handleEsqueceuSuaSenha}
          >
            <Text style={styles.titleInput}>Esqueceu a Senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleSingIn)}
          >
            <Text style={styles.titleInputEnviar}>Enviar</Text>
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
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
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
    fontSize: 18,
  },
  buttonPrimeiroAcesso: {
    marginTop: "7%",
  },
  buttonEsqueceuSuaSenha: {
    marginTop: "7%",
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
  titleInputEnviar: {
    color: "#FFF",
  },
  LottieView:{
    width:280,
  }
});

export default Login;
