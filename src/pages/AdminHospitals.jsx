import React, { useEffect, useState } from "react";
import API from "../api/axios";

import HospitalHeader from "../components/admin/hospitals/HospitalHeader";
import HospitalStats from "../components/admin/hospitals/HospitalStats";
import HospitalToolbar from "../components/admin/hospitals/HospitalToolbar";
import HospitalsTable from "../components/admin/hospitals/HospitalsTable";
import HospitalPagination from "../components/admin/hospitals/HospitalPagination";

const AdminHospitals = () => {

  const [hospitals, setHospitals] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchHospitals = async () => {

    try {

      setLoading(true);

      const res = await API.get("/admin/users", {

        params: {

          role: "hospital"

        }

      });

      setHospitals(res.data.users);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchHospitals();

  }, []);

  return (

    <div className="max-w-7xl mx-auto p-8 space-y-8">

      <HospitalHeader />

      <HospitalStats hospitals={hospitals} />

      <HospitalToolbar />

      <HospitalsTable
        hospitals={hospitals}
        loading={loading}
      />

      <HospitalPagination />

    </div>

  );

};

export default AdminHospitals;