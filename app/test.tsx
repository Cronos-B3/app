import React, { useState, useEffect } from "react";
import Pressable from "components/ui/atoms/Pressable/Pressable";
import Text from "components/ui/atoms/Text/Text";
import { StyleSheet, View } from "react-native";
import IMAGES from 'constants/Images';
import { Image } from 'expo-image';
import { Heart } from 'assets/svg/profile/Heart';
import { Repost } from 'assets/svg/profile/Repost';
import { Share } from 'assets/svg/profile/Share';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
  const [heartColor, setHeartColor] = useState('white');

  if (__DEV__) console.log('🛍 - test');

  useEffect(() => {
    AsyncStorage.getItem('heartColor').then((color) => {
      if (color) {
        setHeartColor(color);
      }
    });
  }, []);

  const handleHeartPress = () => {
    const newColor = heartColor === 'white' ? 'red' : 'white';
    setHeartColor(newColor);
    AsyncStorage.setItem('heartColor', newColor);
  };

  return (
    <View style={te.containerTestMain}>
      <View style={te.containerTestTop}>
        <Image source={IMAGES.profileimage} style={te.profileImage} />
        <View style={te.containerInfoPost}>
          <Text style={te.testUsername}>Adele.Johnson36</Text>
          <Text style={te.testDate}>2:45:32</Text>
        </View>
        <View style={te.containerTestMore}>
          <Pressable>
            <Text style={te.testMore}>...</Text>
          </Pressable>
        </View>
      </View>
      <View style={te.containerTestMid}>
        <Text style={te.testMidPost} numberOfLines={5}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>
      <View style={te.containerTestBottom}>
        <View style={te.containerLikeRepost}>
          <Pressable onPress={handleHeartPress}>
            <Heart color={heartColor} height={25} width={25} />
          </Pressable>
          <Pressable onPress={() => console.log('⬆️ - Repost')}>
            <Repost color='white' height={25} width={25} />
          </Pressable>
        </View>
        <View style={te.containerShare}>
          <Pressable onPress={() => console.log('📤 - Share')}>
            <Share color='white' height={25} width={25} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const te = StyleSheet.create({
  containerTestMain: {
    width: '100%',
    paddingHorizontal: 10,
  },
  containerTestTop: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    height: 50,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  containerInfoPost: {
    flexDirection: 'column',
    width: '75%',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  testUsername: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  testDate: {
    fontSize: 13,
    color: 'grey',
  },
  containerTestMore: {
    width: '5%',
    alignItems: 'center',
  },
  testMore: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerTestMid: {
    width: '100%',
    padding: 10,
  },
  testMidPost: {
    fontSize: 14,
  },
  containerTestBottom: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: "95%",
  },
  containerLikeRepost: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerShare: {
    alignItems: 'center',
  },
});