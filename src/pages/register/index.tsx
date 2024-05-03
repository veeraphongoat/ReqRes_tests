import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://reqres.in/api/register', {
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

      // Handle successful registration
      console.log('Registration successful:', data);
      router.push('/login'); // Redirect to Login page
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="email" id="email" placeholder="Your Email" value={email}
                          onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="password" id="password" placeholder="Your Password" value={password}
                          onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                    </div>
                    <div className="d-flex justify-content-center">
                      <input type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" value="Register" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
