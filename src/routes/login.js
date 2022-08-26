import { useRef, useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './login.css'
const LOGIN_URL = 'https://sindaco-del-calciomercato.herokuapp.com/api/auth';
export default function Login() {
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

    function handleLogOut(){
        Cookies.remove('token')
        setSuccess(false)
        window.location.reload()
    }

    return (
        <>
            {(success || token) ? (
                <div className='logged'>
                    <h2>Sei già loggato</h2>
                    <br />
                    <button onClick={()=>{navigate('/post')}}>Vai alla pagina per pubblicare un articolo</button>
                    <br />
                    <button onClick={handleLogOut}>Logout</button>
                </div>
            ) : (
                <section className='login--page'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="login--user"
                            placeholder='User'
                            type="text"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            autocapitalize="none"
                            required
                        />
                        <input
                            type="password"
                            className="login--password"
                            placeholder='Password'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <br/>
                        <button>Accedi</button>
                    </form>
                    <button onClick={()=>{navigate('/')}}>torna alla home</button>
                </section>
            )}
        </>
    )
}