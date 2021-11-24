/**
 *
 * AddProduct
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import LoadingIndicator from '../../../components/Common/LoadingIndicator';

const taxableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];

const AddProduct = props => {
  const {
    isLoading,
    user,
    productFormData,
    formErrors,
    productChange,
    addProductImage,
    addProduct,
    brands,
    image
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addProduct();
  };

  return (
    <div className='add-product'>
      {isLoading ? (
          <LoadingIndicator inline />
        ) : (<>
      <h1 />
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['id']}
              label={'Mã sản phẩm'}
              name={'id'}
              placeholder={'Mã sản phẩm'}
              value={productFormData.id}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Tên sản phẩm'}
              name={'name'}
              placeholder={'Tên sản phẩm'}
              value={productFormData.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Mô tả'}
              name={'description'}
              placeholder={'Mô tả'}
              value={productFormData.description}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='8'>
            {/* <div className="input-box">
              <label>Hình ảnh sản phẩm</label>
              <input
                type={'file'}
                error={formErrors['uploadedImages']}
                name={'uploadedImages'}
                label={'Hình ảnh sản phẩm'}
                placeholder={'Tải hình ảnh...'}
                // value={image}
                multiple
                accept='image/*'
                onChange={(e) => {
                  addProductImage('uploadedImages', e.target.files);
                }}
              />
            </div> */}
            <Input
              type={'file'}
              error={formErrors['uploadedImages']}
              label={'Hình ảnh sản phẩm'}
              name={'uploadedImages'}
              placeholder={'Hình ảnh sản phẩm'}
              // value={productFormData.uploadedImages}
              onInputChange={(name, value) => {
                addProductImage(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='4'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Giá'}
              name={'price'}
              min={1000}
              placeholder={'Giá'}
              value={productFormData.price}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='8'>
            <Input
              type={'text'}
              error={formErrors['shopeeUrl']}
              label={'Link Shopee'}
              name={'shopeeUrl'}
              placeholder={'Link Shopee'}
              value={productFormData.shopeeUrl}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='8'>
            <Input
              type={'text'}
              error={formErrors['lazadaUrl']}
              label={'Link Lazada'}
              name={'lazadaUrl'}
              placeholder={'Link Lazada'}
              value={productFormData.lazadaUrl}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='8'>
            <Input
              type={'text'}
              error={formErrors['tikiUrl']}
              label={'Link Tiki'}
              name={'tikiUrl'}
              placeholder={'Link Tiki'}
              value={productFormData.tikiUrl}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2' style={{ textAlign: "right" }}>
            <Switch
              id={'active-product'}
              name={'isActive'}
              label={'Ẩn sản phẩm'}
              checked={!productFormData.isActive}
              toggleCheckboxChange={value => productChange('isActive', !value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-product-actions'>
          <Button type='submit' text='Thêm sản phẩm' />
        </div>
      </form> </>)}
    </div>
  );
};

export default AddProduct;
