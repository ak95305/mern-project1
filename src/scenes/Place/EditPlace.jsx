import React, { useCallback, useEffect, useReducer, useState } from 'react'
import App from '../../App'
import "./place.css"
import Input from '../../components/FormComponents/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../components/Utils/validators'
import Button from '../../components/FormComponents/Button'
import { useParams } from 'react-router-dom'
import { useForm } from '../../components/Utils/hooks/form-hook'

const allPlaces = [
  {
    id: 1,
    name: "New York Gate",
    desc: "lorem ipsum somthing more and more and more there you go",
    createdBy: 1
  },
  {
    id: 2,
    name: "Ludhiana Express",
    desc: "lorem ipsum somthing more and more and more there you go",
    createdBy: 2
  },
  {
    id: 3,
    name: "Punjab Junction",
    desc: "lorem ipsum somthing more and more and more there you go",
    createdBy: 3
  },
  {
    id: 4,
    name: "Delhi's hit",
    desc: "lorem ipsum somthing more and more and more there you go",
    createdBy: 2
  }
]

function EditPlace() {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().id
  
  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    },
    desc: {
      value: '',
      isValid: false
    }
  }, false)
  
  const place = allPlaces.find(p=>p.id === parseInt(placeId))

  useEffect(()=>{
    if(place){
      setFormData({
        title: {
          value: place.name,
          isValid: true
        },
        desc: {
          value: place.desc,
          isValid: true
        }
      }, true)

      setIsLoading(false);
    }
  }, [])
  
  if(formState.inputs.title.value === ""){
    return (
      <div className='create_place_form'>No Place Found</div>
    )
  }
  
  if(isLoading){
    return (
      <div className='create_place_form'>Loading...</div>
    )
  }
  
  return (
    <div className="create_place_form">
      <form action="">
        <Input 
          id="title"
          label="Title" 
          validator={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
        />
        <Input 
          id="desc"
          label="Description" 
          validator={[VALIDATOR_MINLENGTH(4)]}
          onInput={inputHandler}
          value={formState.inputs.desc.value}
          valid={formState.inputs.desc.isValid}
        />
        <Button type="primary" disabled={!formState.isValid}>Submit</Button>
      </form>
    </div>
  )
}

export default EditPlace