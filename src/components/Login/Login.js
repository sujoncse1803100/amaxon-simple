import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleFacebookSignIn, handleGoogleSignIn, handleSignOut, initializedLoginFramework, signInEmailAndPassword, signUpEmailAndPassword } from './LoginManager';

initializedLoginFramework();


function Login() {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        displayName: '',
        email: '',
        photoURL: '',
        isLoggedIn: false,
        password: '',
        success: '',
        error: '',
    })

    const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);
    setUserLoggedIn(userLoggedIn);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const handleResponse = (res, redirects) => {
        setUser(res);
        setUserLoggedIn(res);
        if (redirects) {
            history.replace(from);
        }
    }

    const googleSignedIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const facebookSignIn = () => {
        handleFacebookSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            signUpEmailAndPassword(user.displayName, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault(); //for prevent reload page.......
    }

    const handleBlur = (e) => {
        let isFieldValid;

        if (e.target.name === 'name') {
            isFieldValid = e.target.value.length ? true : false;
            console.log(isFieldValid);
        }

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            console.log(isFieldValid);
        }

        if (e.target.name === 'password') {
            isFieldValid = e.target.value.length > 6 && /\d{1}/.test(e.target.value);
            console.log(isFieldValid);
        }

        if (isFieldValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }

    }



    return (
        <div className="text-center">
            {
                user.success &&
                <Link to="/shipment"></Link>
            }
            <div className="mt-3">
                <input style={{ fontSize: '2rem' }} onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" />
                <label style={{ fontSize: '1.2rem', marginLeft: '20px', marginBottom: '30px' }} htmlFor="newUser">I am new user </label>
                <div className="col-lg-6 col-12 ps-5 pe-5 m-auto">
                    <form onSubmit={handleSubmit} style={{ boxShadow: '0px 5px 7px 7px gray' }} className="border border-secondary p-3 bg-warning rounded">
                        {newUser &&
                            <input
                                className="mt-1 text-center form-control ps-2"
                                name="displayName" id="nameId"
                                type="text" required
                                onBlur={handleBlur}
                                placeholder="Your Name"
                            />
                        }
                        <br />
                        <input
                            className=" text-center form-control ps-2"
                            name="email" id="emailId"
                            type="email" required
                            onBlur={handleBlur}
                            placeholder="Email Address"
                        /><br />
                        <input
                            className="text-center form-control ps-2"
                            name="password" id="passwordId"
                            type="password" required
                            onBlur={handleBlur}
                            placeholder="Password"
                        /><br />
                        <input className="mt-1 text-center form-control w-50 m-auto btn-success" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                    </form>

                    <div className="mt-3">
                        {
                            user.success && <h3>{user.success}</h3>
                        }
                        {
                            user.error && <h3>{user.error}</h3>
                        }
                    </div>
                </div>

            </div>
            {/* <div>
                {
                    user.isLoggedIn &&
                    <div className="mt-3">
                        <img style={{ width: '100px', borderRadius: '50%' }} src={user.photoURL} alt="" />
                        <h3 className="mb-1 mt-1" style={{ fontStyle: 'italic' }} >Welcome, Mr. {user.displayName}</h3>
                        <h4>Email : {user.email}</h4>
                    </div>
                }
            </div> */}
            <div>
                {
                    user.isLoggedIn ? <button onClick={signOut} className="btn mt-5 mb-5 btn-primary">Google sign out</button> :
                        <button onClick={googleSignedIn} className="btn mt-5 mb-1 btn-primary">Google sign In</button>
                }
                <br />
                {
                    <button onClick={facebookSignIn} className="btn mt-1 mb-5 btn-primary">FaceBook sign In</button>
                }
            </div>


        </div>
    );
}

export default Login;
