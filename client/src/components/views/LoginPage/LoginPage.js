import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../../_actions/user_action";
import {withRouter} from 'react-router-dom'

import { style0 } from "../LandingPage/LandingPage";

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const body = { email: Email, password: Password };

        dispatch(loginUserAction(body)).then((response) => {
            console.log(response)
            if (response.payload.loginSuccess) {
                props.history.push("/");
            }
        });
    };

    return (
        <div style={style0} onSubmit={onSubmitHandler}>
            <form style={{ display: "flex", flexDirection: "column" }}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={onPasswordHandler}
                />

                <br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default withRouter(LoginPage);
