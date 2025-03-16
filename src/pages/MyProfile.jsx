import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);
  const [image, setImage] = useState(false);
  const [isedit, setIsEdit] = useState(false);
  const updateUserProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);
       console.log("formData",formData)
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      console.log("data",data)
      if (data.success) {
        console.log("suces true")
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
         console.log("suces fasle");
        toast.error(data.message);
      }
    } catch (error) {
       console.log("suces error");
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isedit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </div>
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}

        {isedit ? (
          <input
            className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((pre) => ({ ...pre, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email Id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isedit ? (
            <input
              type="text"
              className="bg-gray-100  max-w-52"
              value={userData.phone}
              onChange={(e) =>
                setUserData((pre) => ({ ...pre, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isedit ? (
            <p>
              {" "}
              <input
                type="text"
                className="bg-gray-100"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((pre) => ({
                    ...pre,
                    address: { ...pre.address, line1: e.target.value },
                  }))
                }
              />
              <br />
              <input
                type="text"
                className="bg-gray-100"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((pre) => ({
                    ...pre,
                    address: { ...pre.address, line2: e.target.value },
                  }))
                }
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1} <br /> {userData.address.line2}
            </p>
          )}
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isedit ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isedit ? (
              <input
                type="date"
                className="max-w-28 bg-gray-100"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {isedit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all "
              onClick={updateUserProfile}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
