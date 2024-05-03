import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch user data to populate form
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        const userData = await response.json();
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
  
      const data = await response.json();
      console.log(data);
  
      // Show alert upon successful submission
      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="gradient">
      <div className="user">
      <div>
        <label className = "la" htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} className="l"
        />
      </div>
      <div>
        <label className = "la" htmlFor="email">Job:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} className="l"
        />
      </div>
      <button className = "bt" type="button" onClick={handleSubmit}>Submit</button>
    </div>
      
    </div>
    
  );
}
