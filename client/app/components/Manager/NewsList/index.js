/**
 *
 * NewsList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const NewsList = props => {
  const { listNews } = props;

  const formatDate = (timeCreated) => {
    var date = new Date(timeCreated);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return (dt+'/' + month + '/'+year);
  }

  return (
    <div className='p-list'>
      {listNews.map((news, index) => (
        <Link
          to={`/dashboard/news/edit/${news._id}`}
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 news-box'
        >
          <img
            className='item-image'
            src={`${
              news && news.thumbnail
                ? news.thumbnail
                : '/images/placeholder-image.png'
            }`}
          />
          <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
            <h4 className='text-truncate'>{news.title}</h4>
            <p className='mb-2 text-truncate'>{formatDate(news.created)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewsList;
