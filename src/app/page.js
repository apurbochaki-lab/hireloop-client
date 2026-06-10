import FeaturesJob from "@/components/FeaturesJob";
import GlobalStatsSection from "@/components/GlobalStatsSection";
// import JobCardsSection from "@/components/JobCardsSection";
import PricingSection from "@/components/PricingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <GlobalStatsSection/>
      {/* <JobCardsSection/> */}
      <FeaturesJob/>
      <PricingSection/>
    </div>
  );
}
