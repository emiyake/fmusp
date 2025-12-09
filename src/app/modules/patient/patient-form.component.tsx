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
import { PatientQRCode } from './patient.qrcode.component';
import { usePatientPhotoToken } from './use-patient-photo-token';

export interface PatientFormData {
  photo: File | null;
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
  isEditing?: boolean;
  isNew: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  onSubmit,
  saving,
  patient,
  loading,
  isEditing = false,
  isNew = true,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const { execute: createPhotoToken } = usePatientPhotoToken();

  const handlePhotoUpload = async (patientId: string) => {
    const token_photo = crypto.randomUUID();
    await createPhotoToken({
      id: token_photo,
      patient_id: patientId,
    });

    return token_photo;
  };

  return (
    <LoadingState loading={loading} data={isNew || !!patient}>
      <LoadingState.Shimmer>
        <ShimmerBox height="32px" margin="24px 0" width="50%" />
        <ShimmerBox height="24px" margin="10px 0" />
        <ShimmerBox height="24px" margin="10px 0" />
      </LoadingState.Shimmer>
      <Form<PatientFormData> onSubmit={onSubmit} key={patient?.id}>
        <PatientQRCode openModal={openModal} setOpenModal={setOpenModal} />
        <div className="md:w-[50%]">
          {isEditing && (
            <FormField name="photo" label="Foto" validators={[RequiredValidator()]}>
              <Button
                onClick={() => {
                  setOpenModal(true);
                }}>
                Adicionar foto
              </Button>
            </FormField>
          )}
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
