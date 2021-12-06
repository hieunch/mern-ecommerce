/**
 *
 * AccountDetails
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import UserRole from '../UserRole';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const AccountDetails = props => {
  const { isLoading, info, infoChange, updateInfo } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateInfo();
  };

  return (
    <div className='account-details'>
      {isLoading ? (
          <LoadingIndicator inline />
        ) : (<>
      {/* <div className='info'>
        <div className='desc'>
          <p className='one-line-ellipsis mr-3'>
            {user.provider === 'email' ? (
              user.email
            ) : (
              <span className='provider-email'>
                Logged in With {user.provider}
              </span>
            )}
          </p>
          <UserRole user={user} />
        </div>
      </div> */}
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs='12' md='4'>
            <Input
              type={'text'}
              label={'Tên cửa hàng'}
              name={'name'}
              placeholder={'Nhập tên'}
              value={info.name ? info.name : ''}
              onInputChange={(name, value) => {
                infoChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              label={'Địa chỉ'}
              name={'address'}
              placeholder={'Nhập địa chỉ'}
              value={info.address ? info.address : ''}
              onInputChange={(name, value) => {
                infoChange(name, value);
              }}
            />
          </Col>
          {/* TODO: update email feature to be added instead form change */}
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'Email'}
              name={'email'}
              placeholder={'Nhập Email'}
              value={info.email ? info.email : ''}
              onInputChange={(name, value) => {
                infoChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'Số điện thoại'}
              name={'phoneNumber'}
              placeholder={'Nhập Số điện thoại'}
              value={info.phoneNumber ? info.phoneNumber : ''}
              onInputChange={(name, value) => {
                infoChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              label={'Link Shopee'}
              name={'shopeeUrl'}
              placeholder={'Nhập link'}
              value={info.shopeeUrl ? info.shopeeUrl : ''}
              onInputChange={(name, value) => {
                infoChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              label={'Link Lazada'}
              name={'lazadaUrl'}
              placeholder={'Nhập link'}
              value={info.lazadaUrl ? info.lazadaUrl : ''}
              onInputChange={(name, value) => {
                infoChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              label={'Link Tiki'}
              name={'tikiUrl'}
              placeholder={'Nhập link'}
              value={info.tikiUrl ? info.tikiUrl : ''}
              onInputChange={(name, value) => {
                infoChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='profile-actions'>
          <Button type='submit' variant='secondary' text='Lưu thay đổi' />
        </div>
      </form>
      </>)}
    </div>
  );
};

export default AccountDetails;
