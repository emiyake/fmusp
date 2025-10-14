import {
  Button,
  DatePickerInput,
  DateValidator,
  Form,
  FormField,
  RequiredValidator,
  SelectInput,
  TextInput,
} from '@atomic';
import type { Patient } from './patient.model';

export interface PatientFormData {
  name: string;
  mothersName: string;
  birthdate: Date;
  gender: string;
}

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  loading: boolean;
  patient?: Patient;
}

export const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, loading }) => {
  return (
    <Form<PatientFormData> onSubmit={onSubmit}>
      <div className="md:w-[50%]">
        <FormField name="name" label="Nome" validators={[RequiredValidator()]}>
          <TextInput />
        </FormField>
        <FormField name="mothersName" label="Nome da mãe" validators={[RequiredValidator()]}>
          <TextInput />
        </FormField>
        <FormField
          name="birthdate"
          label="Data de nascimento"
          className="md:w-[50%]"
          validators={[RequiredValidator(), DateValidator({ minDate: new Date(1900, 1, 1), maxDate: new Date() })]}>
          <DatePickerInput filterDate={date => date <= new Date()} />
        </FormField>
        <FormField name="gender" label="Gênero" className="md:w-[50%]" defaultValue="male">
          <SelectInput className="flex-1">
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </SelectInput>
        </FormField>
      </div>
      <Button type="submit" className="mt-md" loading={loading}>
        Salvar
      </Button>
    </Form>
  );
};
