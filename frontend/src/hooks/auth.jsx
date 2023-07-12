import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../service/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@RocketNotes:user", JSON.stringify(user));
      localStorage.setItem("@RocketNotes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });
    } catch (e) {
      if (e.response) {
        alert(e.response.data.message);
      } else {
        alert("Não foi possivel entrar.");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@RocketNotes:user");
    localStorage.removeItem("@RocketNotes:token");
    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {

      if(avatarFile){
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch('/users/avatar', fileUploadForm);
        user.avatar = response.data.avatar;
      }
      await api.put("/users", user);
      localStorage.setItem("@RocketNotes:user", JSON.stringify(user));
      setData({ user, token: data.token });
      alert("Perfil atualizado")
    } catch (e) {
      if (e.response) {
        alert(e.response.data.message);
      } else {
        alert("Não foi possivel atualizar o perfil.");
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@RocketNotes:token");
    const user = JSON.parse(localStorage.getItem("@RocketNotes:user"));

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ token, user: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, updateProfile, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
