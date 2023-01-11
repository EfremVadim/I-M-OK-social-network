import React from 'react';
import s from './Post.module.css';
const Post = (props) => {
  return (

    <div className={s.item}>
      <img src='https://sun9-85.userapi.com/impg/iR863t9OvLUrSTXvT4So8tOlBRL_eJ3KUtV2wA/zHm-eNzIMKA.jpg?size=483x604&quality=95&sign=a3ddbff3bed3d7bfb367a944461e1634&c_uniq_tag=gsPkQCVlCfj89y_dlvvlCvgvDxGgz-za2eGuabOa65A&type=album' />
      { props.message }
      <div>
        <span>Like</span>
      </div>
    </div>

  );
};

export default Post;                                                                                                                  