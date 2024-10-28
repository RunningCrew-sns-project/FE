import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputField, { InputFieldProps } from "./inputField";
import Button from "../../components/Button";
import UploadImage from "../../components/UploadImage";

interface FormLayoutProps {
	title: string;
	fields: InputFieldProps[];
	onSubmit: (data: InputFieldProps) => void;
	children?: React.ReactNode; // children 추가
	setImgFile: (formData: FormData) => void; 
}

const FormLayout = ({ title, fields, onSubmit, children, setImgFile }: FormLayoutProps) => {
	const methods = useForm<InputFieldProps>();

	const handleUploadFiles = (formData: FormData) => {
		setImgFile(formData)
};

	return (
		<FormProvider {...methods}>
			<h2 className="mb-10 font-black text-[20px]">{title}</h2>
			<UploadImage
				onUploadFiles={handleUploadFiles}
				multiple={true}
				uploadfileLength={5}
				id="file-upload"
				imgpreviewWidth={100}
				imgpreviewHeight={100}
				buttonClassName="bg-blue-500 text-white p-2 rounded"
				imgClassName="w-full h-full object-cover"
				buttonpositionClassName="flex items-center"
			/>
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
						type="submit"
						theme="primary"
						className="w-[320px] tablet:w-[320px] laptop:w-[400px] desktop:w-[400px]"
					>
						등록하기
					</Button>
					<Link
						to="/"
						className="w-[320px] tablet:w-[320px] laptop:w-[400px] desktop:w-[400px]"
					>
						<Button type="button" theme="dark" className="w-full">
							취소하기
						</Button>
					</Link>
				</div>
			</form>
		</FormProvider>
	);
};

export default FormLayout;
