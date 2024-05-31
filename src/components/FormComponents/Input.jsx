import React, { useEffect, useReducer } from 'react'
import { validate } from '../Utils/validators';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validator),
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

function Input({ id, label, validator, onInput, value, valid }) {
    const [inputState, dispatch] = useReducer(inputReducer, {value: value || '', isValid: valid || false, isTouched: false});
    
    const changeHandler = event => {
        dispatch({
            val: event.target.value, 
            type: 'CHANGE',
            validator: validator
        })
    }
    
    const handleTouch = () => {
        dispatch({
            type: 'TOUCH',
        })
    }

    useEffect(() => {
        onInput(id, inputState.value, inputState.isValid)
    }, [onInput, id, inputState.value, inputState.isValid])

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{ label }</label>
            <input 
                type="text"
                className={`form-control ${ !inputState.isValid && inputState.isTouched && "is-invalid"}`} 
                id={id}
                onChange={changeHandler}
                value={inputState.value}
                onBlur={handleTouch}
            />
            { !inputState.isValid && inputState.isTouched && <div className="invalid-feedback">{label} is Invalid.</div> }
        </div>
    )
}

export default Input