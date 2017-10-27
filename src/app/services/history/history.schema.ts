import { schema } from 'normalizr';

const historyByPost = new schema.Entity('history', {}, {
  idAttribute: 'post_id',
});

const historyByPostSchema = [ historyByPost ];

export { historyByPostSchema };
