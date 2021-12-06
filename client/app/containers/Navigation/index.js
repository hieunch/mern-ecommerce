/**
 *
 * Navigation
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Link, NavLink as ActiveLink, withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import actions from '../../actions';

class Navigation extends React.PureComponent {
  componentDidMount() {
    // this.props.fetchStoreBrands();
  }

  showIntroduction() {
    this.props.showIntroduction();
  }

  hideIntroduction() {
    this.props.hideIntroduction();
  }

  showBrand() {
    this.props.fetchStoreBrands();
    this.props.showBrand();
  }

  hideBrand() {
    this.props.hideBrand();
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const BoldName = (suggestion, query) => {
      const matches = AutosuggestHighlightMatch(suggestion.name, query);
      const parts = AutosuggestHighlightParse(suggestion.name, matches);

      return (
        <div>
          {parts.map((part, index) => {
            const className = part.highlight
              ? 'react-autosuggest__suggestion-match'
              : null;
            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </div>
      );
    };

    return (
      <Link to={`/product/${suggestion.slug}`}>
        <div className='d-flex'>
          <img
            className='item-image'
            src={`${
              suggestion.imageUrl
                ? suggestion.imageUrl
                : '/images/placeholder-image.png'
            }`}
          />
          <div>
            <Container>
              <Row>
                <Col>
                  <span className='name'>{BoldName(suggestion, query)}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className='price'>{suggestion.price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const {
      history,
      authenticated,
      info,
      brands,
      signOut,
      isBrandOpen,
      isIntroductionOpen,
      searchValue,
      suggestions,
      onSearch,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested
    } = this.props;

    const inputProps = {
      placeholder: 'Tìm kiếm sản phẩm ...',
      value: searchValue,
      onChange: (_, { newValue }) => {
        onSearch(newValue);
      }
    };

    return (
      <header className='header fixed-mobile-header'>
        <div className='header-info'>
          <Container>
            <Row>
              <Col md='4' className='text-center d-none d-md-block'>
                <span>Đồng Hành Và Phát Triển Cùng Khách Hàng</span>
              </Col>
              <Col md='4' className='text-center d-none d-md-block'>
                <i className='fa fa-phone' />
                <span>{info.phoneNumber}</span>
              </Col>
              <Col md='4' className='text-center d-none d-md-block'>
                <i className='fa fa-envelope-o' />
                <span>{info.email}</span>
              </Col>
              
            </Row>
          </Container>
        </div>
        <Container>
          <Row className='align-items-center top-header'>
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 3, order: 1 }}
              lg={{ size: 2, order: 1 }}
            >
              <div className='introduction'>
                {/* <Button
                  borderless
                  variant='empty'
                  className='d-none d-md-block'
                  ariaLabel='open the menu'
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                /> */}
                <Link to='/'>
                  {/* <i className="fa fa-home"></i> */}
                  {/* <h1 className='logo'>{info.name}</h1> */}
                  <img height='60' src='/images/logo.jpg'/>
                </Link>
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 9, order: 1 }}
              lg={{ size: 6, order: 3 }}
              // className='px-0'
            >
              <Navbar color='light' light expand='md' className='mt-1 mt-md-0'>
                {/* <CartIcon
                  className='d-none d-md-block'
                  cartItems={cartItems}
                  onClick={toggleCart}
                /> */}
                <Nav navbar>
                <Dropdown 
                  nav 
                  inNavbar
                  onMouseEnter={() => this.showIntroduction()}
                  onMouseLeave={() => this.hideIntroduction()}
                  toggle={() => null}
                  isOpen={isIntroductionOpen}
                >
                      <DropdownToggle onClick={() => null} nav>
                        Giới thiệu
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => history.push('/')}>
                          Lịch sử phát triển
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push('/')}>
                          Tầm nhìn, sứ mệnh
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push('/')}>
                          Văn hóa - giá trị cốt lõi
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push('/')}>
                          Cơ cấu tổ chức
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push('/')}>
                          Công ty thành viên
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push('/')}>
                          Triết lý kinh doanh
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push('/')}>
                          Hình ảnh công ty
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  {/* <Dropdown
                    nav
                    inNavbar
                    onMouseEnter={() => this.showBrand()}
                    onMouseLeave={() => this.hideBrand()}
                    isOpen={isBrandOpen}
                  >
                    <DropdownToggle nav>
                      Sản phẩm
                      <span className='fa fa-chevron-down dropdown-caret'></span>
                    </DropdownToggle>
                    <DropdownMenu right className='nav-brand-dropdown'>
                      <div className='mini-brand'>
                        <MiniBrand
                          brands={brands}
                          toggleBrand={() => this.toggleBrand()}
                        />
                      </div>
                    </DropdownMenu>
                  </Dropdown> */}
                  {/* <HoverDropdown items={[{itemTitle: "bcd", link: "/bcd"}]} title="test dropdown" /> */}
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to='/shop'
                      activeClassName='active'
                    >
                      Sản phẩm
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to='/news'
                      activeClassName='active'
                    >
                      Tin tức
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to='/shop'
                      activeClassName='active'
                    >
                      Nhà phân phối
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to='/contact'
                      activeClassName='active'
                    >
                      Liên hệ
                    </NavLink>
                  </NavItem>
                  {authenticated ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        {/* {user.firstName ? user.firstName : 'Welcome'} */}
                        Tài khoản
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          onClick={() => history.push('/dashboard')}
                        >
                          Dashboard
                        </DropdownItem>
                        <DropdownItem onClick={signOut}>Đăng xuất</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    // <UncontrolledDropdown nav inNavbar>
                    //   <DropdownToggle nav>
                    //     Welcome!
                    //     <span className='fa fa-chevron-down dropdown-caret'></span>
                    //   </DropdownToggle>
                    //   <DropdownMenu right>
                    //     <DropdownItem onClick={() => history.push('/login')}>
                    //       Login
                    //     </DropdownItem>
                    //     <DropdownItem onClick={() => history.push('/register')}>
                    //       Sign Up
                    //     </DropdownItem>
                    //   </DropdownMenu>
                    // </UncontrolledDropdown>
                    null
                  )}
                </Nav>
              </Navbar>
            </Col>
            <Col
              xs={{ size: 12, order: 4 }}
              sm={{ size: 12, order: 4 }}
              md={{ size: 12, order: 4 }}
              lg={{ size: 4, order: 2 }}
              className='pt-2 pt-lg-0'
            >
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(_, item) => {
                  history.push(`/product/${item.suggestion.slug}`);
                }}
              />
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 4, order: 1 }}
              lg={{ size: 5, order: 3 }}
              className='desktop-hidden'
            >
              {/* <div className='header-links'>
                <Button
                  borderless
                  variant='empty'
                  ariaLabel='open the menu'
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                />
              </div> */}
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    // isBrandOpen: state.navigation.isBrandOpen,
    isIntroductionOpen: state.navigation.isIntroductionOpen,
    info: state.account.info,
    authenticated: state.authentication.authenticated,
    user: state.account.user,
    searchValue: state.navigation.searchValue,
    suggestions: state.navigation.searchSuggestions
  };
};

export default connect(mapStateToProps, actions)(withRouter(Navigation));
