import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

type LoadingProps = {
  loading: boolean;
  textContent?: string;
};

const Loading = (props: LoadingProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={props.loading}
          //Text with the Spinner
          textContent={props.textContent ?? "Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default Loading;
