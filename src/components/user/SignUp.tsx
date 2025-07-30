import Form from "./Form";
import { changeFormType, createUser } from "../../store/userSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { Button } from "react-bootstrap";

export default function SignUp() {
    const dispatch = useAppDispatch();

    function changeForm() {
        dispatch(changeFormType("login"));
    }

    function handleRegister(email: string, password: string) {
        dispatch(createUser({ email, password }));
    }

    return (
        <div className="my-modal__signup-form">
            <h1 className="my-modal__form-title">Регистрация</h1>
            <Form title="Зарегистрироваться" handleClick={handleRegister} />
            <p>Уже есть аккаунт?</p>
            <Button variant="outline-primary" onClick={changeForm}>
                Войти
            </Button>
        </div>
    );
}
