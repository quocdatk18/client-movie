import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss'
import { FacebookOutlined, MailOutlined } from '@ant-design/icons';

export default function Footer() {
    return (
        <div className='footer'>
            <div className="footer--div">
                <div className="div-left">
                    <h1>
                        <Link to='/'>xem anime</Link>
                    </h1>
                    <span>© 2022 By Quoc Dat</span>
                </div>
                <div className="div-right">
                    <div className="fb">
                        <a href="https://www.facebook.com/quocdatlop109">
                            <FacebookOutlined style={{ color: '#333' }} className='icons' />
                            <h1>facebook</h1>
                        </a>
                    </div>
                    <div className="email">
                        <MailOutlined style={{ color: '#333' }} className='icons' />
                        <h1>quocdatlop109@gmail.com</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
