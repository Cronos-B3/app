import React, {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useMemo,
} from "react";
import {
  View,
  StyleSheet,
  TextInputProps,
  TextProps,
  ViewProps,
  TextInput as TextInputRN,
} from "react-native";
import Text from "components/ui/atoms/Text/Text";
import TextInput from "components/ui/atoms/TextInput/TextInput";

type CustomProps = {
  style?: ViewProps["style"];
  label?: string | ReactNode;
  labelStyle?: TextProps["style"];
  inputStyle?: ViewProps["style"];
  textInputStyle?: TextProps["style"];
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type InputProps = TextInputProps & CustomProps;

const Input: ForwardRefRenderFunction<TextInputRN, InputProps> = (
  {
    style = { flex: 1 },
    label,
    labelStyle,
    inputStyle = { flex: 1 },
    textInputStyle,
    leftIcon,
    rightIcon,
    ...rest
  },
  ref
) => {
  const memoizedLabel = useMemo(() => {
    return (
      <>
        {typeof label === "string" ? (
          <Text ellipsizeMode="tail" numberOfLines={1} style={labelStyle}>
            {label}
          </Text>
        ) : (
          label
        )}
      </>
    );
  }, [label, labelStyle]);

  return (
    <View style={style}>
      {memoizedLabel}
      <View style={[inputStyle, s.inputContainer]}>
        {leftIcon}
        <TextInput {...rest} style={[s.input, textInputStyle]} ref={ref} />
        {rightIcon}
      </View>
    </View>
  );
};

export default forwardRef(Input);

const s = StyleSheet.create({
  inputContainer: { flex: 1, flexDirection: "row" },
  input: {
    flex: 1,
    paddingLeft: "1%",
  },
});
