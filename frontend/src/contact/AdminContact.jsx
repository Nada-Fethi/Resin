// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import Sidebar from '../admin-view/sidebar';
import Header from '../admin-view/header';
import ContactAd from './ContactAd';

const AdminContact = () => {




  return (
          <div className=" flex-1 flex min-h-screen w-full contr">

<Sidebar/>
<div className="column-contr  flex-1  min-h-screen w-full flex flex-col">
  <Header />

<main >
    <ContactAd/>
    </main>
    </div>
    </div>
  );
};


export default AdminContact