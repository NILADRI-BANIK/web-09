import Cookies from "js-cookie";

// const redirectToLogin = window.open(process.env.REACT_APP_SOCIAL_MEDIA_URL, "_self");
export const redirectToSocialMedia = () => {

    const currentUserIdCookie = JSON.parse(Cookies.get("EP_current_userId"));
    console.log(currentUserIdCookie);
    if (currentUserIdCookie === "currentUserId") return true;
		else return false;
};
