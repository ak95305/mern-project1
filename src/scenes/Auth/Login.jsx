import React, { useContext } from 'react'
import App from '../../App'
import './auth.css'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../components/Utils/validators'
import Button from '../../components/FormComponents/Button'
import Input from '../../components/FormComponents/Input'
import { useForm } from '../../components/Utils/hooks/form-hook'
import { AuthContext } from '../../components/Utils/contexts/auth-context'

const Login = () => {
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm({
        email: {
          value: '',
          isValid: false
        },
        password: {
          value: '',
          isValid: false
        }
    }, false)

    const loginHandler = (e) => {
      e.preventDefault()
      console.log("hey");
      auth.login();
      console.log(auth);
    }


  return (
    // <App>
        <div className="create_place_form">
          <form action="" onSubmit={loginHandler}>
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
            <button className="btn btn-primary" disabled={!formState.isValid} >Login</button>
          </form>
        </div>
    // </App>
  )
}

export default Login