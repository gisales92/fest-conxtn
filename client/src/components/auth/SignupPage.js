import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { showModal } from "../../store/ui";
import { SIGNUP_MODAL } from "../modals/SignupModal";

const SignupPage = () => {
    const dispatch = useDispatch();

    // open signup modal
    dispatch(showModal(SIGNUP_MODAL));

    // redirect to home
    return <Redirect to="/" />
}

export default SignupPage;
