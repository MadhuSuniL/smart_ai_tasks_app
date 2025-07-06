/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from 'react'
import Button from './Button';
import { RiArrowDownWideFill } from "react-icons/ri";
import { CiEdit, CiChat1, CiTrash } from "react-icons/ci";

const GPTDropdow = ({
  gpt
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-full cursor-pointer'>
      <div  onClick={toggleDropdown} className='flex cursor-pointer justify-between items-center w-full px-3'>
        <h1 className={`cursor-pointer font-bold`}>{gpt.name}</h1>
        <RiArrowDownWideFill className={`${isOpen ? 'rotate-180' : 'rotate-0'}`} size={25}/>
      </div>
      {
        isOpen && 
        <div className='flex flex-col w-full gap-3 mt-3'>
            <div className='flex justify-between items-start'>
              <span className='italic'>Name :</span>
              <span className=' mx-2'>{gpt.name}</span>
            </div>
            <div className='flex justify-between items-start'>
              <span className='italic'>Description :</span>
              <span className='text-wrap mx-2'>{gpt.short_description}</span>
            </div>
            <div className='flex justify-between items-start'>
              <span className='italic'>Created at :</span>
              <span className=' mx-2'>{gpt.created_at}</span>
            </div>
            <div className='flex justify-between items-start'>
              <span className='italic'>Update at :</span>
              <span className=' mx-2'>{gpt.updated_at}</span>
            </div>
            <Button href={`/chat/${gpt.id}`} extraClassName={'flex justify-center items-center my-0'}>Let's Chat<CiChat1 className='mx-1'/></Button>
            <div className='flex justify-between items-center my-0'>
              <Button color={'white'} backgroundColor={'gray'} href={`/custom_gpt/${gpt.name}`} extraClassName={'flex items-center my-0'}>Edit<CiEdit className='mx-1'/></Button>
              <Button color={'white'} backgroundColor={'red'} extraClassName={'flex items-center my-0'}>Delete<CiTrash className='mx-1'/></Button>
            </div>
        </div>
      }
    </div>
  )
}

export default GPTDropdow