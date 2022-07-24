import { Payload } from 'types/action';

export const paginationStories = (payload: Payload, type: string) => ({
  type,
  payload,
});
