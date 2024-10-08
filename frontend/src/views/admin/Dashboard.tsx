import { useState, useEffect } from "react";
import clsx from "clsx";
import { WaitingChart } from "@components/admin/WaitingChart";
import { AcceptedChart } from "@components/admin/AcceptedChart";
import { DeclinedChart } from "@components/admin/DeclinedChart";
import { StaffProjectChart } from "@components/admin/StaffProjectChart";
import { OverviewChart } from "@components/admin/OverviewChart";
import toast from "react-hot-toast";
// Remove import for Redux
// import withAuthorization from "@/lib/utils/withAuthorization";

const mockData = {
  error: null,
  message: "Dashboard data fetched successfully",
  totalAccepted: 45,
  totalDeclined: 12,
  totalWaiting: 30,
  totalStaff: 100,
  totalProjects: 25,
};

const AdminDashboard = () => {
  const [visibleForm, setVisibleForm] = useState<string>("Waiting");
  const [dashboardData, setDashboardData] = useState(mockData);

  useEffect(() => {
    // Simulate fetching data
    const fetchDashboardData = () => {
      setTimeout(() => {
        setDashboardData(mockData);
        if (mockData.error) {
          toast.error(mockData.error);
        } else {
          toast.success(mockData.message);
        }
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  const handleContainerClick = (formName: string) => {
    setVisibleForm(formName);
  };

  return (
    <div className="px-2 py-2 md:px-4 rounded-md">
      <div className="p-4  border-gray-700 select-none">
        <div className="w-full grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-4 mb-4">
          <div className="lg:col-span-2 md:col-span-4 col-span-2 rounded-md">
            <OverviewChart />
          </div>

          <div className="lg:col-span-6 md:col-span-4 col-span-2">
            <div className="bg-white rounded-md">
              <div className="flex items-center justify-between px-3 border-b">
                <h3 className="text-black text-2xl font-bold px-2">CLAIMS</h3>
                <div className="flex items-center w-full justify-end">
                  <div className="flex gap-2 py-1 items-center">
                    <button
                      className={clsx(
                        "p-2 border-r hover:bg-slate-200 text-center",
                        {
                          "bg-gray-200": visibleForm === "Waiting",
                        }
                      )}
                      onClick={() => handleContainerClick("Waiting")}
                    >
                      <span>Waiting</span>
                    </button>
                    <button
                      className={clsx(
                        "p-2 border-r hover:bg-slate-200 text-center",
                        {
                          "bg-gray-200": visibleForm === "Accepted",
                        }
                      )}
                      onClick={() => handleContainerClick("Accepted")}
                    >
                      Approved
                    </button>
                    <button
                      className={clsx("p-2 hover:bg-slate-200 text-center", {
                        "bg-gray-200": visibleForm === "Declined",
                      })}
                      onClick={() => handleContainerClick("Declined")}
                    >
                      Declined
                    </button>
                  </div>
                </div>
              </div>

              <div>
                {visibleForm === "Waiting" && <WaitingChart />}
                {visibleForm === "Accepted" && <AcceptedChart />}
                {visibleForm === "Declined" && <DeclinedChart />}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg p-4 lg:col-span-2 md:col-span-2 col-span-1 rounded-md">
            <div>
              <h3 className="w-full border-b text-left mb-4 text-lg font-bold">
                WAITING{" "}
                <span className="text-sm text-gray-300 font-normal">
                  this month
                </span>
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold">{dashboardData.totalWaiting}</div>
              <div className="text-sm text-gray-500">Claims pending action</div>
            </div>
          </div>

          <div className="bg-white shadow-lg p-4 lg:col-span-2 md:col-span-2 col-span-1 rounded-md">
            <div>
              <h3 className="w-full border-b text-left mb-4 text-lg font-bold">
                ACCEPTED{" "}
                <span className="text-sm text-gray-300 font-normal">
                  this month
                </span>
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold">{dashboardData.totalAccepted}</div>
              <div className="text-sm text-gray-500">Claims accepted</div>
            </div>
          </div>

          <div className="bg-white shadow-lg p-4 lg:col-span-2 md:col-span-2 col-span-1 rounded-md">
            <div>
              <h3 className="w-full border-b text-left mb-4 text-lg font-bold">
                DECLINED{" "}
                <span className="text-sm text-gray-300 font-normal">
                  this month
                </span>
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold">{dashboardData.totalDeclined}</div>
              <div className="text-sm text-gray-500">Claims declined</div>
            </div>
          </div>

          <div className="bg-white shadow-lg p-4 lg:col-span-1 md:col-span-2 col-span-1 rounded-md">
            <div>
              <h3 className="w-full border-b text-left mb-4 text-lg font-bold">
                STAFFS
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold">{dashboardData.totalStaff}</div>
              <div className="text-sm text-gray-500">Total Staffs</div>
            </div>
          </div>

          <div className="bg-white shadow-lg p-4 lg:col-span-1 col-span-2 rounded-md">
            <div>
              <h3 className="w-full border-b text-left mb-4 text-lg font-bold">
                PROJECTS
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold">{dashboardData.totalProjects}</div>
              <div className="text-sm text-gray-500">Total Projects</div>
            </div>
          </div>

          <div className="lg:col-span-8 md:col-span-4 col-span-2">
            <StaffProjectChart />
          </div>
        </div>
      </div>
    </div>
  );
};

// Remove withAuthorization if not needed
// const allowedRoles = ["admin"];
// export default withAuthorization(AdminDashboard, allowedRoles);
export default AdminDashboard;
