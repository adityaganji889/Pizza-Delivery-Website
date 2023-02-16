import React from 'react'
import {Alert} from 'react-bootstrap'

function Success(props) {
  const {success,message} = props
  return (
    <div>
      <Alert variant={success?"success":"danger"}>
        {message}
      </Alert>
    </div>
  )
}

export default Success