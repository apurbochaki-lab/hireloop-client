"use client";

import React, { useState } from "react";
import {
    Form,
    TextField,
    Input,
    TextArea,
    Select,
    ListBox,
    Button,
    Label,
    FieldError,
    toast,
} from "@heroui/react";
import { LocationArrow, ArrowUpFromLine, PencilToSquare } from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
    // States
    const [isRegistered, setIsRegistered] = useState(() => {
        return typeof recruiterCompany !== undefined || recruiterCompany !== null;
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState({});

    // Company Data State
    const blankField = {
        name: "",
        industry: "",
        website: "",
        location: "",
        employeeCount: "",
        logo: "",
        description: "",
    }

    // Main company info
    const [company, setCompany] = useState(recruiterCompany || blankField);
    console.log(company)

    // Reusable Classes based on your design
    const textInputClass = "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors text-white rounded-lg";
    const selectBoxClass = "flex flex-col gap-1 w-full";
    const triggerClasses = "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors text-white rounded-lg h-11 px-3 w-full flex items-center justify-between";
    const popoverClasses = "bg-zinc-900 border border-zinc-800 rounded-lg p-1 min-w-[200px]";
    const listItemClasses = "text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md px-2 py-1.5 cursor-pointer outline-none data-[hover=true]:bg-zinc-800 data-[hover=true]:text-white";
    const textAreaClass = "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors text-white rounded-lg w-full p-3 resize-none outline-none focus:border-zinc-600";

    // Handle Logo Upload (ImageBB simulation)
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // নতুন করে আপলোড শুরু হলে আগের এরর ক্লিয়ার করার জন্য
        setErrors(prev => ({ ...prev, logo: null }));

        // File size validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const IMGBB_API = process.env.NEXT_PUBLIC_IMGBB_API;
            if (!IMGBB_API) {
                throw new Error("ImgBB API key is missing configuration.");
            }

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API}`, {
                method: "POST",
                body: formData
            });

            // যদি নেটওয়ার্ক বা সার্ভার লেভেলে কোনো সমস্যা হয় (যেমন: 404 বা 500)
            if (!res.ok) {
                throw new Error(`Upload failed with status: ${res.status}`);
            }

            const data = await res.json();

            // ImgBB সফলভাবে আপলোড করলে data.success true থাকে
            if (data && data.success && data.data?.url) {
                setCompany((prev) => ({ ...prev, logo: data.data.url }));
                console.log("Uploaded URL:", data.data?.url);
            } else {
                // ImgBB থেকে কোনো এরর মেসেজ আসলে সেটা ক্যাচ করার জন্য
                throw new Error(data.error?.message || "Failed to get image URL from ImgBB");
            }

        } catch (error) {
            console.error("Error uploading logo:", error);
            // ইউজারকে দেখানোর জন্য এরর স্টেট আপডেট
            setErrors(prev => ({
                ...prev,
                logo: error.message || "Something went wrong while uploading the logo."
            }));
        } finally {
            // আপলোড সফল হোক বা ব্যর্থ, লোডারটি অবশ্যই বন্ধ হবে
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData); // এতে ফর্মের সব ইনপুট (name, industry, employeeCount) চলে আসবে

        // Basic Validation
        let newErrors = {};
        if (!data.name) newErrors.name = "Company Name is required";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        const newCompanyData = {
            ...company,
            ...data,      // (name, industry, employeeCount ইত্যাদি)
            recruiterId: recruiter.id,
            status: company && company.status ? company.status : "Pending", // Pending, Approved, Rejected
        };

        setCompany(newCompanyData);

        setErrors({});
        setIsRegistered(true);
        setIsEditing(false);

        // POST in the database
        const payload = await createCompany(newCompanyData);
        
        if (payload.insertedId) {
            const savedCompany = { ...company, _id: payload.insertedId }
            setCompany(savedCompany)
            toast.success("Company profile created successfully!");
        }

    };

    // -------------------------------------------------------------
    // VIEW 1: No Company Registered
    // -------------------------------------------------------------
    if (!company?._id && !isEditing) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
                <h2 className="text-xl font-semibold text-white mb-2">No Company Registered</h2>
                <p className="text-zinc-400 mb-6 max-w-sm">
                    Set up your company profile to start posting jobs and connecting with candidates.
                </p>
                <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11"
                >
                    Register Company
                </Button>
            </div>
        );
    }

    // -------------------------------------------------------------
    // VIEW 2: Company Details (Read-Only)
    // -------------------------------------------------------------
    if (isRegistered && !isEditing) {
        return (
            <div className="bg-black border border-zinc-800 rounded-xl p-8 max-w-4xl mx-auto my-10">
                <div className="flex justify-between items-start mb-8 border-b border-zinc-800 pb-6">
                    <div className="flex items-center gap-4">
                        {company.logo ? (
                            <img src={company.logo} alt="Logo" className="w-16 h-16 rounded-lg object-cover border border-zinc-700" />
                        ) : (
                            <div className="w-16 h-16 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 font-medium">No Logo</div>
                        )}
                        <div>
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                {company.name || "Unnamed Company"}
                                {/* Status Badge */}
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${company.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    company.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    }`}>
                                    {company.status}
                                </span>
                            </h2>
                            <a href={company.website} target="_blank" className="text-blue-400 hover:underline text-sm">{company.website}</a>
                        </div>
                    </div>
                    <Button
                        onClick={() => setIsEditing(true)}
                        variant="flat"
                        className="bg-zinc-800 text-white hover:bg-zinc-700 rounded-lg px-4"
                        startContent={<PencilToSquare size={16} />}
                    >
                        Edit Profile
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-y-6 text-sm">
                    <div>
                        <p className="text-zinc-500 mb-1">Industry</p>
                        <p className="text-white font-medium">{company.industry || "-"}</p>
                    </div>
                    <div>
                        <p className="text-zinc-500 mb-1">Location</p>
                        <p className="text-white font-medium">{company.location || "-"}</p>
                    </div>
                    <div>
                        <p className="text-zinc-500 mb-1">Company Size</p>
                        <p className="text-white font-medium">{company.employeeCount || "-"}</p>
                    </div>
                    <div className="col-span-2 mt-4">
                        <p className="text-zinc-500 mb-2">About Company</p>
                        <p className="text-zinc-300 leading-relaxed">{company.description || "No description provided."}</p>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    // VIEW 3: Company Form (Create / Edit) - Matches Screenshot
    // -------------------------------------------------------------
    return (
        <div className="bg-[#121212] p-8 rounded-xl max-w-4xl mx-auto my-10 border border-zinc-800/50">
            <h2 className="text-xl font-medium text-white mb-6">
                {isRegistered ? "Edit Company Profile" : "Register Company"}
            </h2>

            <Form onSubmit={handleSubmit} validationErrors={errors} validationBehavior="aria" className="space-y-8">

                {/* Row 1: Name & Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <TextField name="name" isInvalid={!!errors.name} defaultValue={company.name} className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-200 font-medium text-sm">Company Name</Label>
                        <Input placeholder="e.g. Acme Corp" className={textInputClass} />
                        {errors.name && <FieldError className="text-xs text-danger mt-1">{errors.name}</FieldError>}
                    </TextField>

                    <Select className={selectBoxClass} name="industry" defaultSelectedKeys={company.industry ? [company.industry] : []}>
                        <Label className="text-zinc-200 font-medium text-sm mb-1 block">Industry / Category</Label>
                        <Select.Trigger className={triggerClasses}>
                            <Select.Value placeholder="Select industry..." />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className={popoverClasses}>
                            <ListBox className="outline-none">
                                <ListBox.Item id="Technology" className={listItemClasses} textValue="Technology">Technology</ListBox.Item>
                                <ListBox.Item id="Finance" className={listItemClasses} textValue="Finance">Finance</ListBox.Item>
                                <ListBox.Item id="Healthcare" className={listItemClasses} textValue="Healthcare">Healthcare</ListBox.Item>
                                <ListBox.Item id="Education" className={listItemClasses} textValue="Education">Education</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Row 2: Website & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Custom Website Input with https:// prefix block */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-200 font-medium text-sm block">Website URL</Label>
                        <div className="flex h-11">
                            <span className="bg-zinc-800/80 border border-r-0 border-zinc-800 rounded-l-lg px-4 flex items-center text-zinc-400 text-sm">
                                https://
                            </span>
                            <Input
                                name="website"
                                defaultValue={company.website?.replace('https://', '')}
                                placeholder="www.company.com"
                                className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white rounded-r-lg outline-none px-3"
                            />
                        </div>
                    </div>

                    <TextField name="location" defaultValue={company.location} className="flex flex-col gap-1 w-full relative">
                        <Label className="text-zinc-200 font-medium text-sm">Location</Label>
                        <div className="relative flex items-center h-11">
                            <LocationArrow size={16} className="absolute left-3 text-zinc-500 pointer-events-none z-10" />
                            <Input placeholder="City, Country" className={`${textInputClass} h-full pl-10 w-full`} />
                        </div>
                    </TextField>
                </div>

                {/* Row 3: Employee Count & Logo Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <Select className={selectBoxClass} name="employeeCount" defaultSelectedKeys={company.employeeCount ? [company.employeeCount] : []}>
                        <Label className="text-zinc-200 font-medium text-sm mb-1 block">Employee Count Range</Label>
                        <Select.Trigger className={triggerClasses}>
                            <Select.Value placeholder="Select range..." />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className={popoverClasses}>
                            <ListBox className="outline-none">
                                <ListBox.Item id="1-10" className={listItemClasses} textValue="1-10 employees">1-10 employees</ListBox.Item>
                                <ListBox.Item id="11-50" className={listItemClasses} textValue="11-50 employees">11-50 employees</ListBox.Item>
                                <ListBox.Item id="51-200" className={listItemClasses} textValue="51-200 employees">51-200 employees</ListBox.Item>
                                <ListBox.Item id="201+" className={listItemClasses} textValue="201+ employees">201+ employees</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* Logo Upload Component */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-200 font-medium text-sm block">Company Logo</Label>
                        <div className="flex items-center gap-4 mt-1">
                            <div className="relative flex items-center justify-center w-[60px] h-[60px] border border-dashed border-zinc-600 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/70 transition-colors cursor-pointer overflow-hidden">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    onChange={handleLogoUpload}
                                />
                                {company.logo && !isUploading ? (
                                    <img src={company.logo} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <ArrowUpFromLine size={20} className={`text-zinc-400 ${isUploading ? 'animate-bounce' : ''}`} />
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium">{isUploading ? 'Uploading...' : 'Upload image'}</p>
                                <p className="text-xs text-zinc-500 mt-0.5">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 4: Description */}
                <div className="w-full">
                    <Label className="text-zinc-200 font-medium text-sm mb-2 block">Brief Description</Label>
                    <TextArea
                        name="description"
                        defaultValue={company.description}
                        placeholder="Tell us about your company's mission and culture..."
                        rows={4}
                        className={textAreaClass}
                    />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800/50 w-full">
                    {isRegistered && (
                        <Button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg px-6 font-medium h-11"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                    >
                        {isRegistered ? "Save Changes" : "Register Company"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}