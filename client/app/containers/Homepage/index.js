/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import ProductSlider from '../../components/Common/ProductSlider';
// import MultiCarouselPage from '../../components/Common/MultiCarouselPage';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/helpers';
import { responsiveMultiItemsCarousel } from '../../components/Common/ProductSlider/helpers';

class Homepage extends React.PureComponent {

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
  }

  render() {
    const { products, isLoading, authenticated } = this.props;

    const settings = {
      arrow: true,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // initialSlide: 0,
      speed: 500,
    };

    return (
      // <div className='homepage'>
      //   <Row className='flex-row'>
      //     <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
      //       <div className='home-carousel'>
      //         <CarouselSlider
      //           swipeable={true}
      //           showDots={true}
      //           infinite={true}
      //           autoPlay={true}
      //           slides={banners}
      //           responsive={responsiveOneItemCarousel}
      //         >
      //           {banners.map((item, index) => (
      //             <img key={index} src={item.imageUrl} />
      //           ))}
      //         </CarouselSlider>
      //       </div>
      //     </Col>
      //     <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
      //       <div className='d-flex flex-column h-100 justify-content-between'>
      //         <img src='/images/banners/banner-2.jpg' className='mb-3' />
      //         <img src='/images/banners/banner-5.jpg' />
      //       </div>
      //     </Col>
      //     <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
      //       <div className='d-flex flex-column h-100 justify-content-between'>
      //         <img src='/images/banners/banner-2.jpg' className='mb-3' />
      //         <img src='/images/banners/banner-6.jpg' />
      //       </div>
      //     </Col>
      //   </Row>
      // </div>
      <div className='homepage'>
        <section className='home-carousel'>
          <CarouselSlider
            swipeable={true}
            showDots={true}
            infinite={true}
            autoPlay={true}
            slides={banners}
            responsive={responsiveOneItemCarousel}
          >
            {banners.map((item, index) => (
              <img key={index} src={item.imageUrl} />
            ))}
          </CarouselSlider>
        </section>
        {/* <MultiCarouselPage/> */}
        <section className='home-products'>
          <h2 className='home-block-title'>SẢN PHẨM</h2>
          <div className='home-container'>
            <ProductSlider
              swipeable={true}
              showDots={true}
              infinite={true}
              autoPlay={true}
              slides={banners}
              responsive={responsiveMultiItemsCarousel}
            >
              {products.map((product, index) => (
                <div key={index} className='product-slider'>
                  <div className='product-container'>
                    <div className='item-box'>
                      <div className='item-link'>
                        <Link to={`/product/${product.slug}`}>
                          <div className='item-image-container'>
                            <div className='item-image-box'>
                              <img
                                className='item-image'
                                src={`${
                                  product.imageUrl
                                    ? product.imageUrl
                                    : '/images/placeholder-image.png'
                                }`}
                              />
                            </div>
                          </div>
                          <div className='item-body'>
                            <div className='item-details p-3'>
                              <h1 className='item-name'>{product.name}</h1>
                              <p className='by'>
                                <span>{product.price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                              </p>
                              <p className='item-desc'>
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ProductSlider>
            {/* <Slider {...settings}>
              {products.map((product, num) =>
                (
                  <div className='home-product-box' key={num}>
                    <div className='product-link'>
                      <Link to={`/product/${product.slug}`}>
                        <div className='product-image-container'>
                          <div className='product-image-box'>
                            <img
                              className='product-image'
                              src={`${
                                product.imageUrl
                                  ? product.imageUrl
                                  : '/images/placeholder-image.png'
                              }`}
                            />
                          </div>
                        </div>
                        <div className='product-body'>
                          <div className='product-details p-3'>
                            <h1 className='home-product-name'>{product.name}</h1>
                            
                            <p >
                              <span>{product.price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                            </p>
                          </div>
                        </div> 
                      </Link>
                    </div>
                  </div>
                )
              )}
            </Slider> */}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(Homepage);
