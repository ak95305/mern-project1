import React from 'react'
import './usersListing.css'
import UsersItem from '../../components/Users/UsersItem'
import App from '../../App'

function UsersListing() {
  const users = [
    {
      id: 1,
      name: "Franklin",
      desc: "lorem ipsum somthing more and more and more there you go",
      placesCount: 12
    },
    {
      id: 2,
      name: "George",
      desc: "lorem ipsum somthing more and more and more there you go",
      placesCount: 12
    },
    {
      id: 3,
      name: "Missy",
      desc: "lorem ipsum somthing more and more and more there you go",
      placesCount: 12
    }
  ]

  return (
    <>
      <App>
        <div className="users_listings">
          {users.map((item)=>{
            return <UsersItem key={item.id} user={item}/>
          })}
        </div>
      </App>
    </>
  )
}

export default UsersListing