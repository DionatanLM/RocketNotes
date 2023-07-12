import { useAuth } from "../../hooks/auth";
import { useState } from "react";
import { Container, Form, Background } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
export function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    try {
      if (email && password) {
        signIn({ email, password });
      }
    } catch (e) {
      if (e.response) {
        alert(e.response.data.message);
      } else {
        alert("Não foi possivel entrar.");
      }
    }
  };

  return (
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seu login</h2>
        <Input
          placeholder="Digite seu e-mail"
          type="email"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button name="Entrar" onClick={handleSignIn} />
        <Link to="/register">Criar conta</Link>
      </Form>
      <Background />
    </Container>
  );
}
