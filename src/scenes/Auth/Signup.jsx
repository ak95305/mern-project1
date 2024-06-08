import React, { useContext, useState } from 'react'
import './auth.css'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../components/Utils/validators'
import Input from '../../components/FormComponents/Input'
import { useForm } from '../../components/Utils/hooks/form-hook'
import { AuthContext } from '../../components/Utils/contexts/auth-context'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { animate } from 'framer-motion'

const Signup = () => {
  const [formError, setFormError] = useState([])
  const [success, setSuccess] = useState(false)
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm({
      email: {
        value: '',
        isValid: false
      },
      name: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
  }, false)

  const signupHandler = (e) => {
    animate(".head_progress", { width: 600 })
    animate(".create_place_form form", { opacity: 0.5 })

    e.preventDefault()
    let newUser = {
      email: formState.inputs.email.value,
      name: formState.inputs.name.value,
      password: formState.inputs.password.value
    }

    axios.post('http://localhost:3000/api/users/signup', { ...newUser })
    .then(res => {
      setFormError([])
      setSuccess(true)
      }).catch(err => {
        setSuccess(false)
        if(err){
          // Animate Form if something's wrong
          animate(".create_place_form", 
            { 
              x:[0, 8, -8, 8, -8, 8, 0],
            },
            {
              duration: .6
            }
          )

          let errorsMessage
          let formErrorsList = []
          if(errorsMessage = err.response.data.message)
          {
            formErrorsList = [...formErrorsList, errorsMessage]
          }
            
          if(errorsMessage = err.response.data.errors){
            for(const field in errorsMessage){
              formErrorsList = [...formErrorsList, [...errorsMessage[field]]]
            }
          }
          setFormError(formErrorsList)
        }
      }).finally(()=>{
        setTimeout(()=>{
          animate(".head_progress", { opacity: 0 }, { duration: .5 })
          setTimeout(()=>{
            animate(".head_progress", { width: 0, opacity: 1 }, { duration: 0 })
            }, 500)
        }, 500)
        animate(".create_place_form form", { opacity: 1 })
      })
  }

  return (
    // <App>
        <div className="create_place_form">
          <div className="head_progress"></div>
          <form action="" onSubmit={signupHandler}>
            { success && 
              <div className="alert alert-success" role="alert">
                User Created Successfully! Please Login <Link to={`/login?email=${formState.inputs.email.value}`}>Here</Link>
              </div>
            }
            <Input 
              id="name"
              label="Name" 
              validator={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              value={formState.inputs.name.value}
              valid={formState.inputs.name.isValid}
            />
            <Input 
              id="email"
              label="Email" 
              validator={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
              value={formState.inputs.email.value}
              valid={formState.inputs.email.isValid}
            />
            <Input 
              id="password"
              label="Password" 
              validator={[VALIDATOR_MINLENGTH(4)]}
              onInput={inputHandler}
              value={formState.inputs.password.value}
              valid={formState.inputs.password.isValid}
            />
            <button className="btn btn-primary" disabled={!formState.isValid} >Signup</button>
            { formError != '' &&
            formError.map((item, index) => {
              return <label key={index} htmlFor="" className='d-block mt-2 text-danger'>{ item }</label>
            })
            }
            <p className='mt-2'>Already Registered? <Link to="/login">Login</Link></p>

          </form>
        </div>
    // </App>
  )
}

export default Signup