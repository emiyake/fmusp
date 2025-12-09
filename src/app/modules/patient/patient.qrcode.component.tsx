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

      {token_patient ? <QRCodeSVG value={token_patient} /> : <p>Gerando código...</p>}
    </Modal>
  );
};
