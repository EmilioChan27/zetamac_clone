"use client";
import { EquationSettings } from "@/components/Main";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
export type Equation = {
  answer: number;
  representation: string;
};
export default function Home() {
  const [op1AdditionMin, setOp1AdditionMin] = useState(2);
  const [op1AdditionMax, setOp1AdditionMax] = useState(100);
  const [op2AdditionMin, setOp2AdditionMin] = useState(2);
  const [op2AdditionMax, setOp2AdditionMax] = useState(100);
  const [op1MultiplicationMin, setOp1MultiplicationMin] = useState(2);
  const [op1MultiplicationMax, setOp1MultiplicationMax] = useState(12);
  const [op2MultiplicationMin, setOp2MultiplicationMin] = useState(2);
  const [op2MultiplicationMax, setOp2MultiplicationMax] = useState(100);
  const [additionEnabled, setAdditionEnabled] = useState(true);
  const [subtractionEnabled, setSubtractionEnabled] = useState(true);
  const [multiplicationEnabled, setMultiplicationEnabled] = useState(true);
  const [divisionEnabled, setDivisionEnabled] = useState(true);
  const [duration, setDuration] = useState(120);
  const [customEquations, setCustomEquations] = useState<Equation[] | undefined>(undefined)
  const [fileUploadError, setFileUploadError] = useState<string | null>(null)
  const [showCustomEquationButton, setShowCustomEquationButton] = useState(true)
  useEffect(() => {
    console.log("set division enabled to", divisionEnabled);
  }, [divisionEnabled]);
  useEffect(() => {
    console.log("set addition enabled to", additionEnabled);
  }, [additionEnabled]);
  useEffect(() => {
    console.log("set multiplicationEnabled to", multiplicationEnabled);
  }, [multiplicationEnabled]);
  useEffect(() => {
    console.log("set subtractione enabled to", subtractionEnabled);
  }, [subtractionEnabled]);
  const router = useRouter();
  const handleStartGame = () => {
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
      customEquations
    };
    sessionStorage.setItem("settings", JSON.stringify(settings));
    router.push("/test");
  };
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const showCustomEquationDialog = () => {
    const modal = modalRef;
    if (modal.current) {
      modal.current.showModal();
    }
  };
  const hideCustomEquationDialog = () => {
    const modal = modalRef
    if (modal.current) {
      modal.current.close()
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          // Parse the JSON content
          const parsedEquations: Equation[] = JSON.parse(reader.result as string);
          
          // If data matches the type, update the state
          if (Array.isArray(parsedEquations)) {
            setCustomEquations(parsedEquations);
            setFileUploadError(null); // Clear any previous errors
          } else {
            setFileUploadError('The attached JSON does not match the expected format.');
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e: unknown) {
          setFileUploadError('Failed to parse JSON.');
        }
      };

      reader.onerror = () => {
        setFileUploadError('Failed to read file.');
      };

      // Read the file as text
      reader.readAsText(file);
    }
  };
  return (
    <div id="main-page" className="flex flex-col items-center w-dvw h-dvh">
      <div
        id="container"
        className="bg-gray-300 flex flex-col max-h-fit w-2/5 p-6 gap-2"
      >
        <h1 className="text-3xl font-bold">Arithmetic Game</h1>
        <p>
          The Arithmetic Game is a fast-paced speed drill where you are given
          two minutes to solve as many arithmetic problems as you can.
        </p>
        <p>If you have any question, please contact arithmetic@zetamac.com</p>
        <div id="addition-settings" className="flex flex-col">
          <div className="flex flex-row">
            <input
              type="checkbox"
              defaultChecked
              className="mr-1"
              onChange={() => setAdditionEnabled((prev) => !prev)}
            />
            <p>Addition</p>
          </div>
          <div id="settings-input" className="pl-7 flex flex-row items-center">
            <p>{"Range: ("}</p>
            <input
              type="text"
              defaultValue={2}
              className="w-10 mx-1 h-6 pr-1 text-right"
              onChange={(e) => setOp1AdditionMin(parseInt(e.target.value))}
            />
            <p>to</p>
            <input
              type="text"
              defaultValue={100}
              className="w-10 mx-1 h-6 pr-1 text-right"
              onChange={(e) => setOp1AdditionMax(parseInt(e.target.value))}
            />
            <p>{") + ("}</p>
            <input
              type="text"
              defaultValue={2}
              className="w-10 mx-1 h-6 pr-1 text-right"
              onChange={(e) => setOp2AdditionMin(parseInt(e.target.value))}
            />
            <p>to</p>
            <input
              type="text"
              defaultValue={100}
              className="w-10 mx-1 h-6 pr-1 text-right"
              onChange={(e) => setOp2AdditionMax(parseInt(e.target.value))}
            />
            <p>{")"}</p>
          </div>
        </div>
        <div id="subtraction-settings" className="flex flex-col">
          <div className="flex flex-row">
            <input
              type="checkbox"
              defaultChecked
              className="mr-1"
              onChange={() => setSubtractionEnabled((prev) => !prev)}
            />
            <p>Subtraction</p>
          </div>
          <p className="pl-7">Addition problems in reverse.</p>
        </div>
        <div id="multiplication-settings" className="flex flex-col">
          <div className="flex flex-row">
            <input
              type="checkbox"
              defaultChecked
              className="mr-1"
              onChange={() => setMultiplicationEnabled((prev) => !prev)}
            />
            <p>Multiplication</p>
          </div>
          <div
            id="multiplication-settings-input"
            className="pl-7 flex flex-row items-center"
          >
            <p>{"Range: ("}</p>
            <input
              type="text"
              defaultValue={2}
              className="w-10 mx-1 h-6 pr-1 text-right"
              onChange={(e) =>
                setOp1MultiplicationMin(parseInt(e.target.value))
              }
            />
            <p>to</p>
            <input
              type="text"
              defaultValue={12}
              className="w-10 mx-1 h-6 pr-1 text-right"
              onChange={(e) =>
                setOp1MultiplicationMax(parseInt(e.target.value))
              }
            />
            <p>{") + ("}</p>
            <input
              type="text"
              defaultValue={2}
              className="w-10 mx-1 h-6 pr-1 text-right"
              onChange={(e) =>
                setOp2MultiplicationMin(parseInt(e.target.value))
              }
            />
            <p>to</p>
            <input
              type="text"
              defaultValue={100}
              className="w-10 mx-1 h-6 pr-1 text-right"
              onChange={(e) =>
                setOp2MultiplicationMax(parseInt(e.target.value))
              }
            />
            <p>{")"}</p>
          </div>
        </div>
        <div id="division-settings" className="flex flex-col">
          <div className="flex flex-row">
            <input
              type="checkbox"
              defaultChecked
              className="mr-1"
              onChange={() => setDivisionEnabled((prev) => !prev)}
            />
            <p>Division</p>
          </div>
          <p className="pl-7">Multiplication problems in reverse.</p>
        </div>
        <p className="flex self-center text-lg font-bold">OR</p>
        <div id="custom-equation" className="flex mb-3 items-start gap-1">
        {showCustomEquationButton && <button className="bg-gray-50 px-2 rounded-sm text-base" onClick={() => setShowCustomEquationButton(false)}>Upload Custom Equations</button>}
        {!showCustomEquationButton && <input id="file-upload" type="file" accept=".json" onChange={handleFileChange} className="px-2 py-1 bg-gray-50 rounded-sm text-base" />}

          <button
            onClick={showCustomEquationDialog}
            className="border-black-2 bg-white h-4 w-4 text-xs text-black rounded-full font-bold"
          >
            i
          </button>
          {fileUploadError && <p className="text-red-500 text-sm">{fileUploadError}</p>}
          {customEquations && <button onClick={() => {setCustomEquations(undefined); const fileInput = document.getElementById("file-upload") as HTMLInputElement; fileInput.value=""}} className="self-center ml-3 px-2 bg-gray-50 rounded-sm">Clear file</button>}
          <dialog
            ref={modalRef}
            className="rounded-sm"
          >

            <div className="flex flex-col gap-2 w-80 h-52 p-5 border-black rounded-full">
              <p>
              {`If you would like to practice on a custom set of equations, upload them here in valid json form such as the following:`}</p> <p>{`[{{"representation": "96 ÷ 6","answer": 16}}]`}
              </p>
              <button onClick={hideCustomEquationDialog} className="self-end red-blue-800 underline">Close</button>
            </div>
            </dialog>
        </div>

        <hr className="border-black" />
        <div id="duration" className="flex flex-row mt-2 gap-2">
          <p>Duration: </p>
          <select
            defaultValue={120}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-27"
          >
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={120}>120 seconds</option>
            <option value={300}>300 seconds</option>
            <option value={600}>600 seconds</option>
          </select>
        </div>
        <button
          onClick={handleStartGame}
          className="bg-white self-end px-3 rounded-sm"
        >
          Start
        </button>
      </div>
    </div>
  );
}
