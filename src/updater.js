import _ from 'lodash';
import watchedData from './data';
import rssParser from './rssParser';

const updater = () => {
  setTimeout(() => {
    watchedData.feeds.forEach((feed) => {
      rssParser(feed.link, feed.id)
        .then(({ posts }) => {
          const uniquePosts = posts.filter((newPost) => {
            const predicate = (dataPost) => dataPost.title === newPost.title;
            return !_.find(watchedData.posts, predicate);
          });
          watchedData.posts.push(...uniquePosts);
        })
        .then(() => updater());
    });
  }, 5000);
};

export default updater;
