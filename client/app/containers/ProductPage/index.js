/**
 *
 * ProductPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { BagIcon } from '../../components/Common/Icon';
import ProductReviews from '../../components/Store/ProductReviews';
import SocialShare from '../../components/Store/SocialShare';
import ShopingNavBar from '../../components/Store/ShopingNavBar';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

class ProductPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreProduct(slug);
    // this.props.fetchProductReviews(slug);
    document.body.classList.add('product-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchStoreProduct(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('product-page');
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   showUrl: props.product.imageUrl ? props.product.imageUrl
    //    : '/images/placeholder-image.png'
    // };
  }

  render() {
    const {
      history,
      isLoading,
      product,
      changeShowUrl,
      productShopData,
      shopFormErrors,
      productShopChange,
      addProductReview,
      reviewsSummary,
      reviews,
      reviewFormData,
      reviewChange,
      reviewFormErrors
    } = this.props;

    const settings = {
      arrow: true,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };

    console.log(product.tikiUrl);

    const isUrlNonempty = product.shopeeUrl || product.lazadaUrl || product.tikiUrl;

    return (
      <div className='product-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <>
            <Row className='flex-row'>
              <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
                <div className='main-image-container'>
                  <img
                    className='main-image'
                    src={`${
                      product.imageUrl
                        ? product.imageUrl
                        : '/images/placeholder-image.png'
                    }`}
                    // style={{
                    //   heigh: '100%',
                    //   verticalAlign: 'middle'
                    // }}
                  />
                  {/* {product.inventory <= 0 && !shopFormErrors['quantity'] ? (
                    <p className='stock out-of-stock'>Out of stock</p>
                  ) : (
                    <p className='stock in-stock'>In stock</p>
                  )} */}
                </div>
                <div className="pt-3 prd-detail-slide1 slick-initialized slick-slider">
                  <Slider {...settings}>
                  {/* <img className='px-1' src='/images/placeholder-image.png'/>
                  <img className='px-1' src='/images/placeholder-image.png'/>
                  <img className='px-1' src='/images/placeholder-image.png'/>
                  <img className='px-1' src='/images/placeholder-image.png'/> */}
                  {product.imageUrls.map((url, num) =>
                    <img className='px-1' key={num} src={url} onClick={(e) => {
                      console.log(e.target);
                      changeShowUrl(e.target.src)
                    }}/>
                  )}
                  </Slider>
                </div>
              </Col>
              <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                <div className='product-container'>
                  <div className='item-box'>
                    <h1 className='item-name'>
                      {product.name}
                    </h1>
                    <div className='item-body item-details'>
                      <p className='sku'>Mã sản phẩm: {product.id}</p>
                      <p className='price'>{product.price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</p>
                      <hr />
                      {/* {product.brand && (
                        <p className='by'>
                          see more from{' '}
                          <Link
                            to={`/shop/brand/${product.brand.slug}`}
                            className='default-link'
                          >
                            {product.brand.name}
                          </Link>
                        </p>
                      )} */}
                      <h3>Mô tả sản phẩm:</h3>
                      <pre className='item-desc'>{product.description}</pre>
                    </div>
                    {/* <div className='item-customize'>
                      <Input
                        type={'number'}
                        error={shopFormErrors['quantity']}
                        label={'Quantity'}
                        name={'quantity'}
                        decimals={false}
                        min={1}
                        max={product.inventory}
                        placeholder={'Product Quantity'}
                        disabled={
                          product.inventory <= 0 && !shopFormErrors['quantity']
                        }
                        value={productShopData.quantity}
                        onInputChange={(name, value) => {
                          productShopChange(name, value);
                        }}
                      />
                    </div> */}git 
                    <hr />
                    
                    {/* <div className='my-4 item-share'> */}
                      {/* <SocialShare product={product} /> */}
                      
                    {/* </div> */}
                    {/* <div className='my-4 item-share'>
                      <SocialShare product={product} />
                      <ShopingNavBar product={product} />
                    </div> */}
                    {/* <Button
                          variant='primary'
                          text='Mua hàng'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => ()}
                        /> */}
                    <div className="purchase-item">
                      <p hidden={!isUrlNonempty}>Đặt hàng trên</p>
                      <ShopingNavBar 
                        shopeeUrl={product.shopeeUrl}
                        lazadaUrl={product.lazadaUrl}
                        tikiUrl={product.tikiUrl} 
                      />
                      <p hidden={!isUrlNonempty}>Hoặc</p>
                      <br/>
                      <button className="purchase-btn" onClick={() => history.push('/contact')} >Liên hệ với chúng tôi</button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {/* <ProductReviews
              reviewFormData={reviewFormData}
              reviewFormErrors={reviewFormErrors}
              reviews={reviews}
              reviewsSummary={reviewsSummary}
              reviewChange={reviewChange}
              addReview={addProductReview}
            /> */}
          </>
        ) : (
          <NotFound message='no product found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    isLoading: state.product.isLoading,
    // reviews: state.review.productReviews,
    // reviewsSummary: state.review.reviewsSummary,
    // reviewFormData: state.review.reviewFormData,
    // reviewFormErrors: state.review.reviewFormErrors,
  };
};

export default connect(mapStateToProps, actions)(ProductPage);
