import { useEffect, useRef, RefObject, useState } from 'react';
import { Animated, Keyboard, Platform, TextInput } from 'react-native';
import { DEVICE } from 'constants/Config';

const avoidKeyboard = (numInputs: number = 3) => {
  // use an array of refs
  const refs: RefObject<TextInput>[] = useRef(
    [...Array(numInputs)].map(() => useRef<TextInput>(null))
  ).current;

  // value of the offset to use in an Animated View
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // animation for the AnimatedView
  const startAnimation = (toValue: number) => {
    Animated.timing(keyboardOffset, {
      toValue,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  // put a temporary listener on the focused input => should update when the focus change (fn for that?)
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
      refs.forEach((ref) => {
        if (ref?.current?.isFocused()) {
          ref.current.measure((x, y, width, height, pageX, pageY) => {
            const bottom = DEVICE.height - pageY - height;
            if (bottom < e.endCoordinates.height) {
              startAnimation(-(e.endCoordinates.height - bottom + 10));
            }
          });
        }
      });
    });

    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
      startAnimation(0);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  // ???
  const refProps = refs.reduce((acc, ref, index) => {
    acc[`ref${index + 1}`] = ref;
    return acc;
  }, {} as Record<string, RefObject<TextInput>>);

  return { ...refProps, keyboardOffset };
};

export default avoidKeyboard;
