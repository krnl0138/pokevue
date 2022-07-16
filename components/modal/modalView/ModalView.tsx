import Modal from "@mui/material/Modal";
import { closeModal } from "../../../lib/redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

// const modalStyle = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

type TModal = {
  children: JSX.Element;
};

export const ModalView = ({ children }: TModal) => {
  const dispatch = useAppDispatch();
  const handleModalClose = () => {
    dispatch(closeModal());
  };
  const isModalOpen = useAppSelector((state) => state.modal.modalOpen);
  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
};
