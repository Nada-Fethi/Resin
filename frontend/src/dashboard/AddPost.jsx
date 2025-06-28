// eslint-disable-next-line no-unused-vars
import React from 'react'

import Sidebar from '../admin-view/sidebar'
import Header from '../admin-view/header';
import Dashboard from './dashboard';

const AddPost = () => {









  return (
    <div className="flex flex-1 flex min-h-screen w-full contr">

<Sidebar/>
<div className="column-contr flex flex-1 flex-col min-h-screen w-full flex flex-col">
<Header />

<main  >

<Dashboard/>

</main>
</div>

</div>
)
}

export default AddPost