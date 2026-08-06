import { LoginForm } from '../components/organisms/LoginForm';

export const LoginPage = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-6 col-lg-4">
                <LoginForm />
            </div>
        </div>
    );
};