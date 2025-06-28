// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "../admin-view/sidebar";
import Header from "../admin-view/header";
import Calendars from "./calendars";

const Calendar = () => {
  return (
    <div className="flex flex-1  min-h-screen w-full contr">
      <Sidebar />
      <div className="mcolumn-contr flex flex-1 flex-col min-h-screen w-full">
        <Header />
        <main className="">
                    <div className="containecustom max-w-7xl mx-auto p-6">
            <h2 className="headingsection text-2xl font-bold mb-6"> Calendar</h2>
</div>
          <Calendars />
        </main>
      </div>
    </div>
  );
};

export default Calendar;
