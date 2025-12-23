import { Link } from "react-router-dom"

const Login = () => {
    return (

        <div className='register-container'>

            <div className='register'>

                <h2>Sign In</h2>

                <form>

                    <div className='input-box'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter email" />
                    </div>

                    <div className='input-box'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" />
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
