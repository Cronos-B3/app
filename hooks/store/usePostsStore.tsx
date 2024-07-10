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
  addPostToTop: (posts: PostType) => void;
  addPostsToBottom: (posts: PostType[]) => void;
  deletePost: (postId: PostType['id']) => void;
  likePost: (postId: PostType['id']) => void;
  upVotePost: (postId: PostType['id']) => void;
};

export default create<State & Actions>()(
  immer((set) => ({
    myPosts: [],
    actionMyPosts: 'set',
    posts: [],
    setMyPosts: (myPosts) => {
      // Check if myPosts is an array
      set((state) => {
        if (myPosts.length === 0) return;
        state.lastMyPostId = myPosts[myPosts.length - 1]?.id;
        if (state.actionMyPosts === 'set') {
          state.myPosts = myPosts;
          state.actionMyPosts = 'push';
        } else {
          myPosts.forEach((post) => {
            if (!state.myPosts.find((p) => p.id === post.id)) {
              state.myPosts.push(post);
            }
          });
        }
      });
    },
    setPosts: (posts) => {
      set((state) => {
        if (posts.length === 0) return;
        state.lastPostId = posts[posts.length - 1]?.id;
        state.posts = posts;
      });
    },
    addPostToTop: (posts) => {
      set((state) => {
        state.posts = [posts, ...state.posts];
      });
    },
    addPostsToBottom: (posts) => {
      set((state) => {
        if (posts.length === 0) return;
        state.lastPostId = posts[posts.length - 1]?.id;
        posts.forEach((post) => {
          if (!state.posts.find((p) => p.id === post.id)) {
            state.posts.push(post);
          }
        });
      });
    },
    deletePost: (postId) => {
      set((state) => {
        state.myPosts = state.myPosts.filter((post) => post.id !== postId);
        state.posts = state.posts.filter((post) => post.id !== postId);
      });
    },
    likePost: (postId) => {
      set((state) => {
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          if (post.isLiked) {
            post.likes -= 1; // Remove like if already liked
          } else {
            post.likes += 1; // Add like if not already liked
          }
          post.isLiked = !post.isLiked; // Toggle the like state
        }
      });
    },
    upVotePost: (postId) => {
      set((state) => {
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          if (post.isUpvoted) {
            post.upvotes -= 1; // Remove vote if already voted
          } else {
            post.upvotes += 1; // Add vote if not already voted
          }
          post.isUpvoted = !post.isUpvoted; // Toggle the vote state
        }
      });
    },
  }))
);
