/**
 *
 * ResetPasswordForm
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';
import Button from '../Button';

const ResetPasswordForm = props => {
  const {
    resetFormData,
    formErrors,
    resetPasswordChange,
    resetPassowrd
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    resetPassowrd();
  };

  return (
    <div className='reset-password-form'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'password'}
              error={formErrors['password']}
              label={'Mật khẩu mới'}
              name={'password'}
              placeholder={'Mật khẩu'}
              value={resetFormData.password}
              onInputChange={(name, value) => {
                resetPasswordChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'password'}
              error={formErrors['confirmPassword']}
              label={'Xác nhận mật khẩu mới'}
              name={'confirmPassword'}
              placeholder={'Xác nhận mật khẩu'}
              value={resetFormData.confirmPassword}
              onInputChange={(name, value) => {
                resetPasswordChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='reset-actions'>
          <Button type='submit' text='Đổi mật khẩu' />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
