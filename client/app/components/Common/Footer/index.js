/**
 *
 * Footer
 *
 */

import React from 'react';
import { info } from 'react-notification-system-redux';

import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Newsletter from '../../../containers/Newsletter';
import SocialShare from '../../Store/SocialShare'

const Footer = (props) => {
  const { info } = props;

  const infoLinks = [
    { id: 0, name: 'Sản phẩm', to: '/shop' },
    { id: 1, name: 'Tin tức', to: '/news' },
    { id: 2, name: 'Liên hệ', to: '/contact' }
  ];

  const storeLinks = [
    { id: 0, name: 'Shopee', url: info.shopeeUrl },
    { id: 1, name: 'Lazada', url: info.lazadaUrl },
    { id: 2, name: 'Tiki', url: info.tikiUrl }
  ];

  // const footerBusinessLinks = (
  //   <ul className='support-links'>
  //     <li className='footer-link'>
  //       <Link to='/dashboard'>Account Details</Link>
  //     </li>
  //     <li className='footer-link'>
  //       <Link to='/dashboard/orders'>Orders</Link>
  //     </li>
  //   </ul>
  // );

  const footerLinks = infoLinks.map(item => (
    <li key={item.id} className='footer-link'>
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));

  const footerBusinessLinks = storeLinks.map(item => (
    <li key={item.id} className='footer-link'>
      <a href={item.url} hidden={item.url ? false : true} rel='noreferrer noopener' target='_blank'>
        {item.name}
      </a>
    </li>
  ));

  return (
    <footer className='footer'>
      <Container>
        <div className='footer-content'>
          <div className='footer-block col col-lg-2 col-md-2'>
            <div className='block-title'>
              <h2>Links</h2>
            </div>
            <div className='block-content'>
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className='footer-block col col-lg-8 col-md-8'>
            <div className='block-title'>
              <h2>Thông tin liên hệ</h2>
            </div>
            <div className='block-content'>
							<ul>
								<li><span className="font-bold">Địa chỉ : </span> <i>{info.address}</i></li>
								<li><span className="font-bold">Điện Thoại : </span> <i>{info.phoneNumber}</i></li>
								<li><span className="font-bold">Email : </span>{info.email}</li>
							</ul>
						</div>
            {/* <div className='block-content'>
              <ul>{footerLinks}</ul>
            </div> */}
          </div>
          
          <div className='footer-block col col-lg-2 col-md-2'>
            <div className='block-title'>
              <h2>Cửa hàng</h2>
              {/* <Newsletter /> */}
            </div>
            <div className='block-content'>
              <ul>{footerBusinessLinks}</ul>
            </div>
          </div>
        </div>
        {/* <ul className='footer-social-item'>
          <li>
            <a href='/#facebook' rel='noreferrer noopener' target='_blank'>
              <span className='facebook-icon' />
            </a>
          </li>
          <li>
            <a href='/#instagram' rel='noreferrer noopener' target='_blank'>
              <span className='instagram-icon' />
            </a>
          </li>
          <li>
            <a href='/#pinterest' rel='noreferrer noopener' target='_blank'>
              <span className='pinterest-icon' />
            </a>
          </li>
          <li>
            <a href='/#twitter' rel='noreferrer noopener' target='_blank'>
              <span className='twitter-icon' />
            </a>
          </li>
        </ul> */}
        <SocialShare/>
        <div className='footer-copyright'>
          <span>© {new Date().getFullYear()} {info.name}</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
