export const HOST = import.meta.env.VITE_SERVER_URL;
export const SOCKET_HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const GET_USERINFO_ROUTE = `${AUTH_ROUTES}/userinfo`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const UPDATE_PROFLE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;

export const MESSAGES_ROUTES = "/api/messages";
export const DELETE_MESSAGE_ROUTE = (messageId) => `${MESSAGES_ROUTES}/delete-message/${messageId}`;
export const EDIT_MESSAGE_ROUTE = (messageId) => `${MESSAGES_ROUTES}/edit-message/${messageId}`;
export const FETCH_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILE = `${MESSAGES_ROUTES}/upload-file`;

export const CHANNEL_ROUTES = "/api/channel";
export const CREATE_CHANNEL = `${CHANNEL_ROUTES}/create-channel`;
export const GET_USER_CHANNELS = `${CHANNEL_ROUTES}/get-user-channels`;
export const GET_CHANNEL_MESSAGES = `${CHANNEL_ROUTES}/get-channel-messages`;

// New Group Admin Features

// API Routes
export const ADD_MEMBER_ROUTE = "/api/channel/add-member";
export const REMOVE_MEMBER_ROUTE = "/api/channel/remove-member";
export const CHANGE_GROUP_NAME_ROUTE = "/api/channel/change-group-name";
export const SET_GROUP_PHOTO_ROUTE = "/api/channel/set-group-photo";
export const UPDATE_PROFILE_IMAGE_ROUTE = "/api/user/update-profile-image";

export const CONTACTS_ROTUES = "/api/contacts";
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROTUES}/search`;
export const GET_CONTACTS_WITH_MESSAGES_ROUTE = `${CONTACTS_ROTUES}/get-contacts-for-list`;
export const GET_ALL_CONTACTS = `${CONTACTS_ROTUES}/all-contacts`;

export const MESSAGE_TYPES = {
  TEXT: "text",
  FILE: "file",
};
