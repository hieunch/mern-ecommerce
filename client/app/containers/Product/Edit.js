/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditProduct from '../../components/Manager/EditProduct';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetProduct();
    const productId = this.props.match.params.id;
    this.props.fetchProduct(productId);
    // this.props.fetchBrandsSelect();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetProduct();
      const productId = this.props.match.params.id;
      this.props.fetchProduct(productId);
    }
  }

  render() {
    const {
      isLoading,
      history,
      user,
      product,
      formErrors,
      brands,
      productEditChange,
      updateProduct,
      deleteProduct,
      activateProduct
    } = this.props;

    
    return (
      isLoading ? (
        <LoadingIndicator inline />
      ) : (<>
      <SubPage
        title='Cập nhật thông tin sản phẩm'
        actionTitle='Trở về'
        handleAction={history.goBack}
      >
        {product?._id ? (
          <EditProduct
            user={user}
            product={product}
            formErrors={formErrors}
            brands={brands}
            productChange={productEditChange}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            activateProduct={activateProduct}
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
    isLoading: state.product.isLoading,
    user: state.account.user,
    product: state.product.product,
    formErrors: state.product.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
