import axios from "axios";
import Cookies from "js-cookie";

const cookiesToken = Cookies.get("EP_token");
let token = "";
if (cookiesToken === undefined)
	token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NmJiZmI5YjMwYzFlZDRiMjI0M2YiLCJpYXQiOjE2OTI5NTM1MzV9.o1TCqFNaTz2XtM-elKfl7kK4HZmh8wY0qLObQD1QscY";
else token = Cookies.get("EP_token");

const Instance = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_API_URL}/api`,
	headers: {
		authorization: token,
	},
});

export default Instance;
