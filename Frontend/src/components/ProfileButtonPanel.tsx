'use client'
import React, { useState } from "react";
import SelectButton from "@/components/ui/SelectButton";

const FILTER_LABELS = ["Verified", "Pending", "Disputed"];

const ProfileButtonPanel: React.FC = () => {
	const [selectedFilter, setSelectedFilter] = useState<string>("Verified");

	const handleFilterSelect = (filter: string) => {
		setSelectedFilter(filter);
		console.log(`Filter selected: ${filter}`);
	};

	return (
		<div className='flex gap-x-[56px] justify-between w-[40%] items-center my-[25px]'>
			{FILTER_LABELS.map(label => (
				<SelectButton
					key={label}
					label={label}
					isSelected={selectedFilter === label}
					onFilterSelect={handleFilterSelect}
				/>
			))}
		</div>
	);
};

export default ProfileButtonPanel;