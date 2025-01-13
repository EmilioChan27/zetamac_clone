'use client'
import React, {useState, useEffect} from 'react'
import { generateEquation } from '../game/page'
import { Equation } from "../page"
import { EquationSettings } from "@/components/Main"
import useVoiceInput from '@/components/VoiceInput'
const defaultSettings: EquationSettings = {
  addition1Max: 100,
  addition1Min: 2,
  addition2Max: 100,
  addition2Min: 2,
  multiplication1Max: 12,
  multiplication1Min: 2,
  multiplication2Max: 100,
  multiplication2Min: 2,
  additionEnabled: true,
  subtractionEnabled: true,
  multiplicationEnabled: true,
  divisionEnabled: true,
  duration: 120,
}
const Test: React.FC = () =>    {
  const settingsString = sessionStorage.getItem('settings')
  let settings = defaultSettings
  if (settingsString) {
    settings  = JSON.parse(settingsString)
  } 
  
  const [score, setScore] = useState(0) 
  // const [timeRemaining, setTimeRemaining] = useState(settings.duration)
  const [timeRemaining, setTimeRemaining] = useState(120)
  const [equation, setEquation] = useState<Equation>(generateEquation(settings))
  const [gameOver, setGameOver] = useState(false)
  const prevIncorrectEquations = sessionStorage.getItem('incorrectEquations')
  console.log(prevIncorrectEquations)
  const [incorrectEqs, setIncorrectEqs] = useState<Equation[]>(prevIncorrectEquations ? JSON.parse(prevIncorrectEquations) : [])
  const { transcript, error, resetTranscript } = useVoiceInput();


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
  const numDigits = (num: number) => {
      let n = num
      let digits = 0
      while (n > 0) {
        n /= 10 
        digits++
      }
      return digits
  }
  useEffect(() => {
        const checkAnswer = (guess: number, answer: number) => {
            console.log("checking answer")
            if (guess == answer) {
                setScore(score => score +1)
                setEquation(() => generateEquation(settings))
                const inputElement = document.getElementById('input') as HTMLInputElement
                inputElement.value = ""
              } else if (numDigits(guess) == numDigits(answer)) {
                  console.log("got it wrong with this equation:", equation)
                  const newArr = [...incorrectEqs, equation]
                  setIncorrectEqs(newArr)
                  sessionStorage.setItem('incorrectEquations', JSON.stringify(newArr))
                  console.log("just set sessionStorage to ", sessionStorage.getItem('incorrectEquations'))
              }
            resetTranscript()
          }
      checkAnswer(parseInt(transcript), equation.answer)    
    }, [transcript, equation, resetTranscript, settings, incorrectEqs])
  const handleEqDownload = () => {
    const incorrectSet = new Set(incorrectEqs) 
    const uniqueArr = Array.from(incorrectSet)
     const blob = new Blob([JSON.stringify(uniqueArr, null, 2)], {
        type: 'application/json',
      });

      // Create an anchor tag to trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'incorrect_equations.json'; // Specify the download file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }
  if (error) {
    return <p>{error}</p>
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
            {/* <input id='input' type="text" className=" pl-1 py-1 h-10 w-40 align-text-top text-4xl" onChange={(e) => checkAnswer(parseInt(e.target.value), equation.answer)}/> */}
            <input id='input' type="text" readOnly className=" pl-1 py-1 h-10 w-40 align-text-top text-4xl" value={transcript}/>
          </>}
          {gameOver && <div className="flex flex-col gap-1 items-center">
            <p className="text-4xl">Score: {score}
              </p>   
              <div id='play-again-or-settings' className="flex flex-row gap-2 items-center pb-1">
            <a href='http://localhost:3000/test' className="underline text-sm text-blue-800"> 
              Try again              
            </a>
            <p>or</p>
            <a href='http://localhost:3000' className="underline text-sm text-blue-800"> 
                Change settings    
            </a>
            <p>or</p>
            <p onClick={handleEqDownload} className="underline text-sm text-blue-800 cursor-pointer">Download errors</p>
              </div>
          </div>}
          </div>

      </main>
  );
}

export default Test