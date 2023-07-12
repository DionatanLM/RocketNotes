import { Container } from "./styles";

export function ButtonText({ name, loading, isActive = false, ...rest }) {
  return (
    <Container type="button"
     disabled={loading} 
     {...rest} 
     isActive={isActive}>
      {loading ? "Carregando..." : name}
    </Container>
  );
}
