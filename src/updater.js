import _ from 'lodash';
import rssParser from './rssParser';

const updater = (data) => {
  setTimeout(() => {
    if (data.feeds.length === 0) {
      updater(data);
    } else {
      data.feeds.forEach((feed) => {
        rssParser(feed.link, feed.id)
          .then(({ posts }) => {
            const uniquePosts = posts.filter((newPost) => {
              const predicate = (dataPost) => dataPost.title === newPost.title;
              return !_.find(data.posts, predicate);
            });
            data.posts.push(...uniquePosts);
          })
          .then(() => updater(data))
          .catch(() => updater(data));
      });
    }
  }, 5000);
};

export default updater;
