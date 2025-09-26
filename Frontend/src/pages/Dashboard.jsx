import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TrafficLight from "../components/TrafficLight";
import ViolatorTable from "../components/ViolatorTable";
import AnalyticsChart from "../components/AnalyticsChart";
import EmergencyAlert from "../components/EmergencyAlert";

const LANE_ORDER = ["North", "East", "South", "West"];
const GREEN_DURATION = 10;
const YELLOW_DURATION = 3;

const initialState = {
  lanes: {
    North: { count: 5, signal: "red", timer: 0 },
    East: { count: 8, signal: "red", timer: 0 },
    South: { count: 7, signal: "red", timer: 0 },
    West: { count: 10, signal: "red", timer: 0 },
  },
  emv: { present: true, lane: "East", type: "Ambulance" },
  violators: [
    { plate: "TN10AB1234", lane: "North", time: "10:05", fine: 500 },
    { plate: "TN22XY6789", lane: "East", time: "10:10", fine: 1000 },
  ],
  stc_enabled: true,
};

function Dashboard() {
  const [laneIndex, setLaneIndex] = useState(0);
  const [phase, setPhase] = useState("green");
  const [timer, setTimer] = useState(GREEN_DURATION);
  const [lanes, setLanes] = useState(initialState.lanes);

  // Tick every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t > 1) return t - 1;

        // Timer expired: switch phase or lane
        if (phase === "green") {
          setPhase("yellow");
          return YELLOW_DURATION;
        } else {
          // Move to next lane clockwise
          setLaneIndex((i) => (i + 1) % LANE_ORDER.length);
          setPhase("green");
          return GREEN_DURATION;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  // Update all lane signals based on active lane & phase
  useEffect(() => {
    const updatedLanes = {};

    LANE_ORDER.forEach((lane, idx) => {
      if (idx === laneIndex) {
        updatedLanes[lane] = {
          ...lanes[lane],
          signal: phase,
          timer,
        };
      } else {
        updatedLanes[lane] = {
          ...lanes[lane],
          signal: "red",
          timer: 0,
        };
      }
    });

    setLanes(updatedLanes);
  }, [laneIndex, phase, timer]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <Header stcEnabled={initialState.stc_enabled} toggleSTC={() => {}} team={[]} />

      {/* Emergency Alert */}
      <EmergencyAlert emv={initialState.emv} />

      <div className="grid grid-cols-2 gap-6 mt-4">
        {/* Left Side → Video Feeds */}
        <div className="grid grid-cols-2 gap-4">
          {LANE_ORDER.map((lane) => (
            <div
              key={lane}
              className={`rounded-xl overflow-hidden relative ${
                lanes[lane].signal === "green" ? "ring-4 ring-green-400" : ""
              }`}
            >
              <img
                src={`/traffic/stream/${lane.toLowerCase()}`}
                alt={`${lane} Lane`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs p-1 text-center">
                {lane} Lane
              </div>
            </div>
          ))}
        </div>

        {/* Right Side → Traffic Lights Control */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Traffic Control Panel
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {LANE_ORDER.map((lane) => (
              <div
                key={lane}
                className="flex flex-col items-center bg-gray-50 rounded-lg p-3 shadow-sm"
              >
                <TrafficLight color={lanes[lane].signal} timer={lanes[lane].timer} />
                <div className="mt-2 font-medium">{lane} Lane</div>
                <div className="text-xs text-gray-500">Vehicles: {lanes[lane].count}</div>
                <div className="text-xs text-gray-400">
                  Pedestrian:{" "}
                  {lanes[lane].signal === "red" ? (
                    <span className="text-green-600 font-semibold">Walk</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Stop</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <ViolatorTable violators={initialState.violators} />
        <AnalyticsChart lanesData={lanes} />
      </div>
    </div>
  );
}

export default Dashboard;