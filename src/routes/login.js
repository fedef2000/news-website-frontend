import { useRef, useState, useEffect } from 'react';
//import AuthContext from "../context/AuthProvider";
import Cookies from 'js-cookie'
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const LOGIN_URL = '/api/auth';
const Login = () => {
    //const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const token = Cookies.get('token')
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json'},
                }
            );
            const accessToken = response.data;
            //setAuth({accessToken});
            Cookies.set('token', accessToken, { expires: 7 })
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {(success || token) ? (
                <section>
                    <h1>Sei già loggato</h1>
                    <br />
                    <p>
                        <Link to="/post">Vai alla pagina per caricare un articolo</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="user">user:</label>
                        <input
                            type="text"
                            id="user"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <br/>
                        <button>Sign In</button>
                    </form>
                    <button onClick={()=>{navigate('/')}}>torna alla home</button>
                </section>
            )}
        </>
    )
}

export default Login