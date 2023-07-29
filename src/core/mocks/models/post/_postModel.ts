import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export interface UserType {
  name: string;
  username: string;
  profile: string;
  verified: boolean;
}

export interface RepliesType {
  count: number;
  users: UserType[];
}

export type PostType =
  | 'carousel'
  | 'caption'
  | 'podcast'
  | 'video'
  | 'voice'
  | 'aestethic';

export type PostModelType = {
  id: number;
  user: UserType;
  type: PostType;
  caption: string;
  likes: number;
  video?: string;
  images?: string[];
  replies: RepliesType;
};

// videoUrl?: string;
// voiceUrl?: string;
// podcast?: any[];
// images?: string | string[];

export const PostModel: ModelDefinition<PostModelType> = Model.extend({});
