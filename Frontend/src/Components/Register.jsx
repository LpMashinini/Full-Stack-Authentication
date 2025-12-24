import { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5001/register', values);
            
            if(res.data.status === "Success"){
                navigate('/login');
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

                <h2>Sign up</h2>

                <form onSubmit={handleSubmit}>

                    <div className='input-box'>
                        <label htmlFor="name">Name</label>
                        <input 
                        type="text" 
                        placeholder="Enter name" 
                        onChange={ e => setValues({...values, name: e.target.value})}
                        />
                    </div>

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

                    <button> Sign up </button>
                    <p>You agree our terms and policies.</p>
                    <Link to="/login" className='login'>Login</Link>

                </form>


            </div>

        </div>
    )
}

export default Register
