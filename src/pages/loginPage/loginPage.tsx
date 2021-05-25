import React, {useMemo} from "react";
import {RouteProps} from "react-router";
import {PageContainer} from "../pageContainer/pageContainer";
import {Login} from "../../components/login/login";


export function LoginPage(props: RouteProps) {
    const register = useMemo(() => {
        return !!props.location?.pathname.includes("register")
    }, [props]);

    return (
        <PageContainer>
            <Login isRegister={register}/>
        </PageContainer>
    );
}