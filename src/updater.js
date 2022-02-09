import _ from 'lodash';
import rssParser from './rssParser';

const updater = (data) => {
  setTimeout(() => {
    data.feeds.forEach((feed) => {
      rssParser(feed.link, feed.id)
        .then(({ posts }) => {
          const uniquePosts = posts.filter((newPost) => {
            const predicate = (dataPost) => dataPost.title === newPost.title;
            return !_.find(data.posts, predicate);
          });
          data.posts.push(...uniquePosts);
        })
        .then(() => updater());
    });
  }, 5000);
};

export default updater;
