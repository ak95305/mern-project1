import React, { useCallback, useReducer } from 'react'
import App from '../../App'
import "./place.css"
import Input from '../../components/FormComponents/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../components/Utils/validators'
import Button from '../../components/FormComponents/Button'
import { useForm } from '../../components/Utils/hooks/form-hook'
import axios from 'axios'
import { useCookies } from 'react-cookie'

function CreatePlace() {
  const [cookie] = useCookies(['user', 'user-token']);
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

    let newPost = {
      name: formState.inputs.title.value,
      desc: formState.inputs.desc.value
    };
    
    axios
      .post("http://localhost:3000/api/places/", { ...newPost }, { 
        headers: {
          Authorization: `Bearer ${cookie["user-token"]}`
        }
      })
      .then((resp)=>{
        console.log(resp)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  return (
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
  )
}

export default CreatePlace