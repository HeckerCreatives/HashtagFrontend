import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Spinner from './Spinner';
import { Button } from '../ui/button';

type Props = {
  id: string;
  name: string;
  percentage: any;
  duration: number;
  img: string;
  size: string;
  max: number;
  earnings: number;
  timeleft: number; // seconds
  purchase: any;
  buyprice: any;
  b1t1: string
}

export default function Myhashbotcard(prop: Props) {
  const router = useRouter();
  const [slider, setSlider] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [remainingTime, setRemainingTime] = useState(prop.timeleft);
  const [realTimeEarnings, setRealTimeEarnings] = useState(prop.earnings); 
  const [progress, setProgress] = useState(0); 
  const widthString = `${progress.toFixed(2)}%`; 

  const getProfit = prop.buyprice * (prop.percentage / 100);
  const finalProfit = prop.buyprice + getProfit;

  const claimEarnings = async () => {
    setLoading(true);
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/inventory/claimminer`, {
        minerid: prop.id
      }, {
        withCredentials: true
      });

      const response = await toast.promise(request, {
        loading: 'Claiming....',
        success: `Successfully claimed`,
        error: 'Error while claiming the earnings',
      });

      if (response.data.message === 'success') {
         window.location.reload();
         setLoading(false);

      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string, data: string }>;
        if (axiosError.response && axiosError.response.status === 401) {
          toast.error(`${axiosError.response.data.data}`);
          router.push('/');
        }
        if (axiosError.response && axiosError.response.status === 400) {
          toast.error(`${axiosError.response.data.data}`);
        }
      }
    }
  };

  const addDays = (date: string, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const maturedDate = addDays(prop.purchase, prop.duration);


  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1; 
        } else {
          clearInterval(interval); 
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, []);


  
  useEffect(() => {
    const totalDurationInSeconds = prop.duration * 24 * 60 * 60; 
    const elapsedTime = totalDurationInSeconds - remainingTime;
    const newProgress = (elapsedTime / totalDurationInSeconds) * 100;
    const newEarnings = (newProgress / 100) * finalProfit;

    setProgress(newProgress);
    setRealTimeEarnings(newEarnings); 
  }, [remainingTime, prop.max, prop.duration]);

  return (
    <div className=' relative w-full flex items-end justify-end h-[330px] lg:h-[350px] max-w-[470px] '>
      <div className=' relative w-full flex flex-col bg-zinc-900 rounded-sm p-6 h-auto'>
        <div className=' relative w-full grid grid-cols-2 gap-4 h-auto'>
          

          <div className=' w-full flex flex-col gap-1'>
            <p className=' text-sm font-semibold text-white'>{prop.name}</p>
            <p className=' text-xs text-yellow-500'>{prop.percentage}% Profit</p>
            <p className=' text-xs text-yellow-500'>{prop.duration} days duration</p>
          </div>

          <div className=' w-full h-[100px] relative'>
            <img src={prop.img} alt="" width={prop.size} className=' absolute bottom-0' />
          </div>
        </div>

        <div className=' w-full flex flex-col gap-2 mt-4'>
          <p className=' text-sm text-zinc-100'>Earnings: <span className=' text-yellow-500'>₱ {realTimeEarnings.toLocaleString()}</span></p>
          <div className=' w-full h-2 rounded-full bg-zinc-800 overflow-hidden'>
            <div className={`h-full bg-yellow-500 rounded-full overflow-hidden `}
              style={{ width: widthString }}
            >
              <div className=' loader w-full h-full'></div>
            </div>
          </div>

          <Countdown
            className=' mt-2'
            date={Date.now() + (remainingTime * 1000)} 
            renderer={({ days, hours, minutes, seconds }) => (
              <span className=' text-xs'>
                Time left: {days} days : {hours} hours : {minutes} minutes : {seconds} seconds
              </span>
            )}
          />

          <div className=' w-full flex items-center justify-between mt-2'>
            <div className=' flex flex-col gap-1'>
              <p className=' text-sm text-white font-medium'>Purchased Date: <span className=' text-orange-300'>{prop.purchase}</span></p>
              <p className=' text-sm text-white font-medium'>Matured Date: <span className=' text-orange-300'>{`${maturedDate.toLocaleString()}`}</span></p>
            </div>

            <Dialog open={dialog} onOpenChange={setDialog}>
              <DialogTrigger disabled={loading} className=' px-6 py-2 text-sm font-semibold text-white bg-yellow-600 rounded-sm flex items-center gap-2'>
                  {loading === true && (
                    <Spinner />
                  )}
                  Claim
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure you want to claim your earnings on <span className=' text-yellow-500'>{prop.name}</span> ?</DialogTitle>
                  <DialogDescription>
                  </DialogDescription>
                </DialogHeader>
                <div className=' w-full flex flex-col'>
                  <p className=' text-sm text-yellow-500'>{prop.percentage}% Profit</p>
                  <p className=' text-sm text-yellow-500'>{prop.duration} days duration</p>
                  <p className=' text-sm text-white'>Earnings: <span className=' text-yellow-500'>P {realTimeEarnings.toLocaleString()}</span></p>

                  <div className=' w-full flex items-end justify-end gap-4'>
                    <Button disabled={loading}  onClick={claimEarnings} className=' bg-yellow-600 text-white '>Continue</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
