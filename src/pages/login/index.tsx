import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import navbar from "../../../components/navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      // Handle successful login
      console.log('Login successful:', data);
      router.push('/listuser');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" >
              <div className="card-body p-5 text-center">
                <h1 className="fw-bold mb-2 text-uppercase ">Login</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-outline form-white mb-4">
                <label className="form-label"> Please enter your login and password!!</label>
                  <input type="email" id="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" />
                </div>
                <div className="form-outline form-white mb-4">
                  <input type="password" id="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                </div>
                <button className="btn btn-outline-light btn-success btn-lg px-5" type="submit">Login</button>
                <div>
                  <Link href={'/register'}>
                    <button type="button" className="btn btn-lg pink btn-success ">Register</button>
                  </Link>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
