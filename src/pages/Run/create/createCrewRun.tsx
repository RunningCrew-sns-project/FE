import { fields } from "../../../const/inputfileds";
import FormLayout from "../commonForm";
import { InputFieldProps } from "../inputField";


const CrewRun = () => {
  const handleSubmit = (data: InputFieldProps) => {
		console.log(data);
	};

	return (
		<FormLayout 
			title="크루원과 함께 달려보세요"
			fields={fields}
			onSubmit={handleSubmit}
		/>
	);
}
export default CrewRun