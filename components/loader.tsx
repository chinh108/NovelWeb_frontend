import React from 'react'
import { Spinner } from 'reactstrap'

function Loader() {
  return (
    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
      <div className="status">
        <Spinner
          color="secondary"
          size="40px"
        >
          Loading...
        </Spinner>
      </div>
    </div>
  )
}

export default Loader