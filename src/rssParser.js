import axios from 'axios';
import _ from 'lodash';

export const rssParser = (url, id) => {
  return axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then(data => {
      const parser = new DOMParser();
      const responseDOM = parser.parseFromString(JSON.parse(data.request.response).contents, 'application/xml');
      const id = id ?? _.uniqueId();
      const feed = {
        id,
        title: responseDOM.querySelector('channel title').innerHTML,
        link: url,
        description: responseDOM.querySelector('channel description').innerHTML,
        webMaster: responseDOM.querySelector('channel webMaster').innerHTML,
      };
      const posts = Array.from(responseDOM.querySelectorAll('item')).map((post) => {
        const feedID = id;
        const title = post.querySelector('title').innerHTML;
        const link = post.querySelector('link').innerHTML;
        const description = post.querySelector('description').innerHTML;
        const date = Date.parse(post.querySelector('pubDate').innerHTML);
        return { feedID, title, link, description, date };
      });
      return { feed, posts };
    });
};
