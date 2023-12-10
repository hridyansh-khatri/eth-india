import Image from 'next/image';
import React from 'react'
import Verified from '@/icons/Verified.svg'
import nftCard from '@/icons/nftCard.svg'
import Instagram from '@/icons/instagram.svg'
import x from '@/icons/x.svg'
import facebook from '@/icons/facebook.svg'
import soclly from '@/icons/soclly.svg'
import eth from '@/icons/eth.svg'
import { FaExternalLinkAlt } from "react-icons/fa";

export const NFTCardDetails = () => {
  return (
		<div className='mx-5 flex flex-col gap-y-2'>
			<div className='flex gap-x-[62px] '>
				<div className='h-[520px] w-[704px] '>
					{true ? (
						<Image
							src={Verified}
							alt='nftCard'
							className='float-right'
						/>
					) : (
						<></>
					)}
					<Image src={nftCard} alt='' className='w-full' />
				</div>
				<div className='flex flex-col '>
					<div>
						<div className='flex items-center '>
							<p className='text-[32px] font-semibold text-[#000000]'>
								Abstract colors by Hridyansh
							</p>
							{true ? (
								<Image
									src={Verified}
									alt='nftCard'
									className='float-right'
								/>
							) : (
								<></>
							)}
						</div>
						<p className='text-2xl font-semibold text-[#000000]'>
							Owned by{" "}
							<a className='text-[#2081E2]' target='_blank'>
								Hridyansh
							</a>
						</p>
						<p className='text-2xl font-normal text-[#000000]'>
							Date Created: 08/12/2023
						</p>
					</div>
					<div className='mt-[70px]'>
						<p className='text-[#505050] font-normal text-2xl'>
							Published on:
						</p>
						<div className='grid grid-cols-2'>
							<div className='flex items-center gap-3'>
								<Image src={Instagram} alt='insta' />
								<p className='text-[32px] font-normal text-[#000000]'>
									Instagram
								</p>
							</div>
							<div className='flex items-center gap-3'>
								<Image src={facebook} alt='insta' />
								<p className='text-[32px] font-normal text-[#000000]'>
									Facebook
								</p>
							</div>
							<div className='flex items-center gap-3'>
								<Image src={x} alt='insta' />
								<p className='text-[32px] font-normal text-[#000000]'>
									Twitter
								</p>
							</div>
							<div className='flex items-center gap-3'>
								<Image src={soclly} alt='insta' />
								<p className='text-[32px] font-normal text-[#000000]'>
									SOCLLY
								</p>
							</div>
						</div>
					</div>
					<div className='mt-[70px] flex gap-x-2'>
						<p className='text-[#505050] font-normal text-2xl'>
							Validated by:
						</p>
						<Image src={eth} alt='insta' />
						<p className='text-[#505050] font-normal text-xl'>
							0x90b3...Aee3
						</p>
					</div>
				</div>
			</div>
			<div className='flex gap-x-[62px]  '>
				<div className='h-[234px] w-[704px] border border-[#000000] rounded-[10px] grid grid-rows-3'>
					<div className='flex items-center border-b border-black gap-5 pl-[27px]'>
						<p className='text-[26px] font-normal text-[#000000]  '>
							IPFS
						</p>
						<FaExternalLinkAlt className='text-black' />
					</div>
					<div className='flex items-center border-b border-black gap-5'>
						<p className='text-[26px] font-normal text-[#000000]  pl-[27px]'>
							IPFS
						</p>
						<FaExternalLinkAlt className='text-black' />
					</div>
					<div className='flex items-center gap-5'>
						<p className='text-[26px] font-normal text-[#000000] pl-[27px]'>
							IPFS
						</p>
						<FaExternalLinkAlt className='text-black' />
					</div>
				</div>
				<div className='w-[335px] h-[70px] border border-[#000000] rounded-[10px] text-center text-[32px] font-medium text-black bg-[#FFD6A3] flex flex-col justify-center cursor-pointer'>
					Raise a dispute!
				</div>
			</div>
		</div>
  );
}
