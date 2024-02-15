import React from 'react';
import Text from 'components/ui/atoms/Text/Text';
import Pressable from 'components/ui/atoms/Pressable/Pressable';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import IMAGES from 'constants/Images';
import { fit } from 'sharp';
import { ScrollView } from 'react-native';
import { Clock } from 'assets/svg/profile/Clock';
import { Cron } from 'assets/svg/profile/Cron';
import { Achievement } from 'assets/svg/profile/Achievement';
import { Heart } from 'assets/svg/profile/Heart';
import { Repost } from 'assets/svg/profile/Repost';
import { Comment } from 'assets/svg/profile/Comment';
import { Share } from 'assets/svg/profile/Share';

export default () => {
  if (__DEV__) console.log('🏳️ - profile');

  return (
    <ScrollView contentContainerStyle={s.containerprofile}>
      <Image source={IMAGES.profileimage} style={s.profileimage} />

      <View style={s.profilecontainer}>

        <View style={s.profilepicturecontainer}>
          <Image source={IMAGES.profilepicture} style={s.profilepicture} />
          <View style={s.profilepicturepourcentage}>
            <Text>
              87%
            </Text>
          </View>
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
        <View style={s.buttonfollowmore}>
          <Pressable style={s.buttonfollow}>
            <Text>Follow</Text>
          </Pressable>
          <Pressable style={s.buttonmore}>
            <Text>...</Text>
          </Pressable>
        </View>
      </View>

      <View style={s.profilebiography}>
        <Text>This is my biography : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>

      <View style={s.profilestatistics}>

        <View style={s.profilestatisticsmaintitle}>
          <Text style={s.profilestatistictstitle}>Statistics</Text>
        </View>

        <View style={s.profiletimeachievementscronscontainer}>
          <View style={s.profiletimeachievementscontainer}>
            <View style={s.profiletime}>
              <View style={s.profilestatshead}>
                <View style={s.profilestatsimg}>
                  <Clock color='white' height={30} width={30} />
                </View>
                <Text style={s.profilestatstitle}>Time</Text>
              </View>
              <View style={s.profiletimedescription}>
                <Text style={s.profiletimetext}>Avg post time : 3.14 minutes</Text>
                <Text style={s.profiletimetext}>Time spent on app : 17 days</Text>
              </View>
            </View>

            <View style={s.profileachievements}>
              <View style={s.profilestatshead}>
                <View style={s.profilestatsimg}>
                  <Achievement color='white' height={30} width={30} />
                </View>
                <Text style={s.profilestatstitle}>Achievements</Text>
              </View>
              <ScrollView horizontal={true} contentContainerStyle={s.profileachievementslistcontainer}>
                <View style={s.profileachievementslist}>
                  <Image source={IMAGES.profilecroneur} style={s.profileachievementsimg} />
                  <Text style={s.profileachievementstitle}>Croneur</Text>
                </View>
                <View style={s.profileachievementslist}>
                  <Image source={IMAGES.profileconnected} style={s.profileachievementsimg} />
                  <Text style={s.profileachievementstitle}>Connected</Text>
                </View>
                <View style={s.profileachievementslist}>
                  <Image source={IMAGES.profilevision} style={s.profileachievementsimg} />
                  <Text style={s.profileachievementstitle}>Vision</Text>
                </View>
                <View style={s.profileachievementslist}>
                  <Image source={IMAGES.profilevision} style={s.profileachievementsimg} />
                  <Text style={s.profileachievementstitle}>Vision</Text>
                </View>
                <View style={s.profileachievementslist}>
                  <Image source={IMAGES.profilevision} style={s.profileachievementsimg} />
                  <Text style={s.profileachievementstitle}>Vision</Text>
                </View>
              </ScrollView>
            </View>
          </View>

          <View style={s.profilecrons}>
            <View style={s.profilestatsheadcrons}>
              <View style={s.profilestatsimg}>
                <Cron color='white' height={30} width={30} />
              </View>
              <Text style={s.profilecronstitle}>Crons</Text>
            </View>
            <View style={s.profilecronsdescription}>
              <View style={s.profilecronslist}>
                <Heart color='white' height={20} width={20} />
                <Text style={s.profilecronstext}>13M</Text>
              </View>
              <View style={s.profilecronslist}>
                <Repost color='white' height={20} width={20} />
                <Text style={s.profilecronstext}>233k</Text>
              </View>
              <View style={s.profilecronslist}>
                <Comment color='white' height={20} width={20} />
                <Text style={s.profilecronstext}>1.7k</Text>
              </View>
              <View style={s.profilecronslist}>
                <Share color='white' height={20} width={20} />
                <Text style={s.profilecronstext}>10k</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={s.profilepostsmaintitle}>
        <Text style={s.profilepoststitle}>Posts</Text>
        <Text style={s.profilepostslisttitle}>No post found</Text>
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  containerprofile: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  profileimage: {
    width: '100%',
    height: '20%'
  },
  profilecontainer: {
    height: '17%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  profilepicturecontainer: {
    padding: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%'
  },
  profilepicture: {
    width: 120,
    height: 120
  },
  profilepicturepourcentage: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#6B21C0',
    padding: 5,
    borderRadius: 50
  },
  profilepictureelements: {
    padding: 10,
    height: '100%',
    width: '60%'
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
    height: '8%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonfollowmore: {
    position: 'absolute',
    right: 0,
    flex: 1,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-around'
  },
  buttonfollow: {
    backgroundColor: '#9F62E4',
    alignItems: 'center',
    padding: 10,
    width: '40%',
    borderRadius: 12
  },
  buttonmore: {
    backgroundColor: '#9F62E4',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    width: '20%'
  },
  profilebiography: {
    padding: 10,
  },
  profilestatistics: {
    height: '35%',
    width: '100%',
    flexDirection: 'column',
  },
  profilestatisticsmaintitle: {
    width: '100%',
    paddingLeft: 10,
    paddingBottom: 5,
  },
  profilestatistictstitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profiletimeachievementscronscontainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  profiletimeachievementscontainer: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    gap: 10,
  },
  profiletime: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#1E1E1E',
    padding: 5,
  },
  profilestatstitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  profiletimedescription: {
    padding: 5,
  },
  profiletimetext: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  profilestatshead: {
    height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profilestatsimg: {
    padding: 5,
    borderWidth: 1,
    backgroundColor: '#9F62E4',
    borderRadius: 12,
  },
  profileachievements: {
    backgroundColor: '#1E1E1E',
    height: '50%',
    borderRadius: 10,
    flex: 1,
    padding: 5,
  },
  profileachievementslistcontainer: {
    flexDirection: 'row',
    padding: 5,
    gap: 15,
  },
  profileachievementstitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileachievementslist: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileachievementsimg: {
    width: 30,
    height: 30,
  },
  profilestatsheadcrons: {
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profilecronstitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  profilecrons: {
    height: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    flex: 1,
    padding: 5,
  },
  profilecronsdescription: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '80%',
    padding: 10,
  },
  profilecronslist: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profilecronstext: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  profilepostsmaintitle: {
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  profilepoststitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profilepostslisttitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
