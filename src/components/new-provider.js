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
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export default function ProviderFormDrawer() {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button onClick={() => setOpen(true)}>Create Provider</Button>
            </DrawerTrigger>

            <DrawerContent
                side="top"
                className="min-h-screen max-w-md w-full border-l bg-background shadow-lg overflow-y-hide"
            >
                <div className="p-4 border-b">
                    <DrawerTitle className="text-xl font-semibold">
                        Provider Registration
                    </DrawerTitle>
                </div>

                <Card className="shadow-none border-none h-full">
                    <CardContent className="space-y-6 py-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Provider name" className="w-full" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" placeholder="Describe your service" className="w-full" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bookingType">Booking Type</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select booking type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="token">Token</SelectItem>
                                    <SelectItem value="hourly">Hourly</SelectItem>
                                    <SelectItem value="range">Range</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Secure password" className="w-full" />
                        </div>

                        <Button className="w-full mt-4" type="submit">
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </DrawerContent>
        </Drawer>
    );
}
