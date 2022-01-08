export const OIDC_AUTHORITY = process.env.REACT_APP_AUTHORITY;
export const OIDC_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const domain = 'http://localhost:4200/';
export const OIDC_REDIRECT_URI = `${domain}callback/`;
export const OIDC_POST_LOGOUT_REDIRECT_URI = `${domain}auth/`;

export const API_URL = 'https://ip-147-251-124-112.flt.cloud.muni.cz/api/';
