import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputField, { InputFieldProps } from "./inputField";
import Button from "../../components/Button";
// import UploadImage from "../../components/UploadImage";

interface FormLayoutProps {
	title: string;
	fields: InputFieldProps[];
	onSubmit: (data: InputFieldProps) => void;
	children?: React.ReactNode; // children 추가
}

const FormLayout = ({ title, fields, onSubmit , children }: FormLayoutProps) => {
	const methods = useForm<InputFieldProps>();

	return (
		<FormProvider {...methods}>
			<h2 className="mb-10 font-black text-[20px]">{title}</h2>
			{/* <UploadImage
				id="image-upload"
				onUploadFiles={(formData) => console.log(formData)} // 파일 업로드 핸들링
				multiple={true}
				uploadfileLength={5} // 최대 업로드 파일 수
				imgpreviewWidth={100} // 미리보기 이미지 너비
				imgpreviewHeight={100} // 미리보기 이미지 높이
			/> */}
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				{fields.map((field, index) => (
					<div
						key={index}
						className="w-[320px] tablet:w-[640px] laptop:w-[800px] desktop:w-[800px]"
					>
						<InputField
							type={field.type}
							name={field.name}
							label={field.label}
							required={field.required}
							placeholder={field.placeholder}
						/>
					</div>
				))}
				{children}
				<div className="flex flex-col gap-2 justify-between w-full mt-5 tablet:flex-row laptop:flex-row desktop:flex-row ">
					<Button
						theme="primary"
						className="w-[320px] tablet:w-[320px] laptop:w-[400px] desktop:w-[400px]"
					>
						등록하기
					</Button>
					<Link
						to="/"
						className="w-[320px] tablet:w-[320px] laptop:w-[400px] desktop:w-[400px]"
					>
						<Button theme="dark" className="w-full">
							취소하기
						</Button>
					</Link>
				</div>
			</form>
		</FormProvider>
	);
};

export default FormLayout;
