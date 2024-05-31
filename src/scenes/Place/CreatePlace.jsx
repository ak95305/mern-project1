import React, { useCallback, useReducer } from 'react'
import App from '../../App'
import "./place.css"
import Input from '../../components/FormComponents/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../components/Utils/validators'
import Button from '../../components/FormComponents/Button'
import { useForm } from '../../components/Utils/hooks/form-hook'

function CreatePlace() {
  
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    desc: {
      value: '',
      isValid: false
    }
  }, false)
  
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState);
  }

  return (
    <App>
        <div className="create_place_form">
          <form action="" onSubmit={formSubmitHandler}>
            <Input 
              id="title"
              label="Title" 
              validator={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
            <Input 
              id="desc"
              label="Description" 
              validator={[VALIDATOR_MINLENGTH(4)]}
              onInput={inputHandler}
            />
            <Button className="btn-primary" disabled={!formState.isValid}>Submit</Button>
          </form>
        </div>
    </App>
  )
}

export default CreatePlace