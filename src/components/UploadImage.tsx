import { useRef, useState } from "react";

type UploadImageProps = {
    onUploadFiles: () => void;
    multiple?: boolean;
    uploadfileLength?: number;
    id: string;
    imgpreviewWidth: number;
    imgpreviewHeight: number;
    buttonClassName: string;
    imgClassName: string;
    buttonpositionClassName: string;
};

const UploadImage = ({ id, onUploadFiles, multiple, uploadfileLength, imgpreviewWidth, imgpreviewHeight, buttonClassName, imgClassName, buttonpositionClassName }: UploadImageProps) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const ref = useRef(null);

    const handleuploadFile = async (e) => {

        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);

            const updatedFiles = [...uploadedFiles, ...newFiles];
            setUploadedFiles(updatedFiles);

            const formData = new FormData();
            updatedFiles.forEach((file) => formData.append("files", file));

            onUploadFiles(formData);

        }
    }

    const handledeleteFile = (index) => {
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
        setUploadedFiles(updatedFiles)

        const formData = new FormData();
        updatedFiles.forEach((file) => formData.append("files", file));

        onUploadFiles(formData)
    }

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
                    {uploadedFiles?.map((file, index) => (
                        <div key={index}
                            className="relative "
                            style={{ width: `${imgpreviewWidth}px`, height: `${imgpreviewHeight}px` }}
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`image${index}`}
                                className={imgClassName}
                            />
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
                    <label className={`cursor-pointer ${buttonpositionClassName} ml-auto`} onClick={(event) => {
                        event.stopPropagation();
                        ref.current.click();
                    }}>
                        <div className={buttonClassName}>파일 선택 </div>
                    </label>
                )}
            </div>
        </>
    );
};

export default UploadImage;