import { schema } from 'normalizr';

const user = new schema.Entity('users');

const comment = new schema.Entity('comments', {
  commenter: user
});

const post = new schema.Entity('posts', {
  user: new schema.Entity('users'),
  comments: [ comment ]
});

export const postsSchema = [ post ];
