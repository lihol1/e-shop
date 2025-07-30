import { CloseButton } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { resetError, setNotificationIsOpen } from "../../store/userSlice";
import { useEffect } from "react";
import { setModalIsOpen, setRegFormIsOpen } from "../../store/generalSlice";

export default function LoginNotification() {
    const { error, notificationIsOpen, message } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        error && dispatch(setNotificationIsOpen(true));
    }, [dispatch, setNotificationIsOpen, error]);

    function errorClickHandler() {
        dispatch(resetError());
        dispatch(setNotificationIsOpen(false));
    }
    function clickHandler() {
        dispatch(setNotificationIsOpen(false));
        dispatch(setRegFormIsOpen(false));
        dispatch(setModalIsOpen(false));
    }

    return (
        <>
            {notificationIsOpen &&
                (error ? (
                    <div className="my-modal__notification-wrapper">
                        <CloseButton onClick={errorClickHandler} className="my-modal__notification-close" />
                        <div className="my-modal__notification">
                           {/* <div className={`${!error ? "my-modal__notification-inner" : "my-modal__notification-inner--red"}`}> */}
                            <div className={`my-modal__notification-inner ${error && "my-modal__notification-inner--red"}`}>
                                <FontAwesomeIcon icon={faXmark} className="my-modal__sign my-modal__sign--red" />
                                <span className="my-modal__redtext">{error}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    message && (
                        <>
                            <div className="my-modal__notification-wrapper">
                                <CloseButton onClick={clickHandler} className="my-modal__notification-close" />
                                <div className="my-modal__notification">
                                    {/* <div className={`${!error ? "my-modal__notification-inner" : "my-modal__notification-inner--red"}`}> */}
                                    <div className={`my-modal__notification-inner ${error && "my-modal__notification-inner--red"}`}>
                                        <FontAwesomeIcon icon={faCheck} className="my-modal__sign my-modal__sign--green" />
                                        <span className="my-modal__greentext">{message}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                ))}
        </>
    );
}
