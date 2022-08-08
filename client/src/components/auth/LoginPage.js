import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { showModal } from "../../store/ui";
import { LOGIN_MODAL } from "../modals/LoginModal";

const LoginPage = () => {
    const dispatch = useDispatch();

    // open login modal
    dispatch(showModal(LOGIN_MODAL));

    return <Redirect to="/" />
}

export default LoginPage;
