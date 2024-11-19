
import Button from "../../components/Button"


interface BtnItemProps {
  title: string;
  id: number; 
  isCrew: boolean;
  handleMoveBtn: (id: number,isCrew:boolean ) => void
}

const MainBtnItem = ({title, id , isCrew, handleMoveBtn} : BtnItemProps) => {


  return(
    <>
      <div className="flex items-center justify-between mb-4" key={id}>
        <span>{title}</span>
        <Button type="button" theme="primary" 
        onClick={() => handleMoveBtn(id, isCrew )}>입장하기</Button>
      </div>
    </>
  )
}

export default MainBtnItem