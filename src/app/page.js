import AuthPage from "@/components/auth-component";
import Calendar from "@/components/calender";
import CalendarPage from "@/components/hourly-calender";
import OrganizationForm from "@/components/new-organization";
import ProviderForm from "@/components/new-provider";
import Image from "next/image";

export default function Home() {
  return (
    <>
     <AuthPage />
     <ProviderForm />
     <OrganizationForm />
     {/* <Calendar /> */}
     <CalendarPage mode="hourly" />
     <CalendarPage mode="Range" />
    </>
  
  );
}
