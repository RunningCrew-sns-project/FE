
import Button from "../../components/Button"


interface BtnItemProps {
  title: string;
  id: number; 
  handleMoveBtn: (id: number) => void
}

const MainBtnItem = ({title, id , handleMoveBtn} : BtnItemProps) => {



  return(
    <>
      <div className="flex items-center justify-between mb-4" key={id}>
        <span>{title}</span>
        <Button type="button" theme="primary" 
        onClick={() => handleMoveBtn(id)}>입장하기</Button>
      </div>
    </>
  )
}

export default MainBtnItem