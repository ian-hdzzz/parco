import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Simplemente usar la fecha actual en formato string local
    const timestamp = new Date().toLocaleString();
    
    // Navegar a la página de tickets pasando email y timestamp
    navigate("/cards", { state: { email, timestamp } });
  };

  return (
    <div className="flex flex-v-center flex-h-center h-full">
      <div className="bg" />
      <div className="text">
        <h1 className="text-shadow" style={{ textAlign: "center" }}>
          Welcome to Parco 2.0
        </h1>
        <p className="text-shadow" style={{ textAlign: "center" }}>
          Please sign in to your account or sign up a new account.
        </p>

        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="form-line">
            <div className="label-line">
              <label htmlFor="email" className="text-shadow">
                Email
              </label>
            </div>
            <Input
             tabIndex={0}
              required
              name="email"
              type="email"
              placeholder="Please enter your email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="form-line">
            <Button type="submit" text="Get my ticket" tabIndex={0} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;