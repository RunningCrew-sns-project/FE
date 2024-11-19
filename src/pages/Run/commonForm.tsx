import { FormProvider, useForm , SubmitHandler  } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import InputField, { InputFieldProps } from "./inputField";
import Button from "../../components/Button";
import UploadImage from "../../components/UploadImage";
import { InputData } from "./create/createCrew";


// FormLayout의 props 인터페이스 정의
interface FormLayoutProps {
  title: string; // 제목
  fields: InputFieldProps[]; // InputFieldProps 배열
  onSubmit: SubmitHandler<InputData>;
  children?: React.ReactNode; // 추가 자식 요소
  setImageUrls?: (urls: string[]) => void; // 이미지 URL을 설정하는 함수
	isEdit? : boolean
	maximumPeople? : number
	content? : string
	runName? : string
}

const FormLayout = ({ title, fields, onSubmit, children, setImageUrls, isEdit, maximumPeople,content, runName }:FormLayoutProps) => {

	const methods = useForm<InputData>();
	const location = useLocation(); // 현재 경로 가져오기
	const cancelLink = location.pathname === "/create/crewRun" ? "/crew" : "/";

	return (
		<FormProvider {...methods}>
			<h2 className="mb-10 font-black text-[20px]">{title}</h2>
			<UploadImage
				onUploadFiles={(formData ) => setImageUrls(formData)}
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
							isEdit={isEdit}
							maximumPeople={maximumPeople}
							content={content}
							runName={runName}
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
						{isEdit ? '수정하기' : '등록하기'}
					</Button>
					<Link
						to={cancelLink}
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
