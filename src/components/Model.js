import { Modal, Button } from "antd";

const PopUpModal = ({
  open,
  handleOk,
  handleClose,
  title = "Vertically centered modal dialog",
  closable = true,
  children,
}) => {
  return (
    <Modal
      title={title}
      centered
      visible={open}
      onOk={handleOk}
      onCancel={handleClose}
      footer={null}
      closable={closable}
    >
      {children}
    </Modal>
  );
};

export default PopUpModal;
