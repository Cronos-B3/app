import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Heart } from 'assets/svg/profile/Heart';
import { Repost } from 'assets/svg/profile/Repost';
import { Share } from 'assets/svg/profile/Share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from 'components/atoms/BaseText/Text';
import Pressable from 'components/atoms/Pressable/Pressable';

const Post = ({ username, date, description, imageUrl, postId }) => {
  const [heartColor, setHeartColor] = useState('white');
  const [repostColor, setRepostColor] = useState('white');
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);

  useEffect(() => {
    AsyncStorage.multiGet([`heartColor_${postId}`, `repostColor_${postId}`]).then((values) => {
      if (values) {
        setHeartColor(values[0][1] || 'white');
        setRepostColor(values[1][1] || 'white');
        setIsLiked(values[0][1] === 'red');
        setIsReposted(values[1][1] === 'green');
      }
    });
  }, []);

  const handleHeartPress = () => {
    const newColor = isLiked ? 'white' : 'red';
    setHeartColor(newColor);
    setIsLiked(!isLiked);
    AsyncStorage.setItem(`heartColor_${postId}`, newColor);
  };

  const handleRepostPress = () => {
    const newColor = isReposted ? 'white' : 'green';
    setRepostColor(newColor);
    setIsReposted(!isReposted);
    AsyncStorage.setItem(`repostColor_${postId}`, newColor);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={imageUrl} style={styles.profileImage} />
        <View style={styles.postInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.moreContainer}>
          <Pressable>
            <Text style={styles.more}>...</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.likeRepostContainer}>
          <Pressable onPress={handleHeartPress}>
            <Heart color={heartColor} height={25} width={25} />
          </Pressable>
          <Pressable onPress={handleRepostPress}>
            <Repost color={repostColor} height={25} width={25} />
          </Pressable>
        </View>
        <View style={styles.shareContainer}>
          <Pressable onPress={() => console.log('📤 - Share')}>
            <Share color="white" height={25} width={25} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10
  },
  topContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 50
  },
  postInfo: {
    flexDirection: 'column',
    width: '75%',
    paddingLeft: 10,
    justifyContent: 'center'
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 13,
    color: 'grey'
  },
  moreContainer: {
    width: '5%',
    alignItems: 'center'
  },
  more: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  middleContainer: {
    width: '100%',
    padding: 10
  },
  description: {
    fontSize: 14
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '95%'
  },
  likeRepostContainer: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shareContainer: {
    alignItems: 'center'
  }
});
