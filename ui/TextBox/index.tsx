import React from "react";
import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
export interface TextBoxProps {
    inActive?: boolean;
    error?: boolean;
    inline?: boolean;
    placeHolder?: string;
    label?: string;
    description?: string;
    value?: string | readonly string[] | number | undefined;
    onChange?: (value: string) => void;
    onBlur?: (e: any) => void;
    readOnly?: boolean;
    type?:'text'|'number';
}
export default ({label,description,onChange,onBlur,value,readOnly,placeHolder,type}:TextBoxProps)=>{
  return (
    <div className="w-full">
      <Field>
        {label && <Label className="text-sm/6 font-medium text-gray-800">{label}</Label>}
        {description &&<Description className="text-sm/6 text-gray-500">{description}</Description>}
        <Input
        readOnly={readOnly}
        placeholder={placeHolder}
        defaultValue={value ?? ''}
        type={type}
        onChange={(e) => onChange && onChange(e.target.value)}
        onBlur={(e) => onBlur && onBlur(e.target.value)}
          className={clsx(
            'mt-2 p-4 h-12 block w-full rounded border border-gray-800 bg-white/5 py-1.5 px-3 text-sm/6 text-gray-800',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-700'
          )}
        />
      </Field>
    </div>
  )
}
