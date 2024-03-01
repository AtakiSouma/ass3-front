import {
  Button,
  Checkbox,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { ErrorMessage, FieldProps, FormikValues, useField } from "formik";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { ChangeEvent, useState } from "react";

export interface MyInputProps {
  id: string;
  field: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

  placeholder: string;
}
export interface MyInputCreateProps {
  id: string;
  field: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  prefix: string;
  placeholder: string;
  disable: boolean;
  initalValue: string;
  defaultValue: string;
  type: string;
}
function MyInput({ field, placeholder }: MyInputProps) {
  const { name, value, onChange } = field;

  return (
    <div className="relative">
      <Input
        {...field}
        value={value || ""}
        onChange={onChange}
        allowClear
        prefix={<MdEmail />}
        size="large"
        className="px-5 py-2"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="p"
        className="ml-2 text-sm text-red-500"
      />
    </div>
  );
}

function MyInputPassword({ field, placeholder }: MyInputProps) {
  const { name, value, onChange } = field;

  return (
    <div className="relative">
      <Input.Password
        {...field}
        value={value || ""}
        onChange={onChange}
        prefix={<RiLockPasswordFill />}
        size="large"
        className="px-5 py-2 "
        placeholder={placeholder}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />

      <ErrorMessage
        name={name}
        component="p"
        className="ml-2 text-sm text-red-500"
      />
    </div>
  );
}

function MyInputUserName({ field, placeholder }: MyInputProps) {
  const { name, value, onChange } = field;

  return (
    <div className="relative">
      <Input
        {...field}
        value={value || ""}
        onChange={onChange}
        allowClear
        prefix={<FaUser />}
        size="large"
        className="px-5 py-2"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="p"
        className="ml-2 text-sm text-red-500"
      />
    </div>
  );
}
const MyFileInput = (props: UploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload Images</Button>
    </Upload>
  );
};

const myInputHidden = (value: string, name: string) => {
  return <input type="hidden" value={value} name={name} />;
};
function MyInputCreateOrchid({
  field,
  placeholder,
  prefix,
  disable,
  type,
}: MyInputCreateProps) {
  const { name, value, onChange } = field;
  return (
    <div className="relative">
      <Input
        {...field}
        type={type}
        value={value}
        onChange={onChange}
        allowClear
        disabled={disable}
        prefix={prefix}
        size="large"
        className="px-5 py-2"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="p"
        className="ml-2 text-sm text-red-500"
      />
    </div>
  );
}

function MyInputUser({
  field,
  placeholder,
  prefix,
  disable,
  defaultValue,
}: MyInputCreateProps) {
  const { name, value, onChange } = field;
  return (
    <div className="relative">
      <Input
        {...field}
        value={value || defaultValue || ""}
        onChange={onChange}
        disabled={disable}
        prefix={prefix}
        size="large"
        className="px-5 py-2"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="p"
        className="ml-2 text-sm text-red-500"
      />
    </div>
  );
}
// interface MySelectCreateProps {
//   field: {
//     name: string;
//     value: ChangeEvent<HTMLInputElement>;
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   };
//   options: MySelectOption[];
//   placeholder?: string;
//   prefix?: React.ReactNode;
//   disabled?: boolean;
// }

// interface MySelectOption {
//   value: string;
//   label: string;
//   disabled?: boolean; // Optional for individual option disabling
// }

// const MySelectCreateOrchid = ({
//   field,
//   options,
//   disabled,
// }: MySelectCreateProps) => {
//   const { name, value, onChange } = field;

//   return (
//     <div className="relative">
//       <Select
//         defaultValue={value}
//         value={value}
//         onChange={onChange}
//         allowClear
//         disabled={disabled}
//         showSearch={true}
//         filterOption={false}
//         size="large"
//         style={{width:200}}
//       >
//         {options.map((option) => (
//           <Select.Option
//             key={option.value}
//             value={option.value}
//             disabled={option.disabled}
//           >
//             {option.label}
//           </Select.Option>
//         ))}
//       </Select>
//       <ErrorMessage
//         name={name}
//         component="p"
//         className="ml-2 text-sm text-red-500"
//       />
//     </div>
//   );
// };

interface MySelectCreateProps {
  field: FieldProps["field"];
  form: FormikValues;
  options: MySelectOption[];
  placeholder?: string;
  disabled?: boolean;
  defaultIndex: number;
}

interface MySelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const MySelectCreateOrchid: React.FC<MySelectCreateProps> = ({
  field,
  form,
  options,
  disabled,
  defaultIndex,
  placeholder,
}) => {
  const { name, value, onChange, onBlur } = field || {};
  const { setFieldValue, setFieldTouched } = form;
  const defaultCategoryValue =
    defaultIndex >= 0 && defaultIndex < options.length
      ? options[defaultIndex].value
      : undefined;
  return (
    <div className="relative">
      <Select
        value={value || defaultCategoryValue}
        onChange={(selectedValue) => {
          setFieldValue(name, selectedValue);
          setFieldTouched(name, true);
        }}
        allowClear
        disabled={disabled}
        showSearch
        filterOption={false}
        placeholder={placeholder}
        size="large"
        style={{ width: 200 }}
      >
        {options.map((option) => (
          <Select.Option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <ErrorMessage
        name={name}
        component="p"
        className="ml-2 text-sm text-red-500"
      />
    </div>
  );
};

interface CheckBoxMyInputProps extends FieldProps {
  label: string;
}
const CheckBoxMyInput: React.FC<CheckBoxMyInputProps> = ({
  field,
  form,
  label,
}) => {
  const { name, value, onChange, onBlur } = field;
  const { setFieldValue, setFieldTouched } = form;

  return (
    <div className="mt-2">
      <Checkbox
        checked={value}
        onChange={(e) => {
          setFieldValue(name, e.target.checked);
          setFieldTouched(name, true);
        }}
      >
        {label}
      </Checkbox>
      <ErrorMessage
        name={name}
        component="p"
        className="text-sm text-red-500"
      />
    </div>
  );
};
export {
  MyInput,
  MyInputPassword,
  MyInputUserName,
  MyInputCreateOrchid,
  MySelectCreateOrchid,
  CheckBoxMyInput,
  MyInputUser,
  MyFileInput,
  myInputHidden
};
