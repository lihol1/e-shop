import { useAppSelector } from "./hooks";

export default function useAuth() {
    const { currentUser } = useAppSelector((state) => state.user);
    return {
        isAuth: !!currentUser.email,
        email: currentUser.email,
        id: currentUser.id,
        token: currentUser.token,
    };
}
