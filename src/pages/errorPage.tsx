import { useRouteError } from "react-router"
import { Link } from "react-router-dom";


const Errorpage = () => {
  const error = useRouteError;
  console.log(error)
  return(
    <>
      <Link to={'/'}>
        메인으로 이동 
      </Link>
    </>
  )
}

export default Errorpage