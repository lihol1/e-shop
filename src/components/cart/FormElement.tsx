import { memo } from "react";

type FormElementProps = {
    name: string;
    placeholder: string;
    text: string;
};

const FormElement = memo(({ name, placeholder, text }: FormElementProps) => {
    return (
        <>
            <label htmlFor={name} className="form-order__label">
                {text}
                {name !== "phone" && <span>&#42;</span>}
            </label>
            <input type="text" id={name} name={name} placeholder={placeholder} />
        </>
    );
});

export default FormElement;
