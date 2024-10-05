import React, { useEffect, useState } from "react";
import { Checkbox, Field, Label } from "@headlessui/react";
import { Check } from "@phosphor-icons/react";
export interface CheckBoxProps {
  label?: string;
  labelPosition?: "top" | "right" | "bottom" | "left";
  onChange?: (checked:boolean) => void;
  checked?:boolean;
}
export default ({ label,onChange, checked = false, labelPosition = "right" }: CheckBoxProps) => {
  const [enabled, setEnabled] = useState(checked);
useEffect(()=>{
  onChange && onChange(enabled)
},[enabled, onChange])
  return (
    <Field>
      <div className="flex gap-4 py-3">
        <Checkbox
          checked={enabled}
          onChange={(setEnabled)}
          className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-gray-800 ring-inset data-[checked]:ring-blue-600 data-[checked]:bg-blue-600"
        >
          <Check className="hidden size-4 fill-white group-data-[checked]:block" />
        </Checkbox>
        {label && <Label>{label}</Label>}
      </div>
    </Field>
  );
};
