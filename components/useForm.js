import { useReducer } from 'react'
// import { omit } from 'lodash'

const useForm = (callback, initialValues, validate) => {
  // το state εδώ κρατάει το record που προσθέτουμε/επεξεργαζόμαστε
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE STATE':
        // console.log('You sent', action.field, action.payload)
        validate({ [action.field]: action.payload })

        return {
          ...state,
          [action.field]: action.payload
        }
      // δεν δουλεύει
      case 'UPDATE SINGLE PRODUCT':
        console.log('state:', state)
        return {
          ...state,
          ...state.filter((prod) => prod.id !== action.payload.id),
          [action.field]: action.payload
        }
      case 'CLEAR FORM':
        return {
          name: '',
          category: '',
          pic: ''
        }
      default:
        console.log('in Hook, state:', state)
        return state
    }
  }, initialValues)

  //Form values
  // const [values, setValues] = useState({})

  // const resetForm = () => {
  //   setValues(initialValues)
  //   // setErrors({})
  // }

  //Errors 2η λύση να ξεκινήσω με errors, αλλά τα δείχνει από την αρχή...
  // const [errors, setErrors] = useState({
  //   // username: 'Username should have at least 5 letters',
  //   // email: 'Please enter a valid email address.',
  //   // password:
  //   //   'Password should contain at least 8 characters including uppercase and a number.'
  // })

  // κάνουμε validate (logάρει το error) MONO όταν φύγουμε από το textfield
  // const handleOnBlur = (event) => {
  //   // To stop default events
  //   event.persist()

  //   let name = event.target.name
  //   let val = event.target.value

  //   validate(event, name, val)
  // }

  // // ενημερώνεται το state
  // const handleChange = (event) => {
  //   // To stop default events
  //   event.persist()

  //   let name = event.target.name
  //   let val = event.target.value

  //   // validate(event, name, val)
  //   console.log('state:', name, val)

  //   // set these values in state
  //   setValues({
  //     ...values,
  //     [name]: val
  //   })
  // }

  // If length of errors is 0 and length of values is not zero (values are not empty) then it will call the callback function
  // else it will alert the user.
  const onSubmit = () => {
    // if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
    //   callback(values)
    // } else {
    //   alert(Object.keys(errors).length)
    // }
    console.log('in onSubmit..')
    if (validate()) {
      console.log('you validate')
      callback()
    } else {
      console.log(state.password, 'does not validate')
    }
  }

  // return {
  //   onSubmit,
  //   state,
  //   values,
  //   errors,
  //   handleChange,
  //   handleOnBlur
  // }
  return {
    onSubmit,
    state,
    dispatch
    // resetForm
  }
}

export default useForm
