import { ButtonSubmit } from '../ButtonSubmit';
import { Form, GridForm, StyledCard } from './styles';
import { CardFormProps } from './types';

export function CardForm({ children, loading, onSubmit }: CardFormProps) {
  return (
    <Form onSubmit={onSubmit}>
      <StyledCard>
        <GridForm>{children}</GridForm>
        <ButtonSubmit loading={loading}>CADASTRAR</ButtonSubmit>
      </StyledCard>
    </Form>
  );
}
