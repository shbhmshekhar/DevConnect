import React, { Fragment, useState } from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('SUCCESS');
    // if (password !== password2) {
    //   console.log('Password do not match');
    // } else {
    //   console.log('SUCCESS');
    //   const newUser = {
    //     name,
    //     email,
    //     password,
    //   };
    //   try {
    //     const config = {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     };

    //     const body = JSON.stringify(newUser);

    //     const res = await axios.post('/api/users', body, config);

    //     console.log(res);
    //   } catch (error) {
    //     console.error(error.response.data);
    //   }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Donn't have an account <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
