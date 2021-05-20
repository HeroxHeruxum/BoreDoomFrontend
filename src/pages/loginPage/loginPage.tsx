import { RouteProps } from 'react-router';
import { PageContainer } from '../pageContainer/pageContainer';
import { LoginContainer } from '../../components/loginContainer/loginContainer';


export function LoginPage(props: RouteProps): JSX.Element {
    const register = !!props.location?.pathname.includes("register");

    return (
        <PageContainer>
            <LoginContainer isRegister={register}/>
        </PageContainer>
    );
}