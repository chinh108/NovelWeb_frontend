import React from "react";
import { AlertOctagon } from "react-feather";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

interface RcModalConfirmProps {
  modal: boolean;
  closeForm: () => void;
  onSubmit: (data: any) => void;
  content: string;
  loading?: boolean;
  okText?: string;
  cancelText?: string;
}
const RcModalConfirm: React.FC<RcModalConfirmProps> = (props) => {
  const { modal, closeForm, onSubmit, content, loading, okText, cancelText } =
    props;
  return (
    <Modal centered={true} isOpen={modal}>
      <ModalBody>
        <div className="d-flex align-items-center">
          <AlertOctagon className="text-warning" />
          <h4 className="text-secondary ml-12p">{content}</h4>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={closeForm} disabled={loading}>
          {cancelText ?? "Huỷ"}
        </Button>
        <Button
          color="danger"
          className="ml-20p"
          onClick={onSubmit}
          disabled={loading}
        >
          {okText ?? "Xoá"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default RcModalConfirm;
