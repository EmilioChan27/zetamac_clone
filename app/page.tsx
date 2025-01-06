'use client'
import Main, { EquationSettings } from '@/components/Main';
import React, {useState, useEffect} from 'react'
import {useSearchParams } from 'next/navigation';
export type Equation = {
  answer: number;
  representation: string;
}
export default function Home() {
  const [op1AdditionMin, setOp1AdditionMin] = useState(2)
  const [op1AdditionMax, setOp1AdditionMax] = useState(100)
  const [op2AdditionMin, setOp2AdditionMin] = useState(2)
  const [op2AdditionMax, setOp2AdditionMax] = useState(100)
  const [op1MultiplicationMin, setOp1MultiplicationMin] = useState(2)
  const [op1MultiplicationMax, setOp1MultiplicationMax] = useState(12)
  const [op2MultiplicationMin, setOp2MultiplicationMin] = useState(2)
  const [op2MultiplicationMax, setOp2MultiplicationMax] = useState(100)
  const [additionEnabled, setAdditionEnabled] = useState(true)
  const [subtractionEnabled, setSubtractionEnabled] = useState(true)
  const [multiplicationEnabled, setMultiplicationEnabled] = useState(true)
  const [divisionEnabled, setDivisionEnabled] = useState(true)
  const [duration, setDuration] = useState(120)
  const [showSettings, setShowSettings] = useState(true)
  const searchParam = useSearchParams()
  useEffect(() => {
   console.log('set division enabled to', divisionEnabled)    
  }, [divisionEnabled])
  useEffect(() => {
    console.log('set addition enabled to', additionEnabled)
  }, [additionEnabled])
  useEffect(() => {
    console.log('set multiplicationEnabled to', multiplicationEnabled)
  }, [multiplicationEnabled])
  useEffect(() => {
    console.log('set subtractione enabled to', subtractionEnabled)
  }, [subtractionEnabled])
  useEffect(() => {
    const game_id = searchParam.get('game_id')
    if (game_id && showSettings) {
      setShowSettings(false)      
    }
  }, [searchParam, showSettings])
  if (showSettings) {
    return (
      <div id="main-page" className="flex flex-col items-center w-dvw h-dvh">
      <div id="container" className="bg-gray-300 flex flex-col max-h-fit w-2/5 p-6 gap-2">
        <h1 className='text-3xl font-bold'>Arithmetic Game</h1>
        <p>The Arithmetic Game is a fast-paced speed drill where you are given two minutes to solve as many arithmetic problems as you can.
        </p>
        <p>If you have any question, please contact arithmetic@zetamac.com</p>
        <div id="addition-settings" className="flex flex-col">
          <div className="flex flex-row">
            <input type="checkbox" defaultChecked className="mr-1" onChange={() => setAdditionEnabled((prev) => !prev)} />
            <p>Addition</p>
          </div>
          <div id="settings-input" className="pl-7 flex flex-row items-center">
            <p>{'Range: ('}</p>          
            <input type='text' defaultValue={2} className='w-10 mx-1 h-6 pr-1 text-right' onChange={(e) => setOp1AdditionMin(parseInt(e.target.value))}/>
            <p>to</p>            
            <input type='text' defaultValue={100} className='w-10 mx-1 h-6 pr-1 text-right' onChange={(e) => setOp1AdditionMax(parseInt(e.target.value))}/>
            <p>{') + ('}</p>
            <input type='text' defaultValue={2} className='w-10 mx-1 h-6 pr-1 text-right' onChange={(e) => setOp2AdditionMin(parseInt(e.target.value))}/>
            <p>to</p>            
            <input type='text' defaultValue={100} className='w-10 mx-1 h-6 pr-1 text-right'onChange={(e) => setOp2AdditionMax(parseInt(e.target.value))}/>
            <p>{')'}</p>
        </div>
        </div>
        <div id="subtraction-settings" className="flex flex-col">
          <div className="flex flex-row">
            <input type="checkbox" defaultChecked className="mr-1" onChange={() => setSubtractionEnabled((prev) => !prev)} />
            <p>Subtraction</p>
          </div>
          <p className="pl-7">Addition problems in reverse.</p>
        </div>
        <div id="multiplication-settings" className="flex flex-col">
          <div className="flex flex-row">
            <input type="checkbox" defaultChecked className="mr-1" onChange={() => setMultiplicationEnabled((prev) => !prev)} />
            <p>Multiplication</p>
          </div>
          <div id="multiplication-settings-input" className="pl-7 flex flex-row items-center">
            <p>{'Range: ('}</p>          
            <input type='text' defaultValue={2} className='w-10 mx-1 h-6 pr-1 text-right' onChange={(e) => setOp1MultiplicationMin(parseInt(e.target.value))}/>
            <p>to</p>            
            <input type='text' defaultValue={12} className='w-10 mx-1 h-6 pr-1 text-right' onChange={(e) => setOp1MultiplicationMax(parseInt(e.target.value))}/>
            <p>{') + ('}</p>
            <input type='text' defaultValue={2} className='w-10 mx-1 h-6 pr-1 text-right' onChange={(e) => setOp2MultiplicationMin(parseInt(e.target.value))}/>
            <p>to</p>            
            <input type='text' defaultValue={100} className='w-10 mx-1 h-6 pr-1 text-right'onChange={(e) => setOp2MultiplicationMax(parseInt(e.target.value))}/>
            <p>{')'}</p>
        </div>
        </div>
        <div id="division-settings" className="flex flex-col">
          <div className="flex flex-row">
            <input type="checkbox" defaultChecked className="mr-1" onChange={() => setDivisionEnabled((prev) => !prev)} />
            <p>Division</p>
          </div>
          <p className="pl-7">Multiplication problems in reverse.</p>
      </div>      
      <div id="duration" className="flex flex-row gap-2">
        <p>Duration: </p>        
        <select defaultValue={120} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-27">
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
          <option value={120}>120 seconds</option>
          <option value={300}>300 seconds</option>
          <option value={600}>600 seconds</option>
        </select>
      </div>
      <button onClick={() => setShowSettings(false)} className="bg-white self-end px-3 rounded-sm">Start</button>
    </div>
    </div>
  )
} else {
  const settings: EquationSettings = {
    addition1Min: op1AdditionMin,
    addition1Max: op1AdditionMax,
    addition2Min: op2AdditionMin,
    addition2Max: op2AdditionMax,
    multiplication1Min: op1MultiplicationMin, // this is on purpose
    multiplication1Max: op1MultiplicationMax, // same for the other multiplication ones
    multiplication2Min: op2MultiplicationMin,
    multiplication2Max: op2MultiplicationMax,
    additionEnabled,
    subtractionEnabled,
    multiplicationEnabled,
    divisionEnabled,
    duration,
  }
  return <Main settings={settings}/> 
}

}

