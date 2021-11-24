/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddProduct from '../../components/Manager/AddProduct';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    // this.props.fetchBrandsSelect();
  }

  render() {
    const {
      isLoading,
      history,
      user,
      productFormData,
      formErrors,
      brands,
      productChange,
      addProductImage,
      addProduct
    } = this.props;

    return (
      <SubPage
        title='Thêm sản phẩm'
        actionTitle='Trở về'
        handleAction={() => history.goBack()}
      >
        <AddProduct
          isLoading={isLoading}
          user={user}
          productFormData={productFormData}
          formErrors={formErrors}
          brands={brands}
          productChange={productChange}
          addProductImage={addProductImage}
          addProduct={addProduct}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.product.isLoading,
    user: state.account.user,
    productFormData: state.product.productFormData,
    formErrors: state.product.formErrors
  };
};

export default connect(mapStateToProps, actions)(Add);
