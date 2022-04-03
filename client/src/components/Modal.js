import React from 'react'


function Modal({closeModal}) {
        return (
            <div className="modalBackground">
            <div className="modalContainer">
              <div className="titleCloseBtn">
                <button onClick={() => closeModal(false)}>  X </button>
                </div>
            <div className="title">
                <h1>Are You Sure You Want to Continue?</h1>
            </div>
            <div className="body">
                <p></p>
            </div>
            <div className="footer">
                <button id='cancelbtn' onClick={() => closeModal(false)}>
                  Cancel
                </button>
                <button>Continue</button>
              </div>
            </div>
          </div>
        )
}
export default Modal;