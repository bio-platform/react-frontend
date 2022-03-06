export const OIDC_AUTHORITY = process.env.REACT_APP_AUTHORITY;
export const OIDC_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

let domain = 'http://localhost:4200/';
let api = 'https://bio-portal.metacentrum.cz/';
if (window.location.hostname === 'localhost') {
	domain = 'http://localhost:4200/';
	api = 'https://bio-portal.metacentrum.cz/';
} else if (window.location.hostname === 'bio-portal.metacentrum.cz') {
	domain = 'https://bio-portal.metacentrum.cz/';
	api = 'https://bio-portal.metacentrum.cz/';
} else if (
	window.location.hostname === 'ip-147-251-124-112.flt.cloud.muni.cz'
) {
	domain = 'https://ip-147-251-124-112.flt.cloud.muni.cz/';
	api = 'https://ip-147-251-124-112.flt.cloud.muni.cz/';
}

export const OIDC_REDIRECT_URI = `${domain}callback/`;
export const OIDC_POST_LOGOUT_REDIRECT_URI = `${domain}auth/`;

export const API_URL = `${api}api/`;
