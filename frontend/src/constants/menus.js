// src/constants/menus.js

export const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "All Orders", path: "/dashboard/manage-orders" },

    { label: "Users", path: "/dashboard/users" },
    { label: "Team", path: "/dashboard/Team" },

    { label: "Manage Product", path: "/dashboard/ManageProduct" },
    { label: "Add Product", path: "/dashboard/:id/add-new-post" },

    { label: "Contact", path: "/dashboard/Contact" },

    { label: "Calendar", path: "/dashboard/calendar" },
  ];

  export const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];
  