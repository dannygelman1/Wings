import { ReactElement, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Birds } from "./Birds";
import { BoidConstants } from "./types";
import * as Slider from "@radix-ui/react-slider";

import styles from "../styles/radix.module.css";
import cn from "classnames";

export const PageCanvas = (): ReactElement => {
  const [border, setBorder] = useState<number[]>([300, 180, 240]);
  const [boxOpacity, setBoxOpacity] = useState<number>(0.4);
  const [numberBirds, setNumberBirds] = useState<number>(300);
  const [constants, setConstants] = useState<BoidConstants>({
    turnfactor: 0.2,
    visualRange: 40,
    protectedRange: 4,
    centeringFactor: 0.0005,
    avoidFactor: 0.05,
    matchingFactor: 0.05,
    maxSpeed: 4,
    minSpeed: 2,
    turnFactor: 0.2,
    maxBias: 0.01,
    biasIncrm: 0.00004,
  });

  return (
    <>
      <div className="w-full h-full h-grow bg-black absolute">
        <Canvas
          shadows={true}
          camera={{
            fov: 50,
            position: [
              Math.max(border[0], border[1], border[2]),
              Math.max(border[0], border[1], border[2]),
              Math.max(border[0], border[1], border[2]),
            ],
          }}
        >
          {/* <Environment map={map} background /> */}
          {/* <Geometry /> */}
          {/* <CircleCone /> */}
          <Birds
            border={border}
            boidConstants={constants}
            boxOpacity={boxOpacity}
            numberBirds={numberBirds}
          />
          {/* <primitive
            object={new AxesHelper(10).setColors(
              new Color(1, 1, 1),
              new Color(1, 0, 0),
              new Color(0, 1, 0)
            )}
          /> */}
        </Canvas>
      </div>
      <div className="absolute flex flex-col space-y-4 ml-4 mt-4">
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
          defaultVal={[constants.centeringFactor]}
          step={0.0001}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              centeringFactor: number[0],
            })
          }
        />
        <ConstSlider
          name="avoid factor"
          min={0}
          max={0.1}
          defaultVal={[constants.avoidFactor]}
          step={0.001}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              avoidFactor: number[0],
            })
          }
        />
        <ConstSlider
          name="matching factor"
          min={0}
          max={0.1}
          defaultVal={[constants.matchingFactor]}
          step={0.001}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              matchingFactor: number[0],
            })
          }
        />
        <ConstSlider
          name="turning factor"
          min={0.1}
          max={0.5}
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
          name="bias range"
          min={0}
          max={0.03}
          defaultVal={[constants.biasIncrm, constants.maxBias]}
          step={0.00001}
          onValueChange={(number: number[]) =>
            setConstants({
              ...constants,
              biasIncrm: number[0],
              maxBias: number[1],
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
      </div>
    </>
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
          <Slider.Range className="absolute bg-green-500 rounded-full h-full" />
        </Slider.Track>
        {defaultVal.map((i) => (
          <Slider.Thumb
            key={i}
            className="block w-5 h-5 bg-green-500 rounded-full outline-none "
          />
        ))}
      </Slider.Root>
    </div>
  );
};