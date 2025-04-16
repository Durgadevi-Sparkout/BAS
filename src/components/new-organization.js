"use client";

import { useState } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Button
} from "@/components/ui/button";
import {
    Input
} from "@/components/ui/input";
import {
    Label
} from "@/components/ui/label";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"

  import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

export default function OrganizationForm() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: ''
    });
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [otp, setOtp] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOTPChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // After the organization form is submitted, show the OTP form
        setShowOTPForm(true);
    };

    const handleOTPSubmit = (e) => {
        e.preventDefault();
        // Logic to verify OTP
        // If OTP is correct, redirect to the next page
        // Here, we're just simulating the process
        setShowOTPForm(false);
        console.log("OTP Verified:", otp);

    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button onClick={() => setOpen(true)}>Create Organization</Button>
            </DrawerTrigger>

            <DrawerContent
                side="top"
                className="min-h-screen max-w-md w-full border-l bg-background shadow-lg overflow-y-hide"
            >
                <div className="p-4 border-b">
                    <DrawerTitle className="text-xl font-semibold">
                        {showOTPForm ? "OTP Verification" : "Organization Registration"}
                    </DrawerTitle>
                </div>

                <Card className="shadow-none border-none h-full">
                    <CardContent className="space-y-6 py-6">
                        {!showOTPForm ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Organization name"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Organization email"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Organization phone number"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Organization address"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a secure password"
                                        className="w-full"
                                    />
                                </div>

                                <Button className="w-full mt-4" type="submit">
                                    Submit
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleOTPSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="otp">Enter OTP</Label>
                                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>

                                <Button className="w-full mt-4" type="submit">
                                    Verify OTP
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </DrawerContent>
        </Drawer>
    );
}
