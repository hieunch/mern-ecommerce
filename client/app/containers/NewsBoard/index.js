/**
 *
 * NewsBoard
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import NewsList from '../NewsList';

import actions from '../../actions';

import Page404 from '../../components/Common/Page404';
import Pagination from '../../components/Common/Pagination';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class NewsBoard extends React.PureComponent {
  componentDidMount() {
    // document.body.classList.add('shop-page');
    document.title = "Tin Tức"
    this.props.filterNews();
  }

  componentWillUnmount() {
    // document.body.classList.remove('shop-page');
  }

  render() {
    const { listNews, pageInfo, isLoading, filterNews } = this.props;
    const { pageNumber, pages, totalNews } = pageInfo;


    return (
      <div className='news-board'>
        {isLoading && <LoadingIndicator />}
        {listNews && listNews.length > 0 && (
          <NewsList
            listNews={listNews}
          />
        )}
        {!isLoading && listNews && listNews.length <= 0 && (
          <NotFound message='Chưa có tin tức.' />
        )}

        {listNews && totalNews >= 8 && (
          <div className='d-flex justify-content-center text-center mt-4'>
            <Pagination
              handlePagenationChangeSubmit={filterNews}
              // listNews={listNews}
              pages={pages}
              page={pageNumber}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageInfo: state.news.pageInfo,
    listNews: state.news.listNewsInRange,
    isLoading: state.news.isLoading
  };
};

export default connect(mapStateToProps, actions)(NewsBoard);
