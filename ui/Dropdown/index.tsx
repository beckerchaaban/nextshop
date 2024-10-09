import React, { useState } from "react";
import { CaretDown, CaretUp, Check, X } from "@phosphor-icons/react"; // Importing chevron icons
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  onChange: (option?: DropdownOption) => void;
  label?:string;
  placeHolder?:string;
}

export default function Dropdown({ value, options, onChange,label,placeHolder }: DropdownProps) {
  const [selected, setSelected] = useState<DropdownOption | undefined>(
    value ? options.find((x) => x.value === value) : undefined
  );

  const handleChange = (option?: DropdownOption) => {
    setSelected(option);
    onChange(option); // Call the onChange with the selected option
  };

  console.log('Selected:', selected, 'Value:', value);

  return (
    <Field>
      {label && <Label className=" block text-sm/6 font-medium text-gray-800 pb-2">{label}</Label>}
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <ListboxButton
              className={clsx(
                "relative h-12 w-full rounded border border-gray-800 bg-white/5 py-1.5 px-3 text-sm/6 text-gray-800 text-left flex justify-between items-center",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-700"
              )}
            >
  <div className="flex items-center">
    <span className={clsx({ "text-gray-500": !selected })}>
      {selected ? selected.label : placeHolder}
    </span>
  </div>
              <div className="flex gap-2">
                {selected && <X className="fill-black/60" size={20} onClick={() => handleChange(undefined)}/>}
              {open ? (
                <CaretUp className="fill-black/60" size={20} />
              ) : (
                <CaretDown className="fill-black/60" size={20} />
              )}
              </div>
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              transition
              className={clsx(
                "flex flex-col gap-2 w-[var(--button-width)] z-10 rounded border border-gray-800 bg-white p-2 [--anchor-gap:var(--spacing-1)] focus:outline-none mt-2",
                "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
              )}
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option} // Set the option as the value
                  className={
                    clsx(
                      "flex gap-2 relative py-1.5 px-2 rounded items-center cursor-pointer",
                      {
                        "bg-blue-600 text-white":  option?.value === value,
                        "text-gray-900 hover:bg-gray-100":  option?.value !== value,
                        "font-medium": option?.value === value,
                      }
                    )
                  }
                >
                  <Check className={clsx("size-4", { "fill-white": option?.value === value, "invisible":option?.value !== value})} />
                  <div className="text-sm/6">{option.label}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </>
        )}
      </Listbox>
    </Field>
  );
}