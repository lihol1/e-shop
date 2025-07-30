import { useState } from "react";
import { Button } from "react-bootstrap";

type FormProps = {
    title: string;
    handleClick: (email: string, pass: string) => void;
};

export default function Form({ title, handleClick }: FormProps) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div className="my-modal__reg-form reg-form">
            <input type="email" value={email} className="reg-form__input" onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" />
            <input type="password" value={pass} className="reg-form__input" onChange={(e) => setPass(e.target.value)} placeholder="Введите пароль" />
            <Button className="reg-form__btn" onClick={() => handleClick(email, pass)}>{title}</Button>
        </div>
    );
}
