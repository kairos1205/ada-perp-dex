'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/utils';

type Option = 'PnL' | 'Offset' | 'Offset%';

export default function PriceOffsetInputs() {
    const [tpPrice, setTpPrice] = useState<number | ''>('');
    const [slPrice, setSlPrice] = useState<number | ''>('');
    const [tpOffsetType, setTpOffsetType] = useState<Option>('Offset%');
    const [slOffsetType, setSlOffsetType] = useState<Option>('Offset%');
    const [tpOffsetDropdown, setTpOffsetDropdown] = useState(false);
    const [slOffsetDropdown, setSlOffsetDropdown] = useState(false);
    const [tpOffsetValue, setTpOffsetValue] = useState<number | ''>('');
    const [slOffsetValue, setSlOffsetValue] = useState<number | ''>('');

    const options: Option[] = ['PnL', 'Offset', 'Offset%'];

    const handleSelect = (
        setter: React.Dispatch<React.SetStateAction<Option>>,
        closeDropdown: React.Dispatch<React.SetStateAction<boolean>>,
        value: Option
    ) => {
        setter(value);
        closeDropdown(false);
    };

    return (
        <div className="grid grid-cols-2 gap-1 w-full text-sm text-gray-200">
            {/* TP Price Row */}
            <div className="flex w-full bg-[#23303C] rounded-md px-2 py-1">
                <div className="flex justify-between items-center w-full text-[12px]">
                    <span className="text-gray-300 text-nowrap font-semibold w-full">TP Price</span>
                    <input
                        step="0.01"
                        value={tpPrice}
                        onChange={(e) => setTpPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                        className="focus:outline-none text-gray-100 text-[13px] w-10 shrink-0"
                        placeholder="0.01"
                    />
                </div>
            </div>

            {/* TP Offset */}
            <div className="relative">
                <div
                    onClick={() => setTpOffsetDropdown(!tpOffsetDropdown)}
                    className="flex items-center justify-between bg-[#23303C] rounded-md px-2 py-1 cursor-pointer h-full"
                >
                    <span>{tpOffsetType}</span>
                    <div className="flex items-center justify-between">
                        <input
                            step="0.01"
                            placeholder='0.00'
                            value={tpOffsetValue}
                            onChange={(e) => setTpOffsetValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="bg-transparent focus:outline-none text-gray-100 w-10 text-[13px]"
                        />
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                </div>

                {tpOffsetDropdown && (
                    <div className="absolute mt-1 w-full bg-[#1c1f26] border border-gray-700 rounded-md shadow-lg z-10">
                        {options.map((opt) => (
                            <div
                                key={opt}
                                onClick={() => handleSelect(setTpOffsetType, setTpOffsetDropdown, opt)}
                                className={cn(
                                    'px-3 py-1 cursor-pointer text-gray-200 text-sm hover:bg-gray-700 flex justify-between items-center',
                                    tpOffsetType === opt && 'text-teal-400'
                                )}
                            >
                                {opt}
                                {tpOffsetType === opt && <span className="text-teal-400 text-xs">•</span>}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* SL Price Row */}
            <div className="flex items-center justify-between bg-[#23303C] rounded-md px-2 py-1">
                <div className="flex justify-between w-full items-center text-[12px]">
                    <span className="text-gray-300 text-nowrap font-semibold">SL Price</span>
                    <input
                        type="number"
                        step="0.01"
                        value={slPrice}
                        onChange={(e) => setSlPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                        className="bg-transparent focus:outline-none text-gray-100 w-10 text-[13px]"
                        placeholder="0.00"
                    />
                </div>
            </div>

            {/* SL Offset */}
            <div className="relative">
                <div
                    onClick={() => setSlOffsetDropdown(!slOffsetDropdown)}
                    className="flex items-center justify-between bg-[#23303C] rounded-md px-2 py-1 cursor-pointer h-full"
                >
                    <span>{slOffsetType}</span>
                    <div className="flex items-center justify-end">
                        <input
                            step="0.01"
                            placeholder='0.00'
                            value={slOffsetValue}
                            onChange={(e) => setSlOffsetValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="bg-transparent focus:outline-none text-gray-100 w-10 text-[13px]"
                        />
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                </div>

                {slOffsetDropdown && (
                    <div className="absolute mt-1 w-full bg-[#1c1f26] border border-gray-700 rounded-md shadow-lg z-10">
                        {options.map((opt) => (
                            <div
                                key={opt}
                                onClick={() => handleSelect(setSlOffsetType, setSlOffsetDropdown, opt)}
                                className={cn(
                                    'px-3 py-1 cursor-pointer text-gray-200 text-sm hover:bg-gray-700 flex justify-between items-center',
                                    slOffsetType === opt && 'text-teal-400'
                                )}
                            >
                                {opt}
                                {slOffsetType === opt && <span className="text-teal-400 text-xs">•</span>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
