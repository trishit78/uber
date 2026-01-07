import React, { useContext } from "react";
import { DriverDataContext } from "../context/driverContext";

const DriverDetails = () => {
  const driverData = useContext(DriverDataContext);

  if (!driverData || !driverData[0] || !driverData[0]._id) {
    return <div className="p-4 text-gray-500">Loading driver details...</div>;
  }

  const driver = driverData[0];
  const { name, status, vehicle, _id } = driver;
  console.log('Driver loaded:', { name, status, vehicle, _id });

  const isActive = status === "active";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full border object-cover"
            src={`https://robohash.org/${_id}`}
            alt={name}
          />
          <div>
            <h4 className="text-lg font-semibold">{name}</h4>
           <button
  onClick={() => {
    // FUTURE:
    // 1. Update status to "active"
    // 2. Send location to backend
    console.log("Driver going ACTIVE, start location tracking");
  }}
  className={`text-xs px-4 py-1.5 rounded-full font-medium transition
    ${
      isActive
        ? "bg-green-600 text-white cursor-not-allowed"
        : "bg-red-100 text-red-700 hover:bg-red-200"
    }
  `}
>
  {isActive ? "GO OFFLINE" : "GO ONLINE"}
</button>
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="grid grid-cols-3 gap-4 mt-6 bg-gray-50 p-4 rounded-xl text-center">
        <div>
          <p className="text-sm text-gray-500">Vehicle Color</p>
          <p className="text-lg font-medium capitalize">{vehicle?.color}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Plate Number</p>
          <p className="text-lg font-medium">{vehicle?.plate}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Capacity</p>
          <p className="text-lg font-medium">{vehicle?.capacity} Seats</p>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
