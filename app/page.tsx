'use client'
import React, {useEffect, useState} from 'react'
export type Equation = {
  answer: number;
  representation: string;
}
export default function Home() {
  const [score, setScore] = useState(0) 
  const [timeRemaining, setTimeRemaining] = useState(5)
  const [equation, setEquation] = useState(generateEquation)
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
        setEquation(generateEquation)
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
          <div id="main-section" className="flex h-24 w-full flex-row justify-center gap-4 items-center bg-gray-300">
          {!gameOver && <>
          <div id="equation" className="text-4xl font-normal">{equation.representation} =
            </div>
            <input id='input' type="text" className="h-12" onChange={(e) => checkAnswer(parseInt(e.target.value), equation.answer)}/>
          </>}
          {gameOver && <div className="flex flex-col gap-3 items-center">
            <p className="text-4xl">Score: {score}
              </p>   
            <a href='http://localhost:3000' className="underline text-sm text-blue-800"> 
              Try again              
            </a>
          </div>}
          </div>

      </main>
  );
}

function randomInt(min: number, max: number) {
  const randomValues = new Uint32Array(1);
  window.crypto.getRandomValues(randomValues);
  return Math.floor(randomValues[0] / (0xFFFFFFFF + 1) * (max - min + 1)) + min;
}
const generateEquation = (): Equation => {
  const n = randomInt(0,3)
  let op = "+"
  let operand1 = randomInt(2, 100)
  let operand2 = randomInt(2, 100) 
  let answer = operand1 + operand2
  if (n == 0) {
    op = '-'
    operand1 = operand2 + randomInt(2, 100)
    answer = operand1 - operand2 
  } else if (n == 1) {
    op = '×' 
    operand1 = randomInt(2, 100)
    operand2= randomInt(2, 12)
    answer = operand1 * operand2
  } else if (n == 2) {
    op = '÷'
    operand2 = randomInt(2, 12)
    answer = randomInt(2, 100)
    operand1 = operand2*answer
  }

  return {representation: `${operand1} ${op} ${operand2}`, answer: answer} 

}

