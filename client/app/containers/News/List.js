/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import NewsList from '../../components/Manager/NewsList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchNewsList();
  }

  render() {
    const { history, listNews, isLoading } = this.props;

    return (
      <>
        <SubPage
          title='Danh sách tin tức'
          actionTitle='Thêm'
          handleAction={() => history.push('/dashboard/news/add')}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : listNews.length > 0 ? (
            <NewsList listNews={listNews} />
          ) : (
            <NotFound message='chưa có tin tức' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    listNews: state.news.listNews,
    isLoading: state.news.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
