import React from "react";

import HospitalHeader from "../components/admin/hospitals/HospitalHeader";
import HospitalStats from "../components/admin/hospitals/HospitalStats";
import HospitalToolbar from "../components/admin/hospitals/HospitalToolbar";
import HospitalsTable from "../components/admin/hospitals/HospitalsTable";

const AdminHospitals = () => {

  return (

    <div className="max-w-7xl mx-auto p-8 space-y-8">

      <HospitalHeader />

      <HospitalStats />

      <HospitalToolbar />

      <HospitalsTable />

    </div>

  );

};

export default AdminHospitals;