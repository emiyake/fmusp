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
  const [tokenPatient, setTokenPatient] = useState<string | null>(null);

  const { execute: createPhotoToken, error: photoTokenError, loading: photoTokenLoading } = usePatientPhotoToken();

  const handlePhotoUpload = async (patientId: string) => {
    const token_photo = Math.floor(Math.random() * 10_000_000_000);

    const result = await createPhotoToken({
      id: token_photo,
      patient_id: Number(patientId),
    });

    console.log('photo_temp result', result, photoTokenError);

    return token_photo;
  };

  const handleOpenModal = async () => {
    if (!patient?.id) {
      return;
    }

    // gera token e salva no estado
    const token = await handlePhotoUpload(patient.id);
    setTokenPatient(token.toString());

    // abre modal
    setOpenModal(true);
  };

  return (
    <LoadingState loading={loading} data={isNew || !!patient}>
      <LoadingState.Shimmer>
        <ShimmerBox height="32px" margin="24px 0" width="50%" />
        <ShimmerBox height="24px" margin="10px 0" />
        <ShimmerBox height="24px" margin="10px 0" />
      </LoadingState.Shimmer>
      <Form<PatientFormData> onSubmit={onSubmit} key={patient?.id}>
        <PatientQRCode openModal={openModal} setOpenModal={setOpenModal} token_patient={tokenPatient} />
        <div className="md:w-[50%]">
          {isEditing && (
            <FormField name="photo" label="Foto" validators={[RequiredValidator()]}>
              <Button onClick={handleOpenModal} loading={photoTokenLoading}>
                Adicionar foto
              </Button>
            </FormField>
          )}
          <FormField name="name" label="Nome" validators={[RequiredValidator()]} defaultValue={patient?.name}>
            <TextInput />
          </FormField>
          <FormField name="mothersName" label="Nome da mãe" defaultValue={patient?.mothers_name}>
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
