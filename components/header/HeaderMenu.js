import { Link } from 'react-router-dom';
import './HeaderMenu.scss';

const HeaderMenu = () => {
    return (
        <nav className="header__menu">
            <ul className="header__menu-list">
                <li className="header__menu-item">
                    <Link to="/">Trang chủ</Link>
                </li>
                <li className="header__menu-item">
                    <Link to="/search">Thể loại</Link>
                </li>
                <li className="header__menu-item">
                    <Link to="/search">Trạng thái</Link>
                </li>
                <li className="header__menu-item">
                    <Link to="/search">Xem nhiều</Link>
                </li>
                <li className="header__menu-item">
                    <Link to="/search">Bình luận nhiều</Link>
                </li>
                <li className="header__menu-item">
                    <Link to="/search">Lưỡng long nhất thể</Link>
                </li>
                <li className="header__menu-item">
                    <Link to="/search">Năm</Link>
                </li>
                <li className="header__menu-item">
                    <Link to="">Hỏi-đáp</Link>
                </li>
                <li className="header__menu-item">
                    <Link to="/search">TV/Movie</Link>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenu;
