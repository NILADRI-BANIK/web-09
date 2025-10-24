import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCurrentData, fetchDefaultTemplate, fetchPrevUserTemplate, fetchTemplateData, fetchUserData, saveTokenData } from "../redux/slice/authSlice";
import axios from "./Hooks/axios";

const Routes = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { personaUserId, currentUserId, token, templateId, viewMode } = useParams();

	useEffect(() => {
		axios.defaults.headers.authorization = token ; 
		if (templateId && token && !viewMode) {
			console.log("templateId, token", templateId, token);
			Cookies.set("EP_token", token);
			Cookies.remove("EP_persona_userId");
			Cookies.remove("EP_current_userId");
			Cookies.remove("EP_viewMode");
			
			if (token === undefined) return;
			if (token) dispatch(saveTokenData(token));
			
			if (templateId === undefined) return;
			if (templateId) dispatch(fetchDefaultTemplate(templateId));
			
			navigate(`/${templateId}`, { replace: true, state: { templateId, token } });
		} else if (personaUserId && currentUserId && token && !viewMode) {
			console.log(personaUserId, currentUserId, token);
			Cookies.set("EP_persona_userId", JSON.stringify(personaUserId));
			Cookies.set("EP_current_userId", JSON.stringify(currentUserId));
			Cookies.set("EP_token", token);
			Cookies.remove("EP_viewMode");

			if (token === undefined) return;
			if (token) dispatch(saveTokenData(token));

			if (personaUserId === undefined) return;
			if (personaUserId) dispatch(fetchUserData(personaUserId));

			if (currentUserId === undefined) return;
			if (currentUserId) dispatch(fetchCurrentData(currentUserId));

			if (personaUserId === undefined) return;
			if (personaUserId) dispatch(fetchTemplateData(personaUserId));

			if (personaUserId === undefined) return;
			axios
				.get(`/persona/user-template/${personaUserId}`)
				.then(({ data }) => {
					navigate(`/${data[0].templateId}`, { replace: true, state: { personaUserId, currentUserId, token } });
				})
				.catch((e) => console.log(e));
		} else if (personaUserId && templateId && token && viewMode) {
			console.log("viewMode => ", viewMode);
			Cookies.set("EP_viewMode", viewMode);

			if (token === undefined) return;
			if (token) dispatch(saveTokenData(token));

			if (personaUserId === undefined) return;
			if (personaUserId) dispatch(fetchPrevUserTemplate(personaUserId));

			if (personaUserId === undefined) return;
			navigate(`/${templateId}`, { replace: true, state: { personaUserId, token, viewMode } });
		}
	}, [personaUserId, currentUserId, token]);
};

export default Routes;
