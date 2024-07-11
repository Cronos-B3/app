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
  unlikePost: (postId: PostType['id']) => void;
  upVotePost: (postId: PostType['id']) => void;
  unUpVotePost: (postId: PostType['id']) => void;
  addComment: (comment: PostType) => void;
};

const updateLikes = (postArray: PostType[], postId: string, increment: boolean) => {
  return postArray.map((post) => {
    if (post.id === postId) {
      post.likes += increment ? 1 : -1;
      post.isLiked = increment;
    }
    return post;
  });
};

const updateUpvotes = (postArray: PostType[], postId: string, increment: boolean) => {
  return postArray.map((post) => {
    if (post.id === postId) {
      post.upvotes += increment ? 1 : -1;
      post.isUpvoted = increment;
    }
    return post;
  });
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
        state.posts = updateLikes(state.posts, postId, true);
        state.myPosts = updateLikes(state.myPosts, postId, true);
      });
    },

    unlikePost: (postId) => {
      set((state) => {
        state.posts = updateLikes(state.posts, postId, false);
        state.myPosts = updateLikes(state.myPosts, postId, false);
      });
    },

    upVotePost: (postId) => {
      set((state) => {
        state.posts = updateUpvotes(state.posts, postId, true);
        state.myPosts = updateUpvotes(state.myPosts, postId, true);
      });
    },

    unUpVotePost: (postId) => {
      set((state) => {
        state.posts = updateUpvotes(state.posts, postId, false);
        state.myPosts = updateUpvotes(state.myPosts, postId, false);
      });
    },
    addComment: (comment: PostType) => {
      set((state) => {
        state.posts.push(comment);
        if (comment.parentId) {
          state.posts = state.posts.map((post) => {
            if (post.id === comment.parentId) {
              post.comments += 1;
            }
            return post;
          });
        }
      });
    },
  }))
);
