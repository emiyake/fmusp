import { Modal } from '@atomic/obj.modal';
import { QRCodeSVG } from 'qrcode.react';

type PatientQRCodeProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  token_patient: string | null;
};

export const PatientQRCode: React.FC<PatientQRCodeProps> = ({ openModal, setOpenModal, token_patient }) => {
  return (
    <Modal opened={openModal} onClose={() => setOpenModal(false)}>
      <h2>Código QR do Paciente</h2>

      {token_patient ? (
        <QRCodeSVG value={'https://4b5089282ebd.ngrok-free.app/patient/' + token_patient + '/photo'} />
      ) : (
        <p>Gerando código...</p>
      )}
    </Modal>
  );
};
