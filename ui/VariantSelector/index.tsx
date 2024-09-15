import React, { useState, useMemo, useEffect } from 'react';
import { ProductVariant } from '../../interfaces/ProductVariant';

export interface VariantSelectorProps {
  variants: ProductVariant[];
  onSelect: (selectedVariantIds: string[]) => void; // Change to return string[]
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, onSelect }) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant | null>>({});

  // Group variants by typeDescription using useMemo
  const groupedVariants = useMemo(() => {
    return variants.reduce((acc, variant) => {
      (acc[variant.typeDescription] = acc[variant.typeDescription] || []).push(variant);
      return acc;
    }, {} as Record<string, ProductVariant[]>);
  }, [variants]);

  // Set default selected variants based on isDefaultSelected
  useEffect(() => {
    const initialSelection: Record<string, ProductVariant | null> = {};

    variants.forEach(variant => {
      if (variant.isDefaultSelected) {
        initialSelection[variant.typeDescription] = variant; // Set by typeDescription
      }
    });

    setSelectedVariants(initialSelection);
    
    // Call onSelect with the default selected IDs
    onSelect(Object.values(initialSelection).filter(Boolean).map(v => v?.id as string));
  }, [variants, onSelect]);

  const handleVariantSelect = (variant: ProductVariant) => {
    const newSelectedVariants = {
      ...selectedVariants,
      [variant.typeDescription]: variant, // Select one per type
    };

    setSelectedVariants(newSelectedVariants);
    
    // Extract IDs and call onSelect with an array of strings
    const selectedVariantIds = Object.values(newSelectedVariants)
      .filter(Boolean)
      .map((v) => v?.id as string);
    
    onSelect(selectedVariantIds);
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(groupedVariants).map(([typeDescription, group]) => (
        <div key={typeDescription} className="flex flex-col gap-4">
          <h3 className="font-bold mb-2">Välj {typeDescription.toLowerCase()}</h3>
          <div className="flex gap-2">
            {group.map((variant) => (
              <button
                key={variant.id}
                className={`relative w-12 h-12 p-1 items-center justify-center rounded-full transition-transform duration-300 border-2
                  ${selectedVariants[typeDescription]?.id === variant.id ? 'border-blue-600' : 'border-white'}
                `}
                onClick={() => handleVariantSelect(variant)}
              >
                {variant.typeName === "Color" && (
                  <div
                    className='w-full h-full rounded-full'
                    style={{ backgroundColor: variant.value }}
                  ></div>
                )}
                {variant.typeName === "ClothSize" && (
                  <span className="text-center">{variant.value}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;