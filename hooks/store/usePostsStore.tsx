import { PostType } from '@/constants/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  myPosts: PostType[];
  actionMyPosts: 'set' | 'push';
  lastMyPostId?: PostType['id'];
  posts: PostType[];
  lastPostId?: PostType['id'];
};

type Actions = {
  setMyPosts: (myPosts: PostType[]) => void;
  setPosts: (posts: PostType[]) => void;
  addPostsToBottom: (posts: PostType[]) => void;
  deletePost: (postId: PostType['id']) => void;
};

export default create<State & Actions>()(
  immer((set) => ({
    myPosts: [],
    actionMyPosts: 'set',
    posts: [],
    setMyPosts: (myPosts) =>
      set((state) => {
        if (myPosts.length === 0) return;
        state.lastMyPostId = myPosts[myPosts.length - 1]?.id;
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
        if (posts.length === 0) return;
        state.lastPostId = posts[posts.length - 1]?.id;
        state.posts = posts;
      }),
    addPostsToBottom: (posts) =>
      set((state) => {
        if (posts.length === 0) return;
        state.lastPostId = posts[posts.length - 1]?.id;
        posts.forEach((post) => {
          if (!state.posts.find((p) => p.id === post.id)) {
            state.posts.push(post);
          }
        });
      }),
    deletePost: (postId) =>
      set((state) => {
        state.myPosts = state.myPosts.filter((post) => post.id !== postId);
        state.posts = state.posts.filter((post) => post.id !== postId);
      }),
  }))
);
