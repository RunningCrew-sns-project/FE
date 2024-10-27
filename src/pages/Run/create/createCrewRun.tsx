import { useState } from "react";
import DateFilter from "../../../components/Filter/DateFilter";
import { fields } from "../../../const/inputfileds";
import FormLayout from "../commonForm";
import { InputFieldProps } from "../inputField";



const CrewRun = () => {
	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date | null>(currentDate);

	const handleSubmit = (data: InputFieldProps) => {
		const submittedData = {
			...data,
			startDate: startDate, // 날짜 추가
		};
		console.log(submittedData);
	};

	return (
		<>
			<div className="flex flex-col items-center mb-20">
				<FormLayout
					title="크루 사람들과 함께 달려보세요! "
					fields={fields}
					onSubmit={handleSubmit}
				>
					<div className="mb-5 w-[320px] tablet:w-[640px] laptop:w-[800px] desktop:w-[800px]">
						<label className="font-black mb-2 block">일정</label>
						<DateFilter
							startDate={startDate}
							setStartDate={setStartDate}
							currentDate={currentDate}
						/>
					</div>
				</FormLayout>
			</div>
		</>
	);
}
export default CrewRun