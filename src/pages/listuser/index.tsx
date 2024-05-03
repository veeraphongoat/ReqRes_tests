import React, { useEffect, useState } from "react";
import Link from 'next/link';

export default function User() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setUsers(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/delete/${id}`, {
      method: "DELETE"
    });

  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/edit/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }), // Send name and job in the request body
      });

      const data = await response.json();
      const status = await response.status;

      console.log(data); // Log the data to the console
      console.log("status", status);

      setIsEditing(false); // Close the dialog after submitting the form
    } catch (error) {
      console.error(error); // Log any errors
    }
  };
  const handleEdit = (id: any) => {
    setIsEditing(true); // Show the dialog when the Edit button is clicked
    setSelectedId(id); // Store the selected user id
  };

  return (
    <div className="container-n">
      <div className="row">
        <div className="col-md-8">
          <div className="people-nearby">
            <h1 className="fw-bold mb-2 text-uppercase ">List User</h1>
            <div className="nearby-user user-card">
              {users.map((user) => (
                <div className="user-card">
                  <div className="profile-container">
                    <div className="row">
                      <div className="col-md-2 col-sm-2">
                        <img src={user.avatar} alt="User Avatar" className="profile-photo-lg" />
                      </div>
                      <div className="col-md-7 col-sm-7">
                        <h5><a className="profile-link">Name:</a>{`${user.first_name} ${user.last_name}`}</h5>
                        <p>Email: {user.email}</p>
                      </div>
                      <div className="col-md-3 col-sm-3">
                        <Link href={'/edit'}>
                          <button type="button" className="btn btn-primary pull-right" onClick={() => handleEdit(user.id)}>Edit</button>
                        </Link>
                      </div>
                      <div className="col-md-3 col-sm-3">
                        <button type="button" className="btn btn-succes" onClick={() => handleDelete(user.id)} >Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

