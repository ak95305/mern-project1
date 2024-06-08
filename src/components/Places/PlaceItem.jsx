import React, { useContext } from 'react'
import './placeItem.css'
import { AuthContext } from '../Utils/contexts/auth-context';
import { Link } from 'react-router-dom';

function PlaceItem({ place, link }) {
  const auth = useContext(AuthContext);

  const handleDelete = () => {
    if(confirm("Are you sure you want to delete?")){
      console.log("DELETING...");
    }
  }

  return (
    <>
      <div className="card" style={{maxWidth: "1000px"}}>
        <img height={240} style={{objectFit: "cover"}} src="https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{ place.name }</h5>
          <p className="card-text">{ place.desc }</p>
          { auth.isLoggedIn && (
          <>
            <Link to={link} className="btn btn-primary">Edit</Link>
            <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete</button>
          </>
          )
        }
        </div>
      </div>
    </>
  )
}

export default PlaceItem