import { Cron } from 'hooks/store/useCronStore';

type CronDBType = {
  user: {
    u_username: string;
    u_nickname: string;
    u_profile_picture: string;
  };
  c_id: string;
  c_text: string;
  c_end_at: string;
};

export const convertCrons = (crons: CronDBType[]): Cron[] => {
  return crons.map((cron) => convertCron(cron));
};

const convertCron = (dbCron: CronDBType): Cron => {
  const cron = {
    user: {
      username: dbCron.user.u_username,
      nickname: dbCron.user.u_nickname,
      profile_picture: dbCron.user.u_profile_picture
    },
    id: dbCron.c_id,
    text: dbCron.c_text,
    end_at: dbCron.c_end_at
  } as Cron;

  return cron;
};

export default convertCron;
