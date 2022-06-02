import { useState, useReducer } from 'react'
// import { omit } from 'lodash'

const useForm = (callback, initialValues, validate, setPreviewSource) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    validate({ [name]: value })
    setValues({
      ...values,
      [name]: value
    })
    // if (validateOnChange) validate({ [name]: value })
  }

  //Form values
  const [values, setValues] = useState({})

  const resetForm = () => {
    setValues(initialValues)
    setPreviewSource('')
    // setErrors({})
  }

  //Errors 2η λύση να ξεκινήσω με errors, αλλά τα δείχνει από την αρχή...
  // const [errors, setErrors] = useState({
  //   // username: 'Username should have at least 5 letters',
  //   // email: 'Please enter a valid email address.',
  //   // password:
  //   //   'Password should contain at least 8 characters including uppercase and a number.'
  // })

  // const validate = (name, value) => {
  //   // console.log('in Validation, received', event)

  //   switch (name) {
  //     case 'name':
  //       console.log('checking name')
  //       // console.log('το username βρέθηκε με <4 χαρακτήρες!', value.length) ΟΚ
  //       if (value.length <= 4) {
  //         console.log('************ brika error sto username')
  //         setErrors(
  //           {
  //             ...errors,
  //             // username: 'Username should have at least 5 letters'
  //             name: 'name should have at least 5 letters'
  //           },
  //           () => console.log('in Validation', errors)
  //         )
  //       } else {
  //         // set the error state empty or remove the error for username input

  //         //omit function removes/omits the value from given object and returns a new object
  //         let newObj = omit(errors, 'name')
  //         setErrors(newObj)
  //         console.log('removed errors:', errors)
  //       }
  //       break

  //     case 'email':
  //       console.log('email=', value)
  //       if (
  //         value === '' ||
  //         !new RegExp(
  //           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //         ).test(value)
  //       ) {
  //         console.log('********* brika error sto email')
  //         setErrors(
  //           {
  //             ...errors,
  //             email: 'Please enter a valid email address.'
  //           },
  //           () => console.log('in Validation', errors)
  //         )
  //       } else {
  //         let newObj = omit(errors, 'email')
  //         setErrors(newObj)
  //       }
  //       break

  //     case 'password':
  //       if (
  //         // value.length <= 4
  //         // !value ||
  //         !new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(
  //           value
  //         )
  //       ) {
  //         console.log('************ brika error sto password')
  //         setErrors(
  //           {
  //             ...errors,
  //             password:
  //               'Password should contain at least 8 characters including uppercase and a number.'
  //           },
  //           () => console.log('in Validation', errors)
  //         )
  //       } else {
  //         let newObj = omit(errors, 'password')
  //         setErrors(newObj)
  //       }
  //       break

  //     default:
  //       break
  //   }
  //   // console.log('errors:', errors)
  // }

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
    if (validate()) {
      console.log('you validate')
      callback()
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
    values,
    setValues,
    onSubmit,
    handleInputChange,
    resetForm
  }
}

export default useForm
