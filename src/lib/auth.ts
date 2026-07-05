export const AUTH_KEY = "alfred_auth";
export const isAuthed = () => sessionStorage.getItem(AUTH_KEY) === "true";
export const login    = () => sessionStorage.setItem(AUTH_KEY, "true");
export const logout   = () => sessionStorage.removeItem(AUTH_KEY);
