"use client"
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailConext';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function BuyCredits() {
    const Options=[
        {
            id:1,
            price:200,
            credits:10
        },
        {
            id:2,
            price:300,
            credits:30
        },
        {
            id:3,
            price:600,
            credits:75
        },
        {
            id:4,
            price:1000,
            credits:150
        },
    ]
    const [selectedPrice,setSelectedPrice]=useState<number>(0);
    const [selectedOption,setSelectedOption]=useState<number>(0);
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const router=useRouter();
    const notify = (msg:string) => toast(msg);
    const notifyError = (msg:string) => toast.error(msg);
    useEffect(()=>{
        if(selectedOption!=0)
        {
           const price=Options[selectedOption-1].price;
           console.log(price) 
           setSelectedPrice(price)
        }
    },[selectedOption])

    const OnPaymentSuccess=async()=>{
        console.log("決済完了",Options[selectedOption]?.credits+userDetail?.credit);
        const result=await db.update(Users)
        .set({
            credit:Options[selectedOption]?.credits+userDetail?.credit
        }).where(eq(Users.userEmail,userDetail.userEmail));
        if(result)
            {
                notify("クレジットが追加されました");
                setUserDetail((prev:any)=>({
                    ...prev,
                    ['credit']:Options[selectedOption]?.credits+userDetail?.credit
                }))
                router.replace('/dashboard');
            }
            else{
                notifyError('サーバーエラーが発生しました')
            }
    }

  return (
    <div className='min-h-screen p-10 md:px-20 lg:px-40 text-center'>
        <h2 className='text-4xl font-bold text-primary'>
            クレジットを追加</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 items-center justify-center'>
            <div>
                {Options.map((option,index)=>(
                    <div className={`p-6 my-3 border bg-primary text-center 
                    rounded-lg text-white cursor-pointer 
                    hover:scale-105 transition-all
                    ${selectedOption==option.id&&'bg-black'}
                    `}
                    onClick={()=>setSelectedOption(option.id)}>
                        <h2>{option.credits}クレジット = {option.credits}ストーリー</h2>
                        <h2 className='font-bold text-2xl'>¥{option.price}</h2>
                    </div>
                ))}
            </div>
            <div>
               {selectedPrice>0&& <PayPalButtons style={{ layout: "vertical" }}
                disabled={!selectedOption||selectedOption==0}
                  // @ts-ignore 
                onApprove={()=>OnPaymentSuccess()}
                onCancel={()=>notifyError('決済がキャンセルされました')}
                createOrder={(data,actions)=>{
                    // @ts-ignore 
                    return actions.order.create({
                        purchase_units:[
                            {
                                // @ts-ignore 
                                amount:{
                                    value:(selectedPrice/100).toFixed(2),
                                    currency_code:'JPY'
                                }
                            }
                        ]
                    })
                }}
                />}
            </div>
        </div>
    </div>
  )
}

export default BuyCredits