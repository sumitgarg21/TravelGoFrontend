import React, { Component } from 'react'
export class Spinner extends Component {
  render() {
    return (
      <>
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    )
  }
}

export default Spinner