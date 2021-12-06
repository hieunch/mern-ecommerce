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

class Account extends React.PureComponent {
  componentDidMount() {
  }

  render() {
    const { isLoading, info, infoChange, updateInfo } = this.props;

    return (
      <div className='account'>
        <SubPage title={'Thông tin cửa hàng'} isMenuOpen={null}>
          <AccountDetails
            isLoading={isLoading}
            info={info}
            infoChange={infoChange}
            updateInfo={updateInfo}
          />
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.account.isLoading,
    info: state.account.info,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors
  };
};

export default connect(mapStateToProps, actions)(Account);
