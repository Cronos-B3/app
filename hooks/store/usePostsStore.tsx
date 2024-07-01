import { PostType } from '@/constants/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  myPosts: PostType[];
  actionMyPosts: 'set' | 'push';
  posts: PostType[];
};

type Actions = {
  setMyPosts: (myPosts: PostType[]) => void;
  setPosts: (posts: PostType[]) => void;
  deletePost: (postId: PostType['id']) => void;
};

export default create<State & Actions>()(
  immer((set) => ({
    myPosts: [],
    actionMyPosts: 'set',
    posts: [],
    setMyPosts: (myPosts) =>
      set((state) => {
        if (state.actionMyPosts === 'set') {
          state.myPosts = myPosts;
          state.actionMyPosts = 'push';
          return;
        }
        myPosts.forEach((post) => {
          if (!state.myPosts.find((p) => p.id === post.id)) {
            state.myPosts.push(post);
          }
        });
      }),
    setPosts: (posts) =>
      set((state) => {
        state.posts = posts;
      }),
    deletePost: (postId) =>
      set((state) => {
        state.myPosts = state.myPosts.filter((post) => post.id !== postId);
        state.posts = state.posts.filter((post) => post.id !== postId);
      }),
  }))
);
