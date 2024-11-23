import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type UploadImageProps = {
	onUploadFiles: ((formData: FormData) => void) | (() => void);
	multiple?: boolean;
	uploadfileLength?: number;
	id: string;
	imgpreviewWidth: number;
	imgpreviewHeight: number;
	buttonClassName: string;
	imgClassName: string;
	buttonpositionClassName: string;
	showPreview?: boolean;
	icon?: IconProp;
	imgUrl?: string[];
};

const UploadImage = ({
	id,
	onUploadFiles,
	multiple,
	uploadfileLength,
	imgpreviewWidth,
	imgpreviewHeight,
	buttonClassName,
	imgClassName,
	buttonpositionClassName,
	showPreview = true,
	icon,
	imgUrl,
}: UploadImageProps) => {
	const [uploadedFiles, setUploadedFiles] = useState(imgUrl || []);
	console.log('uploadimage', imgUrl)
	const ref = useRef(null);

	const handleuploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const newFiles = Array.from(files);

			const updatedFiles: any = [...uploadedFiles, ...newFiles];
			setUploadedFiles(updatedFiles);

			const formData = new FormData();
			updatedFiles.forEach((file: any) => formData.append("files", file));

			onUploadFiles(formData);
		}
	};

	const handledeleteFile = (index: number) => {
		const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
		setUploadedFiles(updatedFiles);

		const formData = new FormData();
		updatedFiles.forEach((file) => formData.append("files", file));

		onUploadFiles(formData);
	};

	return (
		<>
			<div className="flex flex-row gap-2 items-start">
				<input
					id={id}
					type="file"
					className="hidden"
					onChange={handleuploadFile}
					multiple={multiple}
					ref={ref}
				/>
				<div className="flex gap-x-[9px] flex-wrap">
					{showPreview &&
						uploadedFiles?.map((file, index) => (
							<div
								key={index}
								className="relative "
								style={{
									width: `${imgpreviewWidth}px`,
									height: `${imgpreviewHeight}px`,
								}}
							>
								{typeof file === "string" ? (
									<img
										src={file}
										alt={`uploaded-${index}`}
										className={imgClassName}
									/>
								) : (
									<img
										src={URL.createObjectURL(file)}
										alt={`uploaded-${index}`}
										className={imgClassName}
									/>
								)}
								<button
									type="button"
									onClick={() => handledeleteFile(index)}
									className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center"
								>
									x
								</button>
							</div>
						))}
				</div>
				{uploadedFiles.length < uploadfileLength && (
					<label
						className={`cursor-pointer ${buttonpositionClassName} ml-auto`}
						onClick={(event) => {
							event.stopPropagation();
							ref.current.click();
						}}
					>
						<div className={buttonClassName}>
							{icon ? (
								<>
									<FontAwesomeIcon icon={icon} className="mr-1" />
								</>
							) : (
								"파일 선택" // 아이콘이 없을 때 기본 텍스트
							)}
						</div>
					</label>
				)}
			</div>
		</>
	);
};

export default UploadImage;
