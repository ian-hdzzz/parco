import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";
import axios from 'axios';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

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
        const response = await axios.post('http://localhost:5707/create-user', {
            user: formData.email,
            pass: formData.password
        })
        if (response.status === 200) {
            // Navigate after successful registration
            navigate("/");
        } else {
            console.log("Error: ", response.data.message);
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
          Register with us
        </p>

        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="form-line">
            <div className="label-line">
              <label htmlFor="email" className="text-shadow">
                Enter your email
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
                Create a password
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
            <Button type="submit" text="Register" tabIndex={0} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;