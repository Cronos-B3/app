import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default () => {
  if (__DEV__) console.log("🏳️ - index");

  return (
    <View style={s.container}>
      <Text style={s.text}>Page index</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
});
