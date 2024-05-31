import React from 'react'
import App from '../../App'
import "./usersPlaces.css"
import PlaceItem from '../../components/Places/PlaceItem'
import { useParams } from 'react-router-dom'

function UserPlaces() {
  const allPlaces = [
    {
      id: 1,
      name: "New York Gate",
      desc: "lorem ipsum somthing more and more and more there you go",
      createdBy: 1
    },
    {
      id: 2,
      name: "Ludhiana Express",
      desc: "lorem ipsum somthing more and more and more there you go",
      createdBy: 2
    },
    {
      id: 3,
      name: "Punjab Junction",
      desc: "lorem ipsum somthing more and more and more there you go",
      createdBy: 3
    },
    {
      id: 4,
      name: "Delhi's hit",
      desc: "lorem ipsum somthing more and more and more there you go",
      createdBy: 2
    }
  ]

  const userId = useParams().id;
  
  const places = allPlaces.filter(item => item.createdBy === parseInt(userId));

  return (
    <App>
        <div className="place_listings">
          {places.map(item=>{
            return <PlaceItem key={item.id} place={item} link={`/place/${item.id}`}/>
          })}
        </div>
    </App>
  )
}

export default UserPlaces