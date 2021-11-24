/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditNews from '../../components/Manager/EditNews';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetNews();
    const newsId = this.props.match.params.id;
    this.props.fetchNews(newsId);
    // this.props.fetchBrandsSelect();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetNews();
      const newsId = this.props.match.params.id;
      this.props.fetchNews(newsId);
    }
  }

  render() {
    const {
      history,
      isLoading,
      news,
      formErrors,
      updateNews,
      deleteNews,
      editNews
    } = this.props;

    return (
      isLoading ? (
        <LoadingIndicator inline />
      ) : (<>
      <SubPage
        title='Chỉnh sửa tin'
        actionTitle='Thoát'
        handleAction={history.goBack}
      >
        {news?._id ? (
          <EditNews
            news={news}
            formErrors={formErrors}
            editNews={editNews}
            updateNews={updateNews}
            deleteNews={deleteNews}
            isLoading={isLoading}
          />
        ) : (
          <NotFound message='Chưa có sản phẩm.' />
        )}
      </SubPage> </>)
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.news.isLoading,
    news: state.news.news,
    formErrors: state.news.editFormErrors,
  };
};

export default connect(mapStateToProps, actions)(Edit);
