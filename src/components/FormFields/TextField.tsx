import { IFormField } from "@/types/app";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ValidationErrors } from "@/validations/auth";

interface Props extends IFormField {
  error: ValidationErrors;
}

const TextField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
  readOnly,
}: Props) => {
  return (
    <div className="grid gap-2.5">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>

      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        name={name}
        id={name}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />

      {error && error[name] && (
        <p
          className={`mt-2 text-sm font-medium ${error[name] ? "text-destructive" : "text-accent"}`}
        >
          {error[name]}
        </p>
      )}
    </div>
  );
};

export default TextField;
