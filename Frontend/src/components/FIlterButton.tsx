import React from "react";

type FilterButtonProps = {
	label: string;
	isSelected?:boolean;
	onFilterSelect: (label: string) => void;
};


const FilterButton: React.FC<FilterButtonProps> = ({
	label,
    onFilterSelect,
    isSelected
}) => {
	const handleClick = () => {
		onFilterSelect(label);
	};

	return (
		<div
			className={` ${
				isSelected
					? "bg-[#0000004D] rounded-xl py-[18px] px-[23px]"
					: "text-black text-2xl font-semibold"
			} cursor-pointer`}
			onClick={handleClick}
		>
			{label}
		</div>
	);
};

export default FilterButton;
