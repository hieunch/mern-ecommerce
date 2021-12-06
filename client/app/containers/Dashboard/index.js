/**
 *
 * Dashboard
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import Admin from '../../components/Manager/Dashboard/Admin';
// import Merchant from '../../components/Manager/Dashboard/Merchant';
// import Customer from '../../components/Manager/Dashboard/Customer';

import LoadingIndicator from '../../components/Common/LoadingIndicator';

import dashboardLinks from './links2.json';
import Page404 from '../../components/Common/Page404';

class Dashboard extends React.PureComponent {
  componentDidMount() {
    // this.props.fetchInfo();
  }

  render() {
    const { user, isLoading, isMenuOpen, toggleDashboardMenu } = this.props;
    return (
      <>
        {isLoading ? (
          <LoadingIndicator inline />
        ) : user.role === 'ROLE_ADMIN' ? (
          <Admin
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['ROLE_ADMIN']}
            toggleMenu={toggleDashboardMenu}
          />
        ) : (<Page404/>)}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    isLoading: state.account.isLoading,
    isMenuOpen: state.dashboard.isMenuOpen
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
