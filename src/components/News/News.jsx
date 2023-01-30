import React from 'react';
import s from './News.module.css';
const News = (props) => {
  return (
    <div className={s.items}>
      <div className={s.text}>
        Sorry, this page is under development
      </div>
      <div className={s.img}>
        <img src='https://abrakadabra.fun/uploads/posts/2022-01/thumbs/1642072293_1-abrakadabra-fun-p-shesterenka-na-belom-fone-2.jpg' />
      </div>
    </div>


  );
};
export default News;
