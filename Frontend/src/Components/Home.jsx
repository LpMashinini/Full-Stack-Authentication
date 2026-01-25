import { use, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";

const Home = () => {

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');


  axios.defaults.withCredentials = true;

  useEffect(() => {

    axios.get('http://localhost:5001').then(res => {

      if (res.data.status === "Success") {
        setAuth(true);
        setName(res.data.name);
      } else {
        setAuth(false);
        setMessage(res.data.Error)
      }

    }).catch(err => {
      console.error(err);
    });

  }, []);
  

  const handleDelete = async () => {

    try {
       const res = await axios.get('http://localhost:5001/logout');

       if(res){
        location.reload();
       }
    } catch (error) {
      console.log(err);
      
    }
    
  }



  return (
    <div>

      {
        auth ?
          <div>
            <h3>you are authorized {name}</h3>
            <button onClick={handleDelete}>Logout</button>
          </div>
          :
          <div>
            <h3>{message}</h3>
            <h3>login now</h3>
            <Link to="/login">Login</Link>
          </div>
      }

    </div>
  )
}

export default Home
