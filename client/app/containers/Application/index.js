/**
 *
 * Application
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import actions from '../../actions';

// routes
import Login from '../Login';
import Signup from '../Signup';
// import MerchantSignup from '../MerchantSignup';
import HomePage from '../Homepage';
import Dashboard from '../Dashboard';
import Navigation from '../Navigation';
import Authentication from '../Authentication';
import Notification from '../Notification';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import Shop from '../Shop';
import NewsBoard from '../NewsBoard';
// import BrandsPage from '../BrandsPage';
import ProductPage from '../ProductPage';
import NewsPage from '../NewsPage';
import Sell from '../Sell';
import Contact from '../Contact';
import AuthSuccess from '../AuthSuccess';

import Footer from '../../components/Common/Footer';
import Page404 from '../../components/Common/Page404';

class Application extends React.PureComponent {
  componentDidMount() {
    const token = localStorage.getItem('token');
    
    this.props.fetchInfo();
    if (token) {
      this.props.fetchProfile();
    }

    document.addEventListener('keydown', this.handleTabbing);
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  handleTabbing(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('user-is-tabbing');
    }
  }

  handleMouseDown() {
    document.body.classList.remove('user-is-tabbing');
  }

  render() {
    const { info } = this.props;
    
    return (
      <div className='application'>
        {/* <Notification /> */}
        <Navigation />
        <main className='main'>
          <Container>
            <div className='wrapper'>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={Shop} />
                <Route path='/news' component={NewsBoard} />
                {/* <Route path='/sell' component={Sell} /> */}
                <Route path='/contact' component={Contact} />
                {/* <Route path='/brands' component={BrandsPage} /> */}
                <Route path='/product/:slug' component={ProductPage} />
                <Route path='/tintuc/:slug' component={NewsPage} />
                <Route path='/login' component={Login} />
                {/* <Route path='/register' component={Signup} /> */}
                {/* <Route
                  path='/merchant-signup/:token'
                  component={MerchantSignup}
                /> */}
                {/* <Route path='/forgot-password' component={ForgotPassword} /> */}
                {/* <Route
                  path='/reset-password/:token'
                  component={ResetPassword}
                /> */}
                <Route path='/auth/success' component={AuthSuccess} />
                <Route
                  path='/dashboard'
                  component={Authentication(Dashboard)}
                />
                <Route path='/404' component={Page404} />
                <Route path='*' component={Page404} />
              </Switch>
            </div>
          </Container>
        </main>
        <Footer info={info} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    products: state.product.storeProducts,
    info: state.account.info
  };
};

export default connect(mapStateToProps, actions)(Application);
