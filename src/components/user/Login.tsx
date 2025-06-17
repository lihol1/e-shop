import Form from "./Form";
import { changeFormType, loginUser, setNotificationIsOpen } from "../../store/userSlice";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../hooks/hooks";

export default function Login() {
    const dispatch = useAppDispatch();

    const handleLogin = (email: string, password: string) => {
        dispatch(loginUser({ email: email, password: password }));
        dispatch(setNotificationIsOpen(true));
    };

    function changeForm() {
        dispatch(changeFormType("signup"));
    }

    return (
        <div className="my-modal__login-form">
            <h1 className="my-modal__form-title">Вход</h1>
            <Form title="Войти" handleClick={handleLogin} />
            <p>Еще нет аккаунта?</p>
            <Button variant="outline-primary" onClick={changeForm}>
                Зарегистрироваться
            </Button>
        </div>
    );
}
