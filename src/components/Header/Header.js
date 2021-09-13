import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';

const Header = () => {

    const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);

    // const handleSignout = () => {
    //     setUserLoggedIn({});
    // }

    return (
        <div className="header">
            <img className="header-logo" src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/manage">Manage inventory</Link>
                <button onClick={() => setUserLoggedIn({})}>sign out</button>
            </nav>
        </div>
    );

}

export default Header;