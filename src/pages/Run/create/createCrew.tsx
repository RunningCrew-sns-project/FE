import { FormProvider, useForm } from "react-hook-form";
import InputField, { InputFieldProps } from "../inputField";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { postValidation } from "../validation";

const Crew = () => {
	const methods = useForm<InputFieldProps>({
    resolver: yupResolver(postValidation)
  });

	const handleSubmit = (data: InputFieldProps) => {
		console.log(data);
	};

	const fields = [
		{
			type: "text",
			name: "title",
			label: "제목",
			required: true,
			placeholder: "제목을 입력해주세요",
		},
		{
			type: "text",
			name: "description",
			label: "소개글",
			required: true,
			placeholder: "소개글을 입력해주세요",
		},
		{
			type: "select",
			name: "area",
			label: "지역",
			required: true,
			placeholder: "지역선택",
		},
		{
			type: "number",
			name: "maxpeople",
			label: "최대인원수",
			placeholder: "최대 인원수를 선택",
		},
	];

	return (
		<>
			<div className="flex flex-col items-center mb-20  ">
				<FormProvider {...methods}>
					<h2 className="mb-10 font-black text-[20px]">
						크루원과 함께 시작해보세요
					</h2>
					<form onSubmit={methods.handleSubmit(handleSubmit)}>
						{fields.map((field, index) => (
							<div key={index} className="w-[800px]">
								<InputField
									type={field.type}
									name={field.name}
									label={field.label}
									required={field.required}
									placeholder={field.placeholder}
								/>
							</div>
						))}
						<div className="flex justify-between w-full mt-5">
							<Button theme="primary" className="flex-1 mr-4">등록하기</Button>
              <Link to="/" className="flex-1 "> 
                <Button theme="dark" className="w-full">취소하기</Button> 
            </Link>
						</div>
					</form>
				</FormProvider>
			</div>
		</>
	);
};

export default Crew;
