import { useAppSelector } from "../../hooks/hooks";
import Login from "./Login";
import SignUp from "./SignUp";

export default function UserComponent() {
    const { formType } = useAppSelector((state) => state.user);
    const { regFormIsOpen } = useAppSelector((state) => state.general);

    return <>{regFormIsOpen ? formType === "signup" ? <SignUp /> : <Login /> : <></>}</>;
}
