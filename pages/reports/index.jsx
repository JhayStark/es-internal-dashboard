import AreaGraph from "@/components/AreaGraph";
import PieChartComponent from "@/components/PieChart";
import { StatsTabOption1, StatsTabOption2 } from "@/components/StatsTab";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineForm } from "react-icons/ai";
import { RiMessage2Line, RiVoiceprintLine } from "react-icons/ri";
import Table from "@/components/Table";

const Index = () => {
  return (
    <>
      <div className="grid grid-cols-7 gap-3 3xl:gap-5 mb-9">
        <div className="col-span-5 p-4 bg-white rounded-lg shadow-3xl">
          <p className="py-2 text-xl font-bold">Revenue Per Qtr</p>
          <div className="h-80">
            <AreaGraph />
          </div>
        </div>
        <div className="col-span-2 p-4 bg-white rounded-lg shadow-3xl ">
          <p className="text-xl font-bold">User Service Usage</p>

          <PieChartComponent />

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="w-5 h-2 rounded-xl bg-[#214BB8]"></div>
              <p className="text-lg font-semibold">2250</p>
              <p className="text-sm text-[#7E7E7E]">insyt</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-5 h-2 rounded-xl bg-[#FE634E]"></div>
              <p className="text-lg font-semibold">2250</p>
              <p className="text-sm text-[#7E7E7E]">Sms</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-5 h-2 rounded-xl bg-[#45ADDA]"></div>
              <p className="text-lg font-semibold">2250</p>
              <p className="text-sm text-[#7E7E7E]">Voice</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 3xl:gap-5 mb-9">
        <StatsTabOption1
          title="Total Users"
          icon={<IoIosPeople />}
          iconColor={"text-[#0FA958]"}
          value={955456}
          subValue={5445456}
        />
        <StatsTabOption1
          title="Total Forms"
          icon={<AiOutlineForm />}
          iconColor={"text-[#699BF7]"}
          value={955456}
          subValue={5445456}
        />
        <StatsTabOption2
          title="Total Voice"
          icon={<RiVoiceprintLine />}
          iconColor={"text-[#F24E1E]"}
          value={955456}
          subValue={5445456}
        />
        <StatsTabOption2
          title="Total Sms"
          icon={<RiMessage2Line />}
          iconColor={"text-[#F24E1E]"}
          value={955456}
          subValue={5445456}
        />
      </div>
      <div className="p-4 bg-white rounded-lg shadow-3xl ">
        <Table title="Total Transactions" />
      </div>
    </>
  );
};

export default Index;
