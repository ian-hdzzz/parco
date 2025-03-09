import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";
import axios from 'axios';
import { useUser } from '../UserContext';

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUserData } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    console.log("in handle submit")

    try {
        const response = await axios.get('http://localhost:5707/sign-in', {
          params: {
            user: formData.email,
            pass: formData.password
          }
        })
        console.log("sign in successful")
        if (response.status === 200) {
          console.log("response data on good sign in: ", response.data)
          setUserData({
            id: response.data.id,
            email: formData.email,
            ticketInfo: response.data.ticketInfo
          });

          if (response.data.ticketInfo === null) {
              console.log("User has no active ticket");
              navigate("/home");
          } else {
              navigate("/home");
          }
      }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="flex flex-v-center flex-h-center h-full">
      <div className="bg" />
      <div className="text">
        <h1 className="text-shadow" style={{ textAlign: "center" }}>
          Welcome to Parco 2.0
        </h1>
        <p className="text-shadow" style={{ textAlign: "center" }}>
          Please sign in to your account
        </p>

        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="form-line">
            <div className="label-line">
              <label htmlFor="email" className="text-shadow">
                User
              </label>
            </div>
            <Input
             tabIndex={0}
              required
              name="email"
              type="email"
              placeholder="Enter your username/email"
              value={formData.email} 
              onChange={handleChange}
            />
            <div className="label-line" style={{ marginTop: '0.5rem' }}>
              <label htmlFor="email" className="text-shadow">
                Password
              </label>
            </div>
            <Input
             tabIndex={0}
              required
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password} 
              onChange={handleChange}
            />
          </div>

          <div className="form-line">
            <Button type="submit" text="Get my ticket" tabIndex={0} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/sign-up" style={{ color: 'orange', textDecoration: 'underline' }}>
              I don't have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;