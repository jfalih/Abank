import {faker} from '@faker-js/faker';
import {Factory} from 'miragejs';
import {FactoryDefinition, WithFactoryMethods} from 'miragejs/-types';
import {PostModelType} from '../../models/post';

export const PostFactory: FactoryDefinition<WithFactoryMethods<PostModelType>> =
  Factory.extend({
    id(n) {
      return n + 1;
    },
    user() {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const name = `${firstName} ${lastName}`;
      return {
        name,
        username: faker.internet
          .userName({
            firstName,
            lastName,
          })
          .toLowerCase(),
        verified: faker.datatype.boolean({
          probability: 0.2,
        }),
        profile: faker.internet.avatar(),
      };
    },
    type() {
      return faker.helpers.arrayElement<PostModelType['type']>([
        'caption',
        'caption',
        'caption',
        'caption',
        'caption',
        'caption',
        'caption',
        'video',
      ]); // 'dog';
    },
    images() {
      return [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
      ];
    },
    video() {
      return faker.helpers.arrayElement([
        'https://videos.pond5.com/his-1963-state-union-address-footage-074716366_main_xxl.mp4',
        'https://videos.pond5.com/parade-free-tuberculosis-sanitarium-calisthenics-footage-074975365_main_xxl.mp4',
        'https://videos.pond5.com/free-china-looks-back-10-footage-128792187_main_xxl.mp4',
      ]);
    },
    caption() {
      return faker.commerce.productDescription();
    },
    likes() {
      return faker.number.int({
        min: 500,
        max: 50000,
      });
    },
    replies() {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const name = `${firstName} ${lastName}`;
      return {
        count: faker.number.int({
          min: 500,
          max: 50000,
        }),
        users: [
          {
            name,
            username: faker.internet
              .userName({
                firstName,
                lastName,
              })
              .toLowerCase(),
            profile: faker.internet.avatar(),
          },
          {
            name,
            username: faker.internet
              .userName({
                firstName,
                lastName,
              })
              .toLowerCase(),
            profile: faker.internet.avatar(),
          },
          {
            name,
            username: faker.internet
              .userName({
                firstName,
                lastName,
              })
              .toLowerCase(),
            profile: faker.internet.avatar(),
          },
        ],
      };
    },
  });

export default PostFactory;
