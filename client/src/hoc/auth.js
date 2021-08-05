import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../_actions/user_action";

//옵션: null (누구든지), true (로그인 유저만 출입), false (로그인유저 출입불가)

export default function auth(SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        console.log(">>>>>>>>>>>>>");

        useEffect(() => {
            dispatch(authAction()).then((response) => {
                console.log("<<<<<", response);

                //로그인 하지 않는 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push("/login");
                    }
                } else {
                    //로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push("/");
                    } else {
                        if (option === false) props.history.push("/");
                    }
                }
            });
        }, []);

        return <SpecificComponent />;
    }

    return AuthenticationCheck;
}
