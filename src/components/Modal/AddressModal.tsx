import Modal from "./Modal"
import DaumPostcode from "react-daum-postcode";
import { Address } from "react-daum-postcode"; // Address 타입 임포트


interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: Address) => void; // Address 타입을 사용
}

const AddressModal = ({ isOpen, onClose, onComplete } : AddressModalProps) => {

  const handleComplete = (data: Address) => {
    // 선택된 주소 데이터를 부모 컴포넌트로 전달
    onComplete(data);
    onClose(); // 주소 선택 후 모달 닫기
  }
  return(
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <DaumPostcode onComplete={handleComplete}/>
      </Modal>
    </>
  )
}

export default AddressModal