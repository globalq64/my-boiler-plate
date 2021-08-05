import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";

export const style0 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
};

const LandingPage = (props) => {
    // useEffect(() => {
    //     axios.get("/api/hello").then((response) => {
    //         console.log(response);
    //     });
    // }, []);

    const onClickHandler = () => {
        axios.get("/api/users/logout").then((response) => {
            console.log("======CCCC====");

            if (response.data.success) {
                console.log("CCCC====");
                props.history.push("/login");
            } else {
                alert("로그아웃 실패 ...");
            }
            console.log("OKOKOKOKOKOK====");
        });
    };

    return (
        <div style={style0}>
            <h1>시작 페이지</h1>
            <br />
            <button onClick={onClickHandler}>로그 아웃</button>
        </div>
    );
};

export default withRouter(LandingPage);
