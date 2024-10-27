import { Controller, useFormContext } from "react-hook-form";
import { LOCATION } from "../../const/location";

export interface InputFieldProps {
	name: string;
	label: string;
	required?: boolean;
	type: string;
	placeholder: string;
}

const InputField = ({
	name,
	label,
	type = "text",
	required,
	placeholder,
}: InputFieldProps) => {
	const { control } = useFormContext(); // 리액트 훅 품의 메소드를 사용할 수 있도록 추출

	return (
		<>
			<div>
				<div className="flex justify-between items-center mb-2">
					<label className=" font-black">{label}</label>
					<span className="text-red-500 text-xs"> * 필수사항 </span>
				</div>
				{type === "select" ? (
					<Controller // 내가 관리자
						name={name}
						control={control} // 내가 보고자
						defaultValue=""
						render={({ field }) => (
							<select
								{...field}
								className="border border-gray-600 rounded p-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5 w-full"
							>
								{LOCATION.map((location) => (
									<option key={location.id} value={location.area}>
										{location.area}
									</option>
								))}
							</select>
						)}
					/>
				) : (
					<Controller
						name={name}
						control={control}
						defaultValue=""
						render={(
							{ field }, // 내가 실무자
						) => (
							<input
								type={type}
								{...field}
								required={required}
								placeholder={placeholder}
								className="border border-gray-600 p-2 rounded text-base  mb-5 w-full"
							/>
						)}
					/>
				)}
			</div>
		</>
	);
};
export default InputField;
