import React from 'react';
import Text from 'components/ui/atoms/Text/Text';
import Pressable from 'components/ui/atoms/Pressable/Pressable';
import { View, StyleSheet} from 'react-native';
import { Image } from 'expo-image';
import IMAGES from 'constants/Images';
import { fit } from 'sharp';

export default () => {
  if (__DEV__) console.log('🏳️ - profile');

  return (
    <View style={s.container}>
      <Image source={IMAGES.profileimage} style={s.profileimage} />
      <View style={s.profilecontainer}>
        <View style={s.profilepicturecontainer}>
          <Image source={IMAGES.profilepicture} style={s.profilepicture} />
        </View>
        <View style={s.profilepictureelements}>
          <Text style={s.username}>@username</Text>
          <Text style={s.name}>Columbus.Bernier52</Text>
          <Text style={s.followers}>12.3k Followers</Text>
          <View style={s.progresslevelcontainer}>
            <View style={s.progresscontainer}>
              <View style={s.progress}></View>
            </View>
            <Text style={s.level}>lvl 3</Text>
          </View>
        </View>
      </View>
      <View style={s.buttonsfollowcontainer}>
        <Pressable style={s.buttonfollow}>
         <Text style={s.follow}>Follow</Text>
        </Pressable>
        <Pressable style={s.buttonmore}>
         <Text style={s.follow}>...</Text>
        </Pressable>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F'
  },
  profileimage: {
    width: '100%',
    height: '20%'
  },
  profilecontainer: {
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilepicturecontainer: {
    padding: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilepicture: {
    width: 120,
    height: 120
  },
  profilepictureelements: {
    padding: 10,
    flex: 1,
    height: '100%'
  },
  username: {
    fontSize: 12
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  followers: {
    fontSize: 12,
    paddingTop: 10
  },
  progresslevelcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  progresscontainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5
  },
  progress: {
    width: '90%',
    height: 5,
    backgroundColor: '#6B21C0',
    borderRadius: 5
  },
  level: {
    width: '20%',
    textAlign: 'center'
  },
  buttonsfollowcontainer: {
    height: '10%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  follow: {
    color: 'white'
  },
  buttonfollow: {
    backgroundColor: '#6B21C0',
    alignItems: 'center',
    padding: 10
  },
  buttonmore: {
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    padding: 10
  }
});
