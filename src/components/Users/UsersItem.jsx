import React from 'react'
import './usersItem.css'

function UsersItem(props) {
  return (
    <>
    <a href={`/user/${props.user.id}`}>
      <div className="user_item_card card mb-3" style={{maxWidth: "540px"}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.user.name}</h5>
              <p className="card-text">{props.user.desc}</p>
              <p className="card-text">Places: <small className="text-body-secondary">{props.user.placesCount}</small></p>
            </div>
          </div>
        </div>
      </div>
    </a>
    </>
  )
}

export default UsersItem