"use client"

import React, { useState, useRef, useEffect } from 'react'
import { cva, VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils'
import { ChevronDown } from "lucide-react";

const dropdownVariants = cva(
    "rounded-md w-full text-sm font-meidum bg-white mt-1 flex items-center justify-between cursor-pointer relative",
    {
        variants: {
            variant: {
                primary: "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                outline: "border border-foreground"
            },
            variantSize: {
                default: "h-10 px-3 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-10 pl-8 pr-4 py-2",
            }
        },
        defaultVariants: {
            variant: "primary",
            variantSize: "default",
        }
    }
)

const dropdownMenuVariants = cva(
    "absolute left-0 right-0 mt-1 rounded-md bg-white shadow-lg z-10 max-h-100 overflow-auto z-40",
    {
        variants: {
            variant: {
                primary: "",
                outline: "border border-foreground"
            }
        },
        defaultVariants: {
            variant: "outline",
        }
    }
)

export interface DropdownOption {
    value: string | number;
    label: string;
}

export interface DropdownProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof dropdownVariants> {
    options: DropdownOption[];
    value?: string | number;
    onChange?: (value: string | number) => void;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
    ({ 
        className, 
        variant, 
        variantSize, 
        options, 
        value, 
        onChange, 
        placeholder = 'Select an option', 
        error, 
        helperText, 
        icon, 
        disabled = false,
        ...props 
    }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
            value ? options.find(option => option.value === value) || null : null
        );
        const dropdownRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            // Update selected option when value prop changes
            if (value) {
                const option = options.find(option => option.value === value);
                setSelectedOption(option || null);
            } else {
                setSelectedOption(null);
            }
        }, [value, options]);

        useEffect(() => {
            // Handle click outside to close dropdown
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        const handleOptionClick = (option: DropdownOption) => {
            setSelectedOption(option);
            setIsOpen(false);
            if (onChange) {
                onChange(option.value);
            }
        };

        const toggleDropdown = () => {
            if (!disabled) {
                setIsOpen(!isOpen);
            }
        };

        return (
            <div className='relative w-full bg-transparent' ref={dropdownRef}>
                <div
                    ref={ref}
                    className={cn(
                        dropdownVariants({ variant, variantSize, className }), 
                        { 
                            "border-red-500": error,
                            "opacity-50 cursor-not-allowed": disabled 
                        }
                    )}
                    onClick={toggleDropdown}
                    {...props}
                >
                    {icon && (
                        <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                            {icon}
                        </div>
                    )}
                    <div className="flex-1 truncate">
                        {selectedOption ? selectedOption.label : placeholder}
                    </div>
                    <ChevronDown className={`text-fg-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && (
                    <div className={cn(dropdownMenuVariants({ variant }))}>
                        {options.length > 0 ? (
                            options.map((option) => (
                                <div
                                    key={option.value}
                                    className={cn(
                                        "px-4 py-2 cursor-pointer hover:bg-gray-200 text-sm",
                                        selectedOption?.value === option.value && "bg-gray-100"
                                    )}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">No options available</div>
                        )}
                    </div>
                )}

                {error && (
                    <span className='font-inter text-red-500 text-xs -bottom-5 tracking-wide left-5'>
                        {helperText}
                    </span>
                )}
            </div>
        );
    }
);

export { Dropdown, dropdownVariants };