import React from "react";
import Text from "components/ui/atoms/Text/Text";
import { View, StyleSheet, ViewProps } from "react-native";
import Pressable from "components/ui/atoms/Pressable/Pressable";
import AppVersion from "components/ui/molecules/AppVersion/AppVersion";
import { useTranslate } from "contexts/TranslateContext";

const AuthBottomInfos = ({ style, ...rest }: ViewProps) => {
  if (__DEV__) console.log("🐙 - AuthBottomInfos");

  const { text } = useTranslate();

  return (
    <View style={[s.container, style]} {...rest}>
      <AppVersion />
      <Pressable style={s.conditionsContainer}>
        <Text style={s.textConditions}>{text.policy.privacy}</Text>
        <Text style={s.textConditions}>{text.policy.usage}</Text>
      </Pressable>
    </View>
  );
};

export default AuthBottomInfos;

const s = StyleSheet.create({
  container: {
    alignItems: "center",
    opacity: 0.6,
  },
  conditionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  textConditions: {
    marginHorizontal: 4,
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
