import { Modal } from '@atomic/obj.modal';
import { QRCodeSVG } from 'qrcode.react';

export const PatientQRCode: React.FC<{
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}> = ({ openModal, setOpenModal }) => {
  return (
    <Modal opened={openModal} onClose={() => setOpenModal(false)}>
      <h2>Código QR do Paciente</h2>
      <QRCodeSVG value="hacksp.org" />
    </Modal>
  );
};
