
import { useState } from "react";
import { fields } from "../../../const/inputfileds";
import FormLayout from "../commonForm";
import { InputFieldProps } from "../inputField";



const Crew = () => {
	const [imgfiile, setImgFile] = useState<FormData | null>(null);
	const handleSubmit = (data: InputFieldProps) => {
		console.log(data, imgfiile);
	};

	return (
		<div className="flex flex-col items-center mb-20">
			<FormLayout
				title="사람들과 함께 달려보세요!"
				fields={fields}
				onSubmit={handleSubmit}
				setImgFile={setImgFile}
			/> 
		</div>
	);
};

export default Crew;
