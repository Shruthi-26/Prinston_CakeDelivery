export const saveUser = (data) => {
  localStorage.setItem("cakehub_user", JSON.stringify(data));
};

export const getUser = () => {
  const data = localStorage.getItem("cakehub_user");
  return data ? JSON.parse(data) : null;
};

export const getToken = () => {
  const user = getUser();
  return user?.token || "";
};

export const logoutUser = () => {
  localStorage.removeItem("cakehub_user");
};
