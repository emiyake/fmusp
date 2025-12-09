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
import { usePhotoTempQuery } from './use-patient-get-photo-token';
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

  const { execute: createPhotoToken, loading: photoTokenLoading } = usePatientPhotoToken();
  const { execute: getPhoto } = usePhotoTempQuery();

  const handlePhotoUpload = async (patientId: string) => {
    const pid = Number(patientId);

    const existing = await getPhoto({ patient_id: pid });

    if (existing) {
      const expires = new Date(existing.expired_at);
      if (expires.getTime() > Date.now()) {
        return existing.id.toString();
      }
    }

    const newToken = Math.floor(Math.random() * 10_000_000_000);

    await createPhotoToken({
      id: newToken,
      patient_id: pid,
    });

    return newToken.toString();
  };

  const handleOpenModal = async () => {
    if (!patient?.id) {
      return;
    }

    const token = await handlePhotoUpload(patient.id);
    setTokenPatient(token);

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
