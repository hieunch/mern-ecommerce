/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddNews from '../../components/Manager/AddNews';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    // this.props.fetchBrandsSelect();
  }

  render() {
    const {
      isLoading,
      history,
      newsFormData,
      formErrors,
      changeNews,
      addNews
    } = this.props;

    return (
      <SubPage
        title='Thêm tin mới'
        actionTitle='Thoát'
        handleAction={() => history.goBack()}
      >
        <AddNews
          isLoading={isLoading}
          newsFormData={newsFormData}
          formErrors={formErrors}
          changeNews={changeNews}
          addNews={addNews}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.news.isLoading,
    newsFormData: state.news.newsFormData,
    formErrors: state.news.formErrors,
  };
};

export default connect(mapStateToProps, actions)(Add);
