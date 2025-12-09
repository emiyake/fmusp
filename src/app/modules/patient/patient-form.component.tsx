import {
  Button,
  DatePickerInput,
  DateValidator,
  Form,
  FormField,
  LoadingState,
  RequiredValidator,
  SelectInput,
  ShimmerBox,
  TextInput,
} from '@atomic';
import { Modal } from '@atomic/obj.modal';
import { useState } from 'react';
import type { Patient } from './patient.model';

export interface PatientFormData {
  name: string;
  mothersName: string;
  birthdate: Date;
  gender: string;
}

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  saving: boolean;
  loading?: boolean;
  patient?: Patient;
  isNew: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, saving, patient, loading, isNew = true }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <LoadingState loading={loading} data={isNew || !!patient}>
      <LoadingState.Shimmer>
        <ShimmerBox height="32px" margin="24px 0" width="50%" />
        <ShimmerBox height="24px" margin="10px 0" />
        <ShimmerBox height="24px" margin="10px 0" />
      </LoadingState.Shimmer>
      <Form<PatientFormData> onSubmit={onSubmit} key={patient?.id}>
        <Modal opened={openModal} />
        <div className="md:w-[50%]">
          <FormField name="photo" label="Foto" validators={[RequiredValidator()]}>
            <Button
              onClick={() => {
                setOpenModal(true);
              }}>
              Adicionar foto
            </Button>
          </FormField>
          <FormField name="name" label="Nome" validators={[RequiredValidator()]} defaultValue={patient?.name}>
            <TextInput />
          </FormField>
          <FormField
            name="mothersName"
            label="Nome da mãe"
            validators={[RequiredValidator()]}
            defaultValue={patient?.mothers_name}>
            <TextInput />
          </FormField>
          <FormField
            name="birthdate"
            label="Data de nascimento"
            className="md:w-[50%]"
            defaultValue={patient?.birthdate ? new Date(patient.birthdate) : undefined}
            validators={[RequiredValidator(), DateValidator({ minDate: new Date(1900, 1, 1), maxDate: new Date() })]}>
            <DatePickerInput filterDate={date => date <= new Date()} />
          </FormField>
          <FormField name="gender" label="Gênero" className="md:w-[50%]" defaultValue={patient?.gender ?? 'male'}>
            <SelectInput className="flex-1">
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </SelectInput>
          </FormField>
        </div>
        <Button type="submit" className="mt-md" loading={saving}>
          Salvar
        </Button>
      </Form>
    </LoadingState>
  );
};
