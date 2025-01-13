'use client'
import React, {useState, useEffect} from 'react'
import { Equation } from '@/app/page'
export type EquationSettings = {
    addition1Min: number, 
    addition1Max: number,
    addition2Min: number,
    addition2Max: number,
    multiplication1Min: number,
    multiplication1Max: number,
    multiplication2Min: number,
    multiplication2Max: number,
    additionEnabled: boolean,
    subtractionEnabled: boolean,
    multiplicationEnabled: boolean,
    divisionEnabled: boolean,
    duration: number,
    customEquations?: Equation[],
}
const Main: React.FC<{settings: EquationSettings}> = ({settings}) =>    {
  console.log('settings', settings)

  const [score, setScore] = useState(0) 
  const [timeRemaining, setTimeRemaining] = useState(settings.duration)
  const [equation, setEquation] = useState(generateEquation(settings))
  const [gameOver, setGameOver] = useState(false)
  useEffect(() => {
    const input = document.getElementById('input') as HTMLInputElement    
    input.focus()
  }, [])
  useEffect(() => {
    setTimeout(() => {
      if (timeRemaining <= 1) {
        setTimeRemaining(0)
        setGameOver(true)
      } else {
        setTimeRemaining((timeRemaining) => timeRemaining-1)}
      }
      , 1000)    
  }, [timeRemaining])
  const checkAnswer = (guess: number, answer: number) => {
     if (guess == answer) {
        setScore(score => score +1)
        setEquation(() => generateEquation(settings))
        const inputElement = document.getElementById('input') as HTMLInputElement
        inputElement.value = ""
     } 
  }
  return (
      <main className="flex flex-col w-full h-full">
          <div id="top" className="flex flex-row h-64 w-full justify-between align-center p-3">
            <div id="timer" className="text-xl">Seconds left: {timeRemaining}</div>
            <div id="score" className="text-xl">Score: {score}</div>
          </div>         
          <div id="main-section" className="flex h-20 w-full flex-row justify-center gap-4 items-center bg-gray-300">
          {!gameOver && <>
          <div id="equation" className="text-4xl font-normal">{equation.representation} =
            </div>
            <input id='input' type="text" className=" pl-1 py-1 h-10 w-40 align-text-top text-4xl" onChange={(e) => checkAnswer(parseInt(e.target.value), equation.answer)}/>
          </>}
          {gameOver && <div className="flex flex-col gap-2 items-center">
            <p className="text-4xl">Score: {score}
              </p>   
              <div id='play-again-or-settings' className="flex flex-row gap-2 items-center pb-1">
            <a href='http://localhost:3000?game_id=5' className="underline text-sm text-blue-800"> 
              Try again              
            </a>
            <p>or</p>
            <a href='http://localhost:3000' className="underline text-sm text-blue-800"> 
                Change settings    
            </a>

              </div>
          </div>}
          </div>

      </main>
  );
}

export default Main
function randomInt(min: number, max: number) {
  const randomValues = new Uint32Array(1);
  window.crypto.getRandomValues(randomValues);
  return Math.floor(randomValues[0] / (0xFFFFFFFF + 1) * (max - min)) + min;
}
const generateEquation = (settings: EquationSettings): Equation => {
  const {addition1Min, addition1Max, addition2Min, addition2Max, multiplication1Min, multiplication1Max, multiplication2Min, multiplication2Max} = settings
  const options = []    
  if (settings.additionEnabled) options.push('addition')
  if (settings.subtractionEnabled) options.push('subtraction')
  if (settings.multiplicationEnabled) options.push('multiplication')
  if (settings.divisionEnabled) options.push('division')
  console.log(options)
  const idx = randomInt(0,options.length)
  const option = options[idx] 
  console.log("option: ", option)
  let operand1 = randomInt(addition1Min, addition1Max)
  let op = '+'
  let operand2 = randomInt(addition2Min, addition2Max) 
  let answer = operand1 + operand2
  if (option == 'subtraction') {
    op = '-'
    operand1 = operand2 + randomInt(addition1Min, addition1Max)
    answer = operand1 - operand2 
  } else if (option == 'multiplication') {
    op = '×' 
    operand1 = randomInt(multiplication1Min, multiplication1Max)
    operand2= randomInt(multiplication2Min, multiplication2Max)
    answer = operand1 * operand2
  } else if (option == 'division') {
    op = '÷'
    operand2 = randomInt(multiplication1Min, multiplication1Max)
    answer = randomInt(multiplication2Min, multiplication2Max)
    operand1 = operand2*answer
  }

  return {representation: `${operand1} ${op} ${operand2}`, answer: answer} 

}