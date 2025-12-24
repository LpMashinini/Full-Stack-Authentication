import { Link , useNavigate} from "react-router-dom"
import { useState } from 'react'
import axios from "axios"

const Login = () => {


    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5001/login', values);

            if (res.data.status === "Success") {
                navigate('/');
            } else {
                alert("Error");
            }
        } catch (err) {
            console.error(err);

        }

    }
    
    return (

        <div className='register-container'>

            <div className='register'>

                <h2>Sign In</h2>

                <form onSubmit={handleSubmit}>

                    <div className='input-box'>
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email" 
                        placeholder="Enter email" 
                        onChange={ e => setValues({...values, email: e.target.value})}
                        />
                    </div>

                    <div className='input-box'>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        placeholder="Enter password" 
                        onChange={ e => setValues({...values, password: e.target.value})}
                         />
                    </div >

                    <button>Login</button>
                    <p>You agree our terms and policies.</p>
                    <Link to="/register" className='login'>Create Account</Link>

                </form>


            </div>

        </div>
    )
}

export default Login
