import React, { useContext, useState } from "react";
import "./auth.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../components/Utils/validators";
import Input from "../../components/FormComponents/Input";
import { useForm } from "../../components/Utils/hooks/form-hook";
import { AuthContext } from "../../components/Utils/contexts/auth-context";
import { Link, useLocation } from "react-router-dom";
import { animate } from "framer-motion";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
  const [formError, setFormError] = useState([]);
  const [cookie, setCookie] = useCookies(['user', 'user-token']);
  const [success, setSuccess] = useState(false);
  const auth = useContext(AuthContext);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const emailString = query.get("email");
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: emailString || "",
        isValid: emailString || false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const loginHandler = (e) => {
    e.preventDefault();
    animate(".head_progress", { width: 600 });
    animate(".create_place_form form", { opacity: 0.5 });

    e.preventDefault();
    let newUser = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };

    axios
      .post("http://localhost:3000/api/users/login", { ...newUser })
      .then((res) => {
        setFormError([])
        setSuccess(true)
        let user = res.data.user;
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1);
        setCookie('user', user, { expires: expireDate })
        setCookie('user-token', user.token, {expires: expireDate})
        auth.login()
      })
      .catch((err) => {
        setSuccess(false);
        if (err) {
          // Animate Form if something's wrong
          animate(
            ".create_place_form",
            {
              x: [0, 8, -8, 8, -8, 8, 0],
            },
            {
              duration: 0.6,
            }
          );

          let errorsMessage;
          let formErrorsList = [];
          if ((errorsMessage = err.response.data.message)) {
            formErrorsList = [...formErrorsList, errorsMessage];
          }

          if ((errorsMessage = err.response.data.errors)) {
            for (const field in errorsMessage) {
              formErrorsList = [...formErrorsList, [...errorsMessage[field]]];
            }
          }
          setFormError(formErrorsList);
        }
        setTimeout(() => {
          animate(".head_progress", { opacity: 0 }, { duration: 0.5 });
          setTimeout(() => {
            animate(
              ".head_progress",
              { width: 0, opacity: 1 },
              { duration: 0 }
            );
          }, 500);
        }, 500);
        animate(".create_place_form form", { opacity: 1 });
      })
  };

  return (
    // <App>
    <div className="create_place_form">
      <div className="head_progress"></div>
      <form action="" onSubmit={loginHandler}>
        {success && (
          <div className="alert alert-success" role="alert">
            User Logged In!
          </div>
        )}
        <Input
          id="email"
          label="Email"
          validator={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          value={formState.inputs.email.value}
          valid={formState.inputs.email.isValid}
        />
        <Input
          id="password"
          label="Password"
          validator={[VALIDATOR_MINLENGTH(4)]}
          onInput={inputHandler}
          value={formState.inputs.password.value}
          valid={formState.inputs.password.isValid}
        />
        <button className="btn btn-primary" disabled={!formState.isValid}>
          Login
        </button>
        {formError != "" &&
          formError.map((item, index) => {
            return (
              <label
                key={index}
                htmlFor=""
                className="d-block mt-2 text-danger"
              >
                {item}
              </label>
            );
          })}
        <p className="mt-2">
          New to Project1? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
    // </App>
  );
};

export default Login;
