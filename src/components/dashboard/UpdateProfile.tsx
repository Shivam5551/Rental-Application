"use client";

import { ImageKitAuthenticator } from "@/utils/ImagekitAuthenticator";
import { upload } from "@imagekit/next";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export interface IAuthenticator {
    token: string;
    expire: number;
    signature: string;
    publicKey: string;
}

export const UpdateProfile = () => {
    const { data: session, update } = useSession();
    const [updateProfilePhoto, setUpdateProfilePhoto] = useState(false);
    const [updateName, setUpdateName] = useState(false);
    const [newName, setNewName] = useState<string>("");
    const [updateEmail, setUpdateEmail] = useState(false);
    const [newEmail, setNewEmail] = useState<string>("");
    const [updatePassword, setUpdatePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [updateState, setUpdateState] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const abortController = useRef(new AbortController());

    const authenticator = useCallback(async () => {
        const data = await ImageKitAuthenticator();
        if (!data) {
            toast.error("Failed to Authenticate");
            return null;
        }
        const { signature, expire, token, publicKey }: IAuthenticator = data;
        return { signature, expire, token, publicKey };
    }, []);

    const handleUpload = async () => {
        const file = selectedImage;
        if (!file) {
            return;
        }

        let authParams;
        try {
            authParams = await authenticator();
            if (!authParams) {
                throw new Error("Auth Error");
            }
        } catch (authError) {
            toast.error("Unable to authenticate request");
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey }: IAuthenticator = authParams;

        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                abortSignal: abortController.current.signal,
            });
            return uploadResponse.url;
        } catch (error) {
            toast.error("Unable to upload profile photo");
            console.log(error);
            return;
        }
    };
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    useEffect(() => {
        const submitRequest = async () => {
            const payload: Record<string, string> = {};
            let uploadedImageUrl: string | null = null;

            if (updateProfilePhoto && selectedImage) {
                const uploadResult = await handleUpload();
                if (!uploadResult) {
                    toast.error("Unable to update profile try again later!");
                    setUpdateState(false);
                    return;
                }
                uploadedImageUrl = uploadResult;
                payload.image = uploadResult;
            }

            if (updateName && newName.trim()) payload.name = newName.trim();
            if (updateEmail && newEmail.trim()) payload.email = newEmail.trim();
            if (updatePassword) {
                payload.oldPassword = oldPassword;
                payload.newPassword = newPassword;
            }

            try {
                const res = await axios.post("/api/update/profile", payload);

                if (res.data.success) {
                    const sessionUpdateData: Record<string, string> = {};

                    if (updateName && newName.trim()) {
                        sessionUpdateData.name = newName.trim();
                    }
                    if (updateEmail && newEmail.trim()) {
                        sessionUpdateData.email = newEmail.trim();
                    }
                    if (updateProfilePhoto && uploadedImageUrl) {
                        sessionUpdateData.image = uploadedImageUrl;
                    }

                    if (Object.keys(sessionUpdateData).length > 0) {
                        await update(sessionUpdateData);
                    }

                    setUpdateName(false);
                    setUpdateEmail(false);
                    setUpdatePassword(false);
                    setUpdateProfilePhoto(false);
                    setNewName("");
                    setNewEmail("");
                    setNewPassword("");
                    setOldPassword("");
                    setSelectedImage(null);
                    setImagePreview(null);

                    toast.success("Profile Updated Successfully");
                } else {
                    toast.error(res.data.message || "Failed to update profile");
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.message || "Update failed");
                    console.log(error);
                } else {
                    toast.error("Unable to update Profile");
                }
            } finally {
                setUpdateState(false);
            }
        };

        if (updateState) {
            submitRequest();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateState]);

    const handleUpdateDetails = useCallback(() => {
        if (updatePassword && (!oldPassword.trim() || !newPassword.trim())) {
            toast.error("Please fill both password fields");
            return;
        }
        if (updateName && !newName.trim()) {
            toast.error("Please enter a valid name");
            return;
        }
        if (updateEmail && !newEmail.trim()) {
            toast.error("Please enter a valid email");
            return;
        }
        if (!updateState && (updateEmail || updateName || updatePassword || updateProfilePhoto)) {
            setUpdateState(true);
        }
    }, [
        updateEmail,
        updatePassword,
        oldPassword,
        newPassword,
        updateName,
        updateProfilePhoto,
        updateState,
        newName,
        newEmail,
    ]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

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
                        className="rounded-full bg-gray-400"
                        src={session.user.image}
                        alt=""
                        width={100}
                        height={100}
                    />
                ) : (
                    <div className="bg-neutral-200 p-8 rounded-full dark:bg-black dark:text-white text-2xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className="w-full space-y-3 flex-col flex">
                <div className="flex space-y-1 justify-center flex-col dark:text-white text-black font-semibold w-full items-center">
                    <button
                        onClick={() => setUpdateProfilePhoto(!updateProfilePhoto)}
                        className="cursor-pointer hover:underline"
                    >
                        Change
                    </button>
                    {!!updateProfilePhoto ? (
                        <div className="flex justify-center w-full gap-2">
                            <div>
                                <input
                                    onChange={handleImageChange}
                                    accept="image/png, image/jpeg, image/webp, image/gif"
                                    className="block w-full p-2 mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="profilePhoto"
                                    type="file"
                                    itemType="image"
                                />
                                <p className="text-xs text-slate-500 mt-0.5">
                                    PNG, JPG SVG, WEBP, and GIF are Allowed.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    if (imagePreview) {
                                        URL.revokeObjectURL(imagePreview);
                                    }

                                    setSelectedImage(null);
                                    setUpdateProfilePhoto(false);
                                    setImagePreview(null);
                                }}
                                className="h-full w-fit flex items-center justify-center p-2 rounded-xl cursor-pointer text-white hover:bg-red-500 bg-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex text-black dark:text-white space-x-2 items-center justify-between text-xl font-semibold">
                    <div className="items-center flex">
                        <span className="whitespace-pre">{"Name: "}</span>
                        {!!updateName ? (
                            <input
                                autoFocus
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNewName(e.target.value)
                                }
                                value={newName}
                                placeholder="Enter name"
                                className="dark:bg-white focus:outline-none ml-1 dark:text-black bg-slate-800 rounded-lg font-light text-sm p-1.5 text-white border"
                            />
                        ) : (
                            <span className="font-light">
                                {session.user?.name ? session.user.name : "Undefined"}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setUpdateName(!updateName)}
                        className="text-blue-500 dark:text-blue-200 hover:underline cursor-pointer"
                    >
                        {!!updateName ? "Cancel" : "Update"}
                    </button>
                </div>
                <div className="flex text-black dark:text-white space-x-2 items-center justify-between text-xl font-semibold">
                    <div className="items-center flex">
                        <span className="whitespace-pre">{"Email: "}</span>
                        {!!updateEmail ? (
                            <input
                                placeholder="Enter new Email"
                                autoFocus
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNewEmail(e.target.value)
                                }
                                value={newEmail}
                                className="dark:bg-white focus:outline-none ml-1 dark:text-black bg-slate-800 rounded-lg font-light text-sm p-1.5 text-white border"
                                type="email"
                            />
                        ) : (
                            <span className="font-light">{session.user?.email}</span>
                        )}
                    </div>
                    <button
                        onClick={() => setUpdateEmail(!updateEmail)}
                        className="text-blue-500 dark:text-blue-200 hover:underline cursor-pointer"
                    >
                        {!!updateEmail ? "Cancel" : "Update"}
                    </button>
                </div>
                <div className="flex w-full">
                    {!!updatePassword ? (
                        <div className="flex items-center w-full flex-col justify-start space-y-1">
                            <h2 className="text-left flex w-full text-black dark:text-white text-lg font-semibold">
                                {"Update Password: "}
                            </h2>
                            <div className="lg:flex block items-center w-full justify-evenly space-y-1 h-fit lg:space-x-1">
                                <div className="flex flex-col space-y-1 w-full justify-start">
                                    <input
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setOldPassword(e.target.value)
                                        }
                                        value={oldPassword}
                                        type={showPassword ? "text" : "password"}
                                        className="dark:bg-white text-base p-1 ml-1 bg-slate-800 text-white focus:outline-0 border rounded-lg dark:text-black"
                                        placeholder="Enter Your Old Password"
                                    />
                                    <input
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setNewPassword(e.target.value)
                                        }
                                        value={newPassword}
                                        type={showPassword ? "text" : "password"}
                                        className="dark:bg-white text-base p-1 ml-1 bg-slate-800 text-white focus:outline-0 border rounded-lg dark:text-black"
                                        placeholder="Enter Your New Password"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        setUpdatePassword(false);
                                        setNewPassword("");
                                        setOldPassword("");
                                        setShowPassword(false);
                                    }}
                                    className="w-full lg:w-fit lg:h-full flex items-center justify-center px-6 py-1.5 rounded-xl cursor-pointer text-white font-semibold hover:bg-red-500 bg-red-700"
                                >
                                    Cancel
                                </button>
                            </div>
                            <label
                                htmlFor="showPassword"
                                className="text-black items-center justify-start w-full ml-8 flex m-2 gap-2 dark:text-white"
                            >
                                <input
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setShowPassword(e.target.checked)
                                    }
                                    type="checkbox"
                                />
                                Show Password
                            </label>
                        </div>
                    ) : (
                        <button
                            className="font-semibold flex items-center justify-center w-full bg-blue-700 p-2 rounded-2xl cursor-pointer text-white hover:bg-blue-500"
                            onClick={() => setUpdatePassword(!updatePassword)}
                        >
                            Change Password
                        </button>
                    )}
                </div>
            </div>
            {!!updateEmail || !!updateName || !!updatePassword || !!updateProfilePhoto ? (
                <div className="flex w-full mt-2 items-center justify-center">
                    <button
                        disabled={updateState}
                        onClick={handleUpdateDetails}
                        className="flex p-2 transform transition-all duration-200 cursor-pointer rounded-2xl hover:rounded-4xl dark:hover:outline-red-500 w-full justify-center font-semibold hover:outline bg-orange-400 text-white hover:bg-orange-200 hover:text-black items-center"
                    >
                        {!!updateState ? "Updating..." : "Update Details"}
                    </button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
