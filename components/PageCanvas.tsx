import { ReactElement, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Birds } from "./Birds";
import { BoidConstants } from "./types";
import * as Slider from "@radix-ui/react-slider";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const PageCanvas = (): ReactElement => {
  const [border, setBorder] = useState<number[]>([300, 180, 240]);
  const [boxOpacity, setBoxOpacity] = useState<number>(0);
  const [allPerching, setAllPerching] = useState<boolean>(false);
  const [numberBirds, setNumberBirds] = useState<number>(400);
  const [constants, setConstants] = useState<BoidConstants>({
    turnfactor: 0.2,
    visualRange: 40,
    protectedRange: 4,
    centering: 0.0005,
    avoid: 0.05,
    matching: 0.05,
    maxSpeed: 4,
    minSpeed: 2,
    turnFactor: 0.3,
    maxBias: 0.01,
    biasIncrm: 0.00004,
  });

  return (
    <div className="flex flex-row items-center bg-black space-x-4 h-full w-full absolute">
      <div className="flex flex-col space-y-4 ml-4 mt-4">
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
        <button
          className="p-2 bg-green-500 text-white disabled:bg-green-300"
          disabled={allPerching}
          onClick={() => setAllPerching(true)}
        >
          Perch all birds
        </button>
      </div>
      <div className="w-4/5 h-[700px] bg-black">
        <Canvas
          shadows={true}
          camera={{
            fov: 75,
            position: [400, 50, -100],
          }}
          className="bg-blue-400"
        >
          <CameraController />
          <Birds
            border={border}
            consts={constants}
            boxOpacity={boxOpacity}
            numberBirds={numberBirds}
            allPerching={allPerching}
            setAllPerching={setAllPerching}
          />
        </Canvas>
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
