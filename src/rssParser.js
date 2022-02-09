import axios from 'axios';
import _ from 'lodash';

const proxy = 'https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=';

const rssParser = (url, idOld) => axios.get(`${proxy}${encodeURIComponent(url)}`)
  .then((data) => {
    if (data.request.status !== 200) throw new Error();
    return data;
  })
  .then((data) => {
    const parser = new DOMParser();
    const responseDOM = parser.parseFromString(JSON.parse(data.request.response).contents, 'application/xml');
    const id = idOld ?? _.uniqueId();
    const feed = {
      id,
      title: responseDOM.querySelector('channel title').innerHTML,
      link: url,
      description: responseDOM.querySelector('channel description').innerHTML,
    };
    const posts = Array.from(responseDOM.querySelectorAll('item')).map((post) => {
      const feedID = id;
      const title = post.querySelector('title').innerHTML;
      const link = post.querySelector('link').innerHTML;
      const description = post.querySelector('description').innerHTML;
      const date = Date.parse(post.querySelector('pubDate').innerHTML);
      const viewed = false;
      return {
        feedID,
        title,
        link,
        description,
        date,
        viewed,
      };
    });
    if (posts.length > 1) {
      posts.push({
        feedID: id,
        title: 'Агрегация \/ Python: Деревья',
        link: 'https://ru.hexlet.io/',
        description: 'Цель: Научиться извлекать из дерева необходимые данные',
        date: 10000,
        viewed: false,
      });
    }
    return { feed, posts };
  });

export default rssParser;
