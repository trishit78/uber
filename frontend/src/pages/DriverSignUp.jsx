// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const DriverSignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [_userData, setUserData] = useState({});

//   const submitHandler = (e) => {
//     e.preventDefault();
//     setUserData({
//       name: name,
//       email: email,
//       password: password,
//     });

//     setEmail("");
//     setName("");
//     setPassword("");
//   };
//   return (
//     <div className="py-5 px-5 h-screen flex flex-col justify-between">
//       <div>
//         <Link to='/'>
//         <img
//           className="w-20 mb-3"
//           src="https://www.svgrepo.com/show/505031/uber-driver.svg"
//           alt=""
//           />
//           </Link>

//         <form
//           onSubmit={(e) => {
//             submitHandler(e);
//           }}
//         >
//           <h3 className="text-lg w-full  font-medium mb-2">
//             What's our Driver's name
//           </h3>
//           <div className="flex gap-4 mb-2">
//             <input
//               required
//               className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
//               type="text"
//               placeholder="Full name"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//               }}
//             />
//           </div>

//           <h3 className="text-lg font-medium mb-2">
//             What's our Driver's email
//           </h3>
//           <input
//             required
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
//             type="email"
//             placeholder="email@example.com"
//           />

//           <h3 className="text-lg font-medium mb-2">Enter Password</h3>

//           <input
//             className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             required
//             type="password"
//             placeholder="password"
//           />

//           <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
//             Login
//           </button>
//         </form>
//         <p className="text-center">
//           Already have a account?{" "}
//           <Link to="/driver-login" className="text-blue-600">
//             Login here
//           </Link>
//         </p>
//       </div>
//       <div>
//         <p className="text-[10px] leading-tight">
//           This site is protected by reCAPTCHA and the{" "}
//           <span className="underline">Google Privacy Policy</span> and{" "}
//           <span className="underline">Terms of Service apply</span>.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DriverSignUp;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DriverDataContext } from "../context/driverContext";

const DriverSignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [ _driver, setDriver ] = React.useContext(DriverDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const driverData = {
      name: name,
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    console.log(driverData)

    const response = await axios.post(
      `http://localhost:3000/api/v1/driver/signup`,
      driverData
    );

    if (response.status === 201) {
      const data = response.data;
      setDriver(data.data.user);
       localStorage.setItem("token", data.data.token);
      navigate("/driver-home");
    }

    setEmail("");
    setName("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <Link to='/'>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
          />
          </Link>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg w-full  font-medium mb-2">
            What's our Driver's name
          </h3>
          <div className="flex gap-4 mb-2">
            <input
              required
              className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">
            What's our Driver's email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Create Driver Account
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div className="mt-10">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default DriverSignUp;
