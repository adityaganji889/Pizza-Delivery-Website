import React from 'react'
import {Alert} from 'react-bootstrap'

function Error(props) {
  const {error} = props
  return (
    <Alert variant={"danger"}>
          {error}
    </Alert>
  )
}

export default Error