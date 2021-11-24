/**
 *
 * EditProduct
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const taxableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];

const EditProduct = props => {
  const {
    user,
    product,
    productChange,
    formErrors,
    brands,
    updateProduct,
    deleteProduct,
    activateProduct
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateProduct();
  };

  return (
    <div className='edit-product'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
        <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['id']}
              label={'Mã sản phẩm'}
              name={'id'}
              placeholder={'Mã sản phẩm'}
              value={product.id}
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
              value={product.name}
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
              value={product.description}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          {/* <Col xs='12' md='8'>
            <div className="input-box">
              <label>Hình ảnh sản phẩm</label>
              <input
                type={'file'}
                error={formErrors['file']}
                name={'uploadedImages'}
                label={'Hình ảnh sản phẩm'}
                placeholder={'Tải hình ảnh...'}
                // value={image}
                multiple
                accept='image/*'
                onChange={(e) => {
                  console.log('onChange');
                  console.log(e);
                  addProductImage('uploadedImages', e.target.files);
                }}
              />
            </div>
          </Col> */}
          <Col xs='12' lg='4'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Giá'}
              name={'price'}
              min={1000}
              placeholder={'Giá'}
              value={product.price}
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
              value={product.shopeeUrl}
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
              value={product.lazadaUrl}
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
              value={product.tikiUrl}
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
              checked={!product.isActive}
              toggleCheckboxChange={value => {
                productChange('isActive', !value);
                activateProduct(product._id, !value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Lưu'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Xóa sản phẩm'
            onClick={() => deleteProduct(product._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
