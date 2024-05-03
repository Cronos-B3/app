import Dots from 'assets/svg/Dots';
import Heart from 'assets/svg/Heart';
import Upvote from 'assets/svg/Upvote';
import Text from 'components/atoms/BaseText/Text';
import Image from 'components/atoms/Image/Image';
import Pressable from 'components/atoms/Pressable/Pressable';
import { DEVICE } from 'constants/config';
import { gs } from 'constants/styles';
import { useTheme } from 'contexts/ThemeContext';
import { Cron } from 'hooks/store/useCronStore';
import moment from 'moment';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

interface PostProps extends Cron {
  liked?: boolean;
  upvoted?: boolean;
}

const Post = ({ user, text, end_at, liked, upvoted }: PostProps) => {
  const { colors } = useTheme();

  const momentTimeLeft = moment.duration(moment(end_at).diff(moment()));

  let stringTimeLeft = '';

  if (Math.floor(momentTimeLeft.asHours()) > 0)
    stringTimeLeft += `${Math.floor(momentTimeLeft.asHours())}:`;
  if (momentTimeLeft.minutes() > 0) stringTimeLeft += `${momentTimeLeft.minutes()}:`;
  if (momentTimeLeft.seconds() > 0) stringTimeLeft += `${momentTimeLeft.seconds()}`;

  const postTextMemo = useMemo(() => {
    return (
      <Text style={s.postText} numberOfLines={5} adjustsFontSizeToFit={false}>
        {text}
      </Text>
    );
  }, []);

  return (
    <View style={s.container}>
      <View style={s.userDataContainer}>
        <View>
          <Image style={s.profilePicture} source={user.profile_picture} />
        </View>
        <View style={s.textUserContainer}>
          <Text style={s.nickname} font="bold">
            {user.nickname}
          </Text>
          <Text>{stringTimeLeft}</Text>
        </View>
        <View style={s.moreContainer}>
          <Dots color={colors.light} height="30%" width="30%" />
        </View>
      </View>
      {postTextMemo}
      <View style={s.actionsContainer}>
        <Pressable style={s.likeContainer}>
          {liked ? (
            <Heart color={colors.error} height="55%" width="55%" focused />
          ) : (
            <Heart color={colors.light} height="55%" width="55%" />
          )}
        </Pressable>
        <Pressable style={s.upvoteContainer}>
          {upvoted ? (
            <Upvote color={colors.light} height="55%" width="55%" focused />
          ) : (
            <Upvote color={colors.light} height="55%" width="55%" />
          )}
        </Pressable>
        <Pressable style={gs.flex} />
        <Pressable style={s.shareContainer}>
          <Heart color={colors.light} height="55%" width="55%" />
        </Pressable>
      </View>
    </View>
  );
};

export default Post;

const s = StyleSheet.create({
  container: { gap: 12 },
  userDataContainer: {
    height: DEVICE.height * 0.08,
    flexDirection: 'row',
    gap: DEVICE.width * 0.033
  },
  profilePicture: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 99
  },
  textUserContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  nickname: { fontSize: 17 },
  moreContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  postText: {
    fontSize: 15,
    paddingHorizontal: '2.5%'
  },
  actionsContainer: {
    height: DEVICE.height * 0.05,
    flexDirection: 'row',
    gap: DEVICE.width * 0.025
  },
  likeContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  upvoteContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
