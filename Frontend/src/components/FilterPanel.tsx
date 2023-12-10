'use client'
import React, { useState } from "react";
import FilterButton from "./FIlterButton";

const FILTER_LABELS = ["All", "Images", "Articles", "Videos", "GIFs"];


const FilterPanel: React.FC = () => {
	const [selectedFilter, setSelectedFilter] = useState<string>("All");

	const handleFilterSelect = (filter: string) => {
		setSelectedFilter(filter);
		console.log(`Filter selected: ${filter}`);
	};

	return (
		<div className='flex gap-x-[56px] justify-between w-[50%]  pt-[80px] mx-8 items-center '>
			{FILTER_LABELS.map(label => (
				<FilterButton
					key={label}
					label={label}
					isSelected={selectedFilter === label}
					onFilterSelect={handleFilterSelect}
				/>
			))}
		</div>
	);
};

export default FilterPanel;

