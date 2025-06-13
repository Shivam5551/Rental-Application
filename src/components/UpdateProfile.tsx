'use client'

import axios, { isAxiosError } from "axios";
import { Session } from "next-auth"
import { signIn } from "next-auth/react";
import Image from "next/image"
import { ChangeEvent, useCallback, useEffect, useState } from "react";


export const UpdateProfile = ({ session }: { session: Session }) => {
    const [updateProfilePhoto, setUpdateProfilePhoto] = useState(false);
    const [updateName, setUpdateName] = useState(false);
    const [newName, setNewName] = useState<string>('')
    const [updateEmail, setUpdateEmail] = useState(false);
    const [newEmail, setNewEmail] = useState<string>('');
    const [updatePassword, setUpdatePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [updateState, setUpdateState] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const submitRequest = async () => {
            let formData: FormData | null = null;
            formData = new FormData();
            if (updateName) formData.append("name", newName);
            if (updateEmail) formData.append("email", newEmail);
            if (updatePassword) {
                formData.append("oldPassword", oldPassword);
                formData.append("newPassword", newPassword);
            }
            if (updateProfilePhoto && selectedImage) {

                formData.append("image", selectedImage);
            }

            try {
                const res = (updateProfilePhoto && selectedImage)
                    ? await axios.post("api/v1/update/profile", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    })
                    : await axios.post("api/v1/update/profile", formData);

                if (res.data.success) {
                    await signIn();
                    setUpdateName(false);
                    setUpdateEmail(false);
                    setUpdatePassword(false);
                    setUpdateProfilePhoto(false);
                    setNewPassword('');
                    setOldPassword('');
                    setSelectedImage(null);
                    setImagePreview(null);
                    alert("Done: " + res.data.message);

                }
            } catch (error) {
                if (isAxiosError(error)) {
                    alert(error.response?.data.message || "Error Occurred");
                }
                console.log(error);
            } finally {
                setUpdateState(false);
            }
        };

        if (updateState) {
            submitRequest();
        }
    }, [updateState]);

    useEffect(() => {
        if (selectedImage) {
            setImagePreview(URL.createObjectURL(selectedImage));
        }
        return () => setImagePreview(null);
    }, [selectedImage]);
      const handleUpdateDetails = useCallback(() => {
        if (updatePassword && (!oldPassword || !newPassword)) {
            alert("Please fill both password fields");
            return;
        }
        if (!updateState && (updateEmail || updateName || updatePassword || updateProfilePhoto)) {
            setUpdateState(true);
        }
    }, [updateEmail, updatePassword, oldPassword, newPassword, updateName, updateProfilePhoto, updateState]);


    const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    }, []);


    if (!session) {
        return null;
    }

  

    return (
        <div className="flex flex-col p-5 items-center shadow-md bg-neutral-100 dark:bg-slate-800 rounded-xl justify-center">
            <div className="h-30 w-30 rounded-full flex items-center justify-center">
                {imagePreview ? (
                    <Image
                        className="rounded-full"
                        src={imagePreview}
                        alt="profile image"
                        width={100}
                        height={100}
                    />
                ) : session.user?.image ? (
                    <Image
                        className="rounded-full"
                        src={session.user.image}
                        alt="profile image"
                        width={100}
                        height={100}
                    />
                ) : <div className="bg-neutral-200 p-8 rounded-full dark:bg-black dark:text-white text-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                }
            </div>
            <div className="w-full space-y-3 flex-col flex">
                <div className="flex space-y-1 justify-center flex-col dark:text-white text-black font-semibold w-full items-center">
                    <button onClick={() => setUpdateProfilePhoto(!updateProfilePhoto)} className="cursor-pointer hover:underline">Change</button>
                    {!!updateProfilePhoto ? <div className="flex justify-center w-full gap-2">
                        <div>
                            <input
                                onChange={handleImageChange}
                                accept="image/png, image/jpeg, image/webp, image/gif"
                                className="block w-full p-2 mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="profilePhoto" type="file" itemType="image"
                            />
                            <p className="text-xs text-slate-500 mt-0.5">
                                PNG, JPG SVG, WEBP, and GIF are Allowed.
                            </p>
                        </div>
                        <button onClick={() => { setSelectedImage(null); setUpdateProfilePhoto(false); setImagePreview(null) }} className="h-full w-fit flex items-center justify-center p-2 rounded-xl cursor-pointer text-white hover:bg-red-500 bg-red-700">
                            Cancel
                        </button>
                    </div> : ""}
                </div>
                <div className="flex text-black dark:text-white space-x-2 items-center justify-between text-xl font-semibold">
                    <div className="items-center flex">
                        <span className="whitespace-pre">{"Name: "}</span>
                        {!!updateName ? <input autoFocus onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)} value={newName} placeholder="Enter name" className="dark:bg-white focus:outline-none ml-1 dark:text-black bg-slate-800 rounded-lg font-light text-sm p-1.5 text-white border" />
                            : <span className="font-light">{session.user?.name ? session.user.name : "Undefined"}</span>
                        }
                    </div>
                    <button onClick={() => setUpdateName(!updateName)} className="text-blue-500 dark:text-blue-200 hover:underline cursor-pointer">{!!updateName ? "Cancel" : "Update"}</button>
                </div>
                <div className="flex text-black dark:text-white space-x-2 items-center justify-between text-xl font-semibold">
                    <div className="items-center flex">
                        <span className="whitespace-pre">{"Email: "}</span>
                        {!!updateEmail ? <input placeholder="Enter new Email" autoFocus onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)} value={newEmail} className="dark:bg-white focus:outline-none ml-1 dark:text-black bg-slate-800 rounded-lg font-light text-sm p-1.5 text-white border" type="email" />
                            : <span className="font-light">{session.user?.email}</span>
                        }
                    </div>
                    <button onClick={() => setUpdateEmail(!updateEmail)} className="text-blue-500 dark:text-blue-200 hover:underline cursor-pointer">{!!updateEmail ? "Cancel" : "Update"}</button>
                </div>
                <div className="flex w-full">
                    {!!updatePassword ?
                        <div className="flex items-center w-full flex-col justify-start space-y-1">
                            <h2 className="text-left flex w-full text-black dark:text-white text-lg font-semibold">{"Update Password: "}</h2>
                            <div className="lg:flex block items-center w-full justify-evenly space-y-1 h-fit lg:space-x-1">
                                <div className="flex flex-col space-y-1 w-full justify-start">
                                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)} value={oldPassword} type={showPassword ? "text" : "password"} className="dark:bg-white text-base p-1 ml-1 bg-slate-800 text-white focus:outline-0 border rounded-lg dark:text-black" placeholder="Enter Your Old Password" />
                                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} value={newPassword} type={showPassword ? "text" : "password"} className="dark:bg-white text-base p-1 ml-1 bg-slate-800 text-white focus:outline-0 border rounded-lg dark:text-black" placeholder="Enter Your New Password" />
                                </div>
                                <button onClick={() => { setUpdatePassword(false); setNewPassword(''); setOldPassword(''); setShowPassword(false) }} className="w-full lg:w-fit lg:h-full flex items-center justify-center px-6 py-1.5 rounded-xl cursor-pointer text-white font-semibold hover:bg-red-500 bg-red-700">
                                    Cancel
                                </button>
                            </div>
                            <label htmlFor="showPassword" className="text-black items-center justify-start w-full ml-8 flex m-2 gap-2 dark:text-white">
                                <input id="showPassword" checked={showPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowPassword(e.target.checked)} type="checkbox" />
                                Show Password
                            </label>
                        </div>
                        : <button className="font-semibold flex items-center justify-center w-full bg-blue-700 p-2 rounded-2xl cursor-pointer text-white hover:bg-blue-500" onClick={() => setUpdatePassword(!updatePassword)}>Change Password</button>
                    }
                </div>
            </div>
            {(!!updateEmail || !!updateName || !!updatePassword || !!updateProfilePhoto) ?
                <div className="flex w-full mt-2 items-center justify-center">
                    <button disabled={updateState} onClick={handleUpdateDetails} className="flex p-2 transform transition-all duration-200 cursor-pointer rounded-2xl hover:rounded-4xl dark:hover:outline-red-500 w-full justify-center font-semibold hover:outline bg-orange-400 text-white hover:bg-orange-200 hover:text-black items-center">{!!updateState ? "Updating..." : "Update Details"}</button>
                </div> : ""
            }
        </div>
    )
}