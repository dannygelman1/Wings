import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Birds } from "./Birds";
import { BoidConstants } from "./types";
import * as Slider from "@radix-ui/react-slider";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import cn from "classnames";

export const PageCanvas = (): ReactElement => {
  const [border, setBorder] = useState<number[]>([300, 180, 240]);
  const [boxOpacity, setBoxOpacity] = useState<number>(0);
  const [allPerching, setAllPerching] = useState<boolean>(false);
  const [numberBirds, setNumberBirds] = useState<number>(400);
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const [wireReset, setWireReset] = useState<number>(0);
  const [constants, setConstants] = useState<BoidConstants>({
    turnfactor: 0.2,
    visualRange: 40,
    protectedRange: 4,
    centering: 0.0005,
    avoid: 0.05,
    matching: 0.05,
    maxSpeed: 2.5,
    minSpeed: 1,
    turnFactor: 0.3,
    maxBias: 0.01,
    biasIncrm: 0.00004,
  });

  return (
    <div className="flex h-full w-full">
      <div className="w-full h-full flex-grow flex bg-black absolute">
        <Canvas
          shadows={true}
          camera={{
            fov: 75,
            position: [400, 0, -100],
            far: 1600,
          }}
          className="bg-gradient-to-b from-red-400 to-orange-200"
        >
          <CameraController />
          <Birds
            border={border}
            consts={constants}
            boxOpacity={boxOpacity}
            numberBirds={numberBirds}
            allPerching={allPerching}
            wireReset={wireReset}
            setAllPerching={setAllPerching}
          />
        </Canvas>
      </div>
      <button
        className={cn(
          "absolute mt-2 ml-2 bg-[#8b81c2] hover:bg-[#aaa1da] rounded-md group",
          { invisible: optionsVisible }
        )}
        onClick={() => {
          setOptionsVisible(true);
        }}
      >
        <LogoIcon className="text-gray-100 hover:text-white" />
      </button>
      {optionsVisible && (
        <div className="flex h-full p-2 absolute">
          <Options
            allPerching={allPerching}
            border={border}
            boxOpacity={boxOpacity}
            constants={constants}
            numberBirds={numberBirds}
            setAllPerching={setAllPerching}
            setBorder={setBorder}
            setBoxOpacity={setBoxOpacity}
            setConstants={setConstants}
            setNumberBirds={setNumberBirds}
            setOptionsVisible={setOptionsVisible}
            setWireReset={setWireReset}
            wireReset={wireReset}
          />
        </div>
      )}
    </div>
  );
};

interface OptionsProps {
  allPerching: boolean;
  border: number[];
  boxOpacity: number;
  constants: BoidConstants;
  numberBirds: number;
  wireReset: number;
  setAllPerching: Dispatch<SetStateAction<boolean>>;
  setBorder: Dispatch<SetStateAction<number[]>>;
  setBoxOpacity: Dispatch<SetStateAction<number>>;
  setConstants: Dispatch<SetStateAction<BoidConstants>>;
  setNumberBirds: Dispatch<SetStateAction<number>>;
  setOptionsVisible: Dispatch<SetStateAction<boolean>>;
  setWireReset: Dispatch<SetStateAction<number>>;
}

