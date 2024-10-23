import {  FilePlus2, Heart, LayoutDashboard, ShoppingBag, UserRound } from "lucide-react";
//! general menu 
export const Menus = [
    {
        name: 'Shop',
        link: 'shop'
    },

    {
        name: 'Stories',
        link: 'stories'
    }, {
        name: 'About',
        link: 'about'
    },
]

//! profile menu option if authenticated 
export const menuItems = [
    {
        link: "myprofile",
        name: "Profile",
        icon: UserRound
    },

    {
        link: "orders",
        name: "Orders",
        icon: ShoppingBag,
    },
    {
        link: "wishlist",
        name: "Wishlist",
        icon: Heart,
    },
];

//! admin menu option  if the user is authenticated and is  admin 
export const adminMenu = [
    {
        link: 'dashbord',
        name: 'Dashbord',
        icon: LayoutDashboard
    },
    {
        link: 'contact',
        name: 'contact',
        icon: LayoutDashboard
    }
]

export const links = [
    {
        title: 'Dashboard',
        links: [
            {
                name: 'ecommerce',
                icon: ShoppingBag,
            },
        ],
    },

    {
        title: 'Pages',
        links: [
            {
                name: 'addproduct',
                icon: FilePlus2,
            },
            {
                name: 'timeline',
                icon: LayoutDashboard,
            },
            {
                name: 'orders',
                icon: LayoutDashboard,
            },
            {
                name: 'employees',
                icon: Heart,
            },
            {
                name: 'customers',
                icon: Heart,
            },
        ],
    },
    {
        title: 'Apps',
        links: [
            {
                name: 'calendar',
                icon: UserRound,
            },
            {
                name: 'kanban',
                icon: UserRound,
            },
            {
                name: 'editor',
                icon: UserRound,
            },
            {
                name: 'color-picker',
                icon: UserRound,
            },
        ],
    },
    // {
    // title: 'Charts',
    // links: [
    // {
    // name: 'line',
    // icon: <UserRound />,
    // },
    // {
    // name: 'area',
    // icon: <UserRound />,
    // },

    // {
    // name: 'bar',
    // icon: <UserRound />,
    // },
    // {
    // name: 'pie',
    // icon: <UserRound />,
    // },
    // {
    // name: 'financial',
    // icon: <UserRound />,
    // },
    // {
    // name: 'color-mapping',
    // icon: <UserRound />,
    // },
    // {
    // name: 'pyramid',
    // icon: <UserRound />,
    // },
    // {
    // name: 'stacked',
    // icon: <UserRound />,
    // },
    // ],
    // },
];

export const categories = [
    "",
    "",
    "Home and Kitchen",
    "Health and Beauty",
    "Sports and Fitness",
    "Baby and Kids",
    "Automotive",
    "Books, Music, and Movies",
    "Office and School Supplies",
    "Pet Supplies",
    "Home Improvement",
    "",
    "Art and Crafts",
    "Food and Beverages",
    "Jewelry and Watches",
    "",
    "",
    "",
    "Electronics Accessories",
];
export const newcategory = [
    {
        value: "Electronics",
        label: "Electronics",
    },
    {
        value: "Fashion",
        label: "Fashion",
    },
    {
        value: "Outdoor and Garden",
        label: "Outdoor and Garden",
    },
    {
        value: "Industrial and Scientific",
        label: "Industrial and Scientific",
    },
    {
        value: "Gifts and Occasions",
        label: "Gifts and Occasions",
    },
    {
        value: "Travel and Luggage",
        label: "Travel and Luggage",
    }]