import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../../_actions/user_action";
import {withRouter} from 'react-router-dom'


import { style0 } from "../LandingPage/LandingPage";

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호 오류 ...')
        }

        const body = { email: Email, name: Name, password: Password };

        dispatch(registerUserAction(body)).then((response) => {
            console.log(response)
            if (response.payload.registerSuccess) {
                props.history.push("/login");
            } else {
                alert ("Failed to sign up")
            }
        });
    };

    return (
        <div style={style0} onSubmit={onSubmitHandler}>
            <form style={{ display: "flex", flexDirection: "column" }}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={onPasswordHandler}
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    value={ConfirmPassword}
                    onChange={onConfirmPasswordHandler}
                />

                <br />
                <button>Register</button>
            </form>
        </div>
    );
}

export default withRouter(RegisterPage);
