import { Outlet } from "react-router-dom"
import PathBanner from "../../components/Banner/PathBanner"
import { ResponsiveContainer } from "../../components/Container"


const Create = () => {
  return(
    <>
      <PathBanner/>
      <ResponsiveContainer>
        <Outlet/>
      </ResponsiveContainer>
    </>
  )
}
export default Create