import { createRoutine } from "redux-saga-routines";

export const clearLinks = createRoutine("CLEAR_LINKS");
export const clearRedirect = createRoutine("CLEAR_REDIRECT");
export const createLink = createRoutine("CREATE_LINK");
export const deleteLink = createRoutine("DELETE_LINK");
export const fetchLinks = createRoutine("FETCH_LINKS");
export const dismissAlert = createRoutine("DISMISS_ALERT");
