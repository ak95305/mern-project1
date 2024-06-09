import React, { useEffect, useState } from "react";
import "./usersListing.css";
import UsersItem from "../../components/Users/UsersItem";
import axios from "axios";
import { useCookies } from "react-cookie";

function UsersListing() {
  const [cookie] = useCookies(["user", "user-token"]);
  const [isLoading, setIsLoading] = useState(true);
  const [didGetAllData, setDidGetAllData] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [users, setUsers] = useState([]);

  const handleGetUsers = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setIsLoading(true);
    }
  };

  let searchTimeout;
  const handleSearchUser = (searchText) => {
    if (searchTimeout) {
      clearInterval(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      setUsers([])
      setCurPage(1);
      setSearchText(searchText);
      setIsLoading(true);
    }, 1000);
  };

  useEffect(() => {
    if (isLoading == true) {
      try {
        axios
          .get(
            `http://localhost:3000/api/users?page=${curPage}&limit=8&search=${searchText}`,
            {
              headers: {
                Authorization: `Bearer ${cookie["user-token"]}`,
              },
            }
          )
          .then((resp) => {
            if (resp.data.users.length > 0) {
              setUsers([...users, ...resp.data.users]);
              setCurPage(curPage + 1);
            } else {
              setDidGetAllData(true);
              window.removeEventListener("scroll", handleGetUsers);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("here", err);
          });
      } catch (err) {
        console.log("catch", err);
      }
    }

    if (!didGetAllData) {
      window.addEventListener("scroll", handleGetUsers);
    }

    return () => {
      window.removeEventListener("scroll", handleGetUsers);
    };
  }, [isLoading, searchText]);

  return (
    <>
      <div className="users_listings">
        <div className="mb-3" style={{ minWidth: "540px" }}>
          <input
            type="text"
            onInput={(e) => handleSearchUser(e.target.value)}
            className="form-control"
            placeholder="Search"
          />
        </div>

        {users.map((item) => {
          return <UsersItem key={item.id + Math.random()} user={item} />;
        })}
        {isLoading && (
          <div
            className="spinner-border text-light d-block m-auto"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}

export default UsersListing;
