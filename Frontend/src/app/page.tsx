import FilterPanel from "@/components/FilterPanel";
import NFTCard from "@/components/NFTCard";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col bg-[#FFEED9] w-full'>
			<FilterPanel />
			<NFTCard date="date" isVerified={ true} name="name" />
		</main>
	);
}
