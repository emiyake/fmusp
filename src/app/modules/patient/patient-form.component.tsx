import { Button, Card, DatePicker, Flex, Form, FormField, H1, SelectInput, TextInput } from '@atomic';

export const PatientForm: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Card.Item>
          <Flex hAlign="between" vAlign="center">
            <H1 className="!m-0">Paciente</H1>
            <Button size="sm" variant="secondary">
              Editar
            </Button>
          </Flex>
        </Card.Item>
        <Card.Item>
          <div className="md:w-[50%]">
            <FormField name="name" label="Nome" defaultValue="João da Silva">
              <TextInput readOnly />
            </FormField>
            <FormField name="mothersName" label="Nome da mãe" defaultValue="Maria da Silva">
              <TextInput readOnly />
            </FormField>
            <FormField name="birthdate" label="Data de nascimento" className="md:w-[50%]">
              <DatePicker initialEndDate={new Date()} filterDate={date => date <= new Date()} />
            </FormField>
            <FormField name="gender" label="Gênero" className="md:w-[50%]">
              <SelectInput className="flex-1">
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </SelectInput>
            </FormField>
          </div>
        </Card.Item>
      </Card>

      <Button type="submit" className="mt-md">
        Submit
      </Button>
    </Form>
  );
};
