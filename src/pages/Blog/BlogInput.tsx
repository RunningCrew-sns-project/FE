import { useController, useFormContext } from "react-hook-form";

export interface BlogInputProps {
    name: string;
    label: string;
    required?: boolean;
    type: string;
    placeholder: string;
    content: string;
    title: string;
    distance: number;
    record: number;
    isEdit: boolean;
}

const BlogInput = ({
    name,
    label,
    type = "text",
    required,
    placeholder,
    content,
    title,
    distance,
    record,
    isEdit,
}: BlogInputProps) => {
    const { control } = useFormContext();

    const defaultValue = isEdit
        ? name === "title"
            ? title
            : name === "content"
                ? content
                : name === "distance"
                    ? distance
                    : name === "record"
                        ? record
                        : ""
        : "";

    const { field } = useController({ name, control, defaultValue });


    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className=" font-black">{label}</label>
                    <span className="text-red-500 text-xs"> * 필수사항 </span>
                </div>
                {type === "textarea" ? (
                    <textarea
                        {...field}
                        required={required}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        className="border border-gray-600 p-2 rounded text-base mb-5 w-full bg-inputBg h-48"
                    />
                ) : (
                    <input
                        type={type}
                        {...field}
                        required={required}
                        placeholder={placeholder}
                        value={field.value || defaultValue}
                        className="border border-gray-600 p-2 rounded text-base mb-5 w-full bg-inputBg"
                    />
                )}
            </div>
        </>
    );
};
export default BlogInput;
