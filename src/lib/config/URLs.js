/* eslint-disable no-undef */
const APP_URL = process.env.REACT_APP_API_URL || 'https://api.patca.ph';
export const HOME = process.env.REACT_APP_HOME_URL || 'https://patca.ph';
export const API_BASE_URL = `${APP_URL}/v1`;
export const SANCTUM = `${APP_URL}/sanctum/csrf-cookie`;
export const DASHBOARD = `${APP_URL}/dashboard`;

/** ------------------------- */

export const AUTH_USER_MAIN = 'auth_main';
export const AUTH_USER_MAIN_STORE_PROFILE = 'userProfile';
export const AUTH_USER_DASHBOARD = 'auth_dashboard'; // UserContext dashboard
export const AUTH_USER_DASHBOARD_PROFILE = 'auth_profile'; // Store current user profile/membership after registering
export const AUTH_USER_DASHBOARD_PROFILE_UPDATE = 'auth_profile'; // Update/edit auth user profile
export const AUTH_USER_DASHBOARD_PHOTO = 'auth_photo'; // DASHBOARD - GET current user photo

export const PROFILE_FIELDS = 'profileFields'; // GET static fields from api

export const ADMIN_GET_APPROVED_USERS = 'users?approved=1';
export const ADMIN_GET_PENDING_USERS = 'users?pending=1';
export const ADMIN_GET_UNVERIFIED_USERS = 'users?unverified=1';

export const ADMIN_GET_SINGLE_USER = 'users'; // Dashboard - ADMIN - GET only single user, append UID
export const ADMIN_GET_SINGLE_USER_PHOTO = 'users/photo'; // DASHBOARD - ADMIN - GET selected user photo, append UID
export const ADMIN_DELETE_USER = 'users'; // DASHBOARD - ADMIN - DELETE selected user, append UID
export const ADMIN_UPDATE_USER = 'users'; // DASHBOARD - ADMIN - UPDATE membership status of selected user, append UID

export const LOGIN = 'login'; // Auth - Main Login
export const LOGOUT = 'logout'; // Auth - Main Logout
export const REGISTER = 'register'; // Auth - Main Register
export const CONTACT = 'contact'; // POST contact message
