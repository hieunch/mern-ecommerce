/*
 *
 * Account
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import AccountDetails from '../../components/Manager/AccountDetails';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Account extends React.PureComponent {
  componentDidMount() {
    
  }

  render() {
    const { isLoading, infoFormData, infoChange, updateInfo } = this.props;

    return (
      <div className='account'>
        <SubPage title={'Thông tin cửa hàng'} isMenuOpen={null}>
          {infoFormData?.name ? (
            <AccountDetails
              isLoading={isLoading}
              info={infoFormData}
              infoChange={infoChange}
              updateInfo={updateInfo}
            />
          ) : (
            <NotFound message='Chưa có thông tin.' />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.account.isLoading,
    infoFormData: state.account.infoFormData,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors
  };
};

export default connect(mapStateToProps, actions)(Account);
