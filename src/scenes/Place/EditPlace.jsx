import React, { useCallback, useReducer } from 'react'
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
  const placeId = useParams().id
  const place = allPlaces.find(p=>p.id === parseInt(placeId))

  const [formState, inputHandler] = useForm({
    title: {
      value: place.name,
      isValid: true
    },
    desc: {
      value: place.desc,
      isValid: true
    }
  }, false)

  return (
    <App>
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
            <Button className="btn-primary" disabled={!formState.isValid}>Submit</Button>
          </form>
        </div>
    </App>
  )
}

export default EditPlace