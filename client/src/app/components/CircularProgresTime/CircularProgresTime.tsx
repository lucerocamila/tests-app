import React, { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import { useClientStore } from "@/store/TestJugadorStore/TestJugadorSrore";

interface CircularProgresTimeProps {
  tiempo: number;
  func?: () => void;
}

const CircularProgresTime: React.FC<CircularProgresTimeProps> = ({ tiempo, func }) => {
  const { finalizo, setFinalizo } = useClientStore();

  const [value, setValue] = useState(100);
  const [remainingTimeString, setRemainingTimeString] = useState(formatTime(tiempo * 60));

  useEffect(() => {
    let startTime: number | null = localStorage.getItem("startTime") ? parseInt(localStorage.getItem("startTime")!) : null;

    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem("startTime", startTime.toString());
    }

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime!;
      const remainingTime = tiempo * 60 * 1000 - elapsedTime;

      if (remainingTime <= 0) {
        clearInterval(interval);
        if (func && !finalizo) {
          func();
          setFinalizo(true);
        }
        setRemainingTimeString("0:00");
        return;
      }

      const progress = (remainingTime / (tiempo * 60 * 1000)) * 100;
      setValue(progress);
      setRemainingTimeString(formatTime(remainingTime));
      setValue((v) => (v >= 100 ? 100 : progress));
    }, 500);

    return () => clearInterval(interval);
  }, [tiempo, func, finalizo, setFinalizo]);

  function formatTime(milliseconds: number): string {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <>
      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={value}
        className="custom-progress bg-main_btn rounded-full"
        color="warning"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-black text-sm">{remainingTimeString}</div>
    </>
  );
}

export default CircularProgresTime;
