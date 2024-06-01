import { useCallback, useReducer } from "react";


const formReducer = (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGE':
            let formValid = true;
            for (const inputId in state.inputs){
                if(inputId === action.inputId){
                formValid = formValid && action.isValid;
                }
                else{
                formValid = formValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                ...state.inputs,
                [action.inputId]: {
                    value: action.value,
                    isValid: action.isValid
                }
                },
                isValid: formValid
            }
        
        case "SET_DATA":
            return {
                ...state,
                inputs: action.inputs,
                isValid: action.valid
            }

        default:
            return state;
    }
}

export const useForm = (initialInputState, initialValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputState,
        isValid: initialValidity
    })
      
    const handleInput = useCallback((id, value, isValid) => {
        dispatch({
          type: 'INPUT_CHANGE',
          value: value,
          isValid: isValid,
          inputId: id
        });
    }, [])

    const setFormData = useCallback((formInputData, formValidity) => {
        dispatch({
            type: "SET_DATA",
            inputs: formInputData,
            valid: formValidity
        });
    }, []);

    return [formState, handleInput, setFormData];
}