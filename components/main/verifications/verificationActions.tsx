'use client'
import { WarningIcon } from '@/components/logout/logout'
import Button from '@/components/ui/button'
import ActionModals from '@/components/ui/modals/actionModals'
import { useModalContext } from '@/context/modalContext'
import { Mentor, } from '@/types/global'
import React from 'react'
import { FiEye } from "react-icons/fi";
import { LuSquareCheck, LuSquareX } from 'react-icons/lu'

export const MentorReqAction = ({ recent, data }: { recent?: boolean; data: Mentor }) => {

    const { isOpen, openModal } = useModalContext()
    return (
        <>{

            recent ? <div className='inline-flex gap-3'>
                <button>
                    <FiEye size={20} />
                </button>
                <button>
                    <LuSquareCheck className='text-success-600' size={20} />
                </button>
                <button>
                    <LuSquareX className='text-error-400' size={20} />
                </button>
            </div> :
                <div className='grid grid-cols-2 gap-3'>
                    <Button className='alt-btn' onClick={() => openModal(`delete-${data?.id}`)} >Delete</Button>
                    <Button link href={`/templates/edit/${data?.id}`} className='pry-btn'>Edit</Button>
                </div>
        }

            {isOpen[`delete-${data?.id}`] &&
                (<ActionModals
                    icon={<WarningIcon />}
                    id={`delete-${data?.id}`}
                    title='Delete template'
                    subTitle='Are you sure you want to delete this template?'
                    actionTitle="Yes, delete"
                    closeTitle='No, don’t delete'
                    btnSecClass='outline-btn'
                    action={() => { }}
                />)}
        </>
    )
}
