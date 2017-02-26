import { schema } from 'normalizr';

const user = new schema.Entity('users');

const comment = new schema.Entity('comments', {
  commenter: user
});

const favorite = new schema.Entity('favorites');

const post = new schema.Entity('posts', {
  user: new schema.Entity('users'),
  comments: [ comment ],
  favorites: [ favorite ],
});

const postsSchema = [ post ];
const postSchema = post;

export { postsSchema, postSchema }