const Options = ({
  allPerching,
  border,
  boxOpacity,
  constants,
  numberBirds,
  setAllPerching,
  setBorder,
  setBoxOpacity,
  setConstants,
  setNumberBirds,
  setOptionsVisible,
  setWireReset,
  wireReset,
}: OptionsProps) => {
  return (
    <div className="flex flex-col p-2 space-y-2 bg-red-900/40 rounded-lg">
      <button
        onClick={() => setOptionsVisible(false)}
        className="flex justify-end"
      >
        <div className="flex w-3 h-3">
          <XIcon />
        </div>
      </button>
      <div className="flex flex-col space-y-4 overflow-y-scroll">
        <ConstSlider
          name="number birds"
          min={0}
          max={700}
          defaultVal={[numberBirds]}
          step={1}
          onValueChange={(number: number[]) => setNumberBirds(number[0])}
        />
        <ConstSlider
          name="x boundry"
          min={30}
          max={300}
          defaultVal={[border[0]]}
          step={1}
          onValueChange={(number: number[]) =>
            setBorder([number[0], border[1], border[2]])
          }
        />
        <ConstSlider
          name="y boundry"
          min={30}
          max={300}
          defaultVal={[border[1]]}
          step={1}
          onValueChange={(number: number[]) =>
            setBorder([border[0], number[0], border[2]])
          }
        />
        <ConstSlider
          name="z boundry"
          min={30}
          max={300}
          defaultVal={[border[2]]}
          step={1}
          onValueChange={(number: number[]) =>
            setBorder([border[0], border[1], number[0]])
          }
        />
        <ConstSlider
          name="visual range"
          min={0}
          max={60}
          defaultVal={[constants.visualRange]}
          step={1}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              visualRange: number[0],
            })
          }
        />
        <ConstSlider
          name="protected range"
          min={0}
          max={20}
          defaultVal={[constants.protectedRange]}
          step={1}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              protectedRange: number[0],
            })
          }
        />
        <ConstSlider
          name="centering factor"
          min={0}
          max={0.01}
          defaultVal={[constants.centering]}
          step={0.0001}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              centering: number[0],
            })
          }
        />
        <ConstSlider
          name="avoid factor"
          min={0}
          max={0.1}
          defaultVal={[constants.avoid]}
          step={0.001}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              avoid: number[0],
            })
          }
        />
        <ConstSlider
          name="matching factor"
          min={0}
          max={0.1}
          defaultVal={[constants.matching]}
          step={0.001}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              matching: number[0],
            })
          }
        />
        <ConstSlider
          name="turning factor"
          min={0.2}
          max={0.6}
          defaultVal={[constants.turnFactor]}
          step={0.001}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              turnFactor: number[0],
            })
          }
        />
        <ConstSlider
          name="speed range"
          min={1}
          max={6}
          defaultVal={[constants.minSpeed, constants.maxSpeed]}
          step={0.1}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              minSpeed: number[0],
              maxSpeed: number[1],
            })
          }
        />
        <ConstSlider
          name="box opacity"
          min={0}
          max={1}
          defaultVal={[boxOpacity]}
          step={0.01}
          onValueChange={(number: number[]) => setBoxOpacity(number[0])}
        />
        <button
          className="p-2 bg-[#998fcf] text-white disabled:bg-green-300 rounded-lg text-xs"
          disabled={allPerching}
          onClick={() => setAllPerching(true)}
        >
          Perch all birds
        </button>
        <button
          className="p-2 bg-[#998fcf] text-white disabled:bg-green-300 rounded-lg text-xs"
          onClick={() => setWireReset(wireReset + 1)}
        >
          Generate new wires
        </button>
      </div>
    </div>
  );
};

interface ConstSliderProps {
  min: number;
  max: number;
  defaultVal: number[];
  step: number;
  name: string;
  onValueChange: (value: number[]) => void;
  changeOnCommit?: boolean;
}

const ConstSlider = ({
  min,
  max,
  defaultVal,
  step,
  name,
  onValueChange,
}: ConstSliderProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-white select-none">{name}</span>
      <Slider.Root
        className="relative select-none touch-none flex items-center w-[200px] h-2"
        minStepsBetweenThumbs={1}
        defaultValue={defaultVal}
        min={min}
        max={max}
        onValueCommit={onValueChange}
        step={step}
        aria-label="Volume"
      >
        <Slider.Track className="relative bg-white rounded-full h-2 flex-grow">
          <Slider.Range className="absolute bg-[#998fcf] rounded-full h-full" />
        </Slider.Track>
        {defaultVal.map((i) => (
          <Slider.Thumb
            key={i}
            className="block w-5 h-5 bg-[#998fcf] rounded-full outline-none "
          />
        ))}
      </Slider.Root>
    </div>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

interface LogoIconsProps {
  className?: string;
}
const LogoIcon = ({ className }: LogoIconsProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 72 42"
      xmlSpace="preserve"
      className={cn(className, "w-[72px] h-[42px]")}
    >
      <path
        d="M 10 10 C 20 20, 40 20, 50 10"
        stroke="currentColor"
        fill="transparent"
      />
      <path
        d="M 15 11 C 25 21, 45 21, 55 11"
        stroke="currentColor"
        fill="transparent"
      />
      <path
        d="M 20 12 C 30 22, 50 22, 60 12"
        stroke="currentColor"
        fill="transparent"
      />
      <polyline points="8,10 23,12" fill="none" stroke="currentColor" />
      <polyline points="47,10 63,12" fill="none" stroke="currentColor" />
      <polyline points="15,7 15,35" fill="none" stroke="currentColor" />
      <polyline points="55,7 55,35" fill="none" stroke="currentColor" />
    </svg>
  );
};

interface XIconProps {
  className?: string;
}
const XIcon = ({ className }: XIconProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={cn(className, "w-6 h-6")}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.22676 4.22676C4.5291 3.92441 5.01929 3.92441 5.32163 4.22676L12 10.9051L18.6784 4.22676C18.9807 3.92441 19.4709 3.92441 19.7732 4.22676C20.0756 4.5291 20.0756 5.01929 19.7732 5.32163L13.0949 12L19.7732 18.6784C20.0756 18.9807 20.0756 19.4709 19.7732 19.7732C19.4709 20.0756 18.9807 20.0756 18.6784 19.7732L12 13.0949L5.32163 19.7732C5.01929 20.0756 4.5291 20.0756 4.22676 19.7732C3.92441 19.4709 3.92441 18.9807 4.22676 18.6784L10.9051 12L4.22676 5.32163C3.92441 5.01929 3.92441 4.5291 4.22676 4.22676Z"
        fill="currentColor"
      />
    </svg>
  );
};
