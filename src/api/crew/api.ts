import { http } from "../request"

// 크루생성 
export const createCrew = async ({newData }) => {
  const res = await http.post('/api/crews', newData)
  console.log(res)
  return res 
}
