/**
 *
 * Footer
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Newsletter from '../../../containers/Newsletter';
import SocialShare from '../../Store/SocialShare'

const Footer = () => {
  const infoLinks = [
    { id: 0, name: 'Contact Us', to: '/contact' },
    { id: 1, name: 'Sell With Us', to: '/sell' },
    { id: 2, name: 'Shipping', to: '/shipping' }
  ];

  const footerBusinessLinks = (
    <ul className='support-links'>
      <li className='footer-link'>
        <Link to='/dashboard'>Account Details</Link>
      </li>
      <li className='footer-link'>
        <Link to='/dashboard/orders'>Orders</Link>
      </li>
    </ul>
  );

  const footerLinks = infoLinks.map(item => (
    <li key={item.id} className='footer-link'>
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    <footer className='footer'>
      <Container>
        <div className='footer-content'>
          <div className='footer-block'>
            <div className='block-title'>
              <h2>Liên hệ</h2>
            </div>
            <div className='block-content'>
							<ul>
								<li><span className="font-bold">Địa chỉ : </span> <i>Số 194 đường Kiều Hạ, Phường Đông Hải 2, Quận Hải An, Thành phố Hải Phòng.</i></li>
								<li><span className="font-bold">Điện Thoại : </span> <i>+84 (0) 225 397 9952</i></li>
								<li><span className="font-bold">Fax : </span> <i>+84 (0) 225 397 9951</i></li>
								<li><span className="font-bold">Email : </span>hhppaper@gmail.com</li>
								<li><span className="font-bold">Hotline Hỗ Trợ Khách Hàng : </span>+84 (0) 983 239 288</li>
							</ul>
						</div>
            {/* <div className='block-content'>
              <ul>{footerLinks}</ul>
            </div> */}
          </div>
          <div className='footer-block'>
            <div className='block-title'>
              <h2>Links</h2>
            </div>
            <div className='block-content'>
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className='footer-block'>
            <div className='block-title'>
              <h2>Newsletter</h2>
              <Newsletter />
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
          <span>© {new Date().getFullYear()} Paper Store</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
