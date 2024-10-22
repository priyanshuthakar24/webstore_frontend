import { ClipboardPlus, Heart, LayoutDashboard, ShoppingBag, UserRound } from "lucide-react";
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
                icon: ClipboardPlus,
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
    "Electronics",
    "Fashion",
    "Home and Kitchen",
    "Health and Beauty",
    "Sports and Fitness",
    "Baby and Kids",
    "Automotive",
    "Books, Music, and Movies",
    "Office and School Supplies",
    "Pet Supplies",
    "Home Improvement",
    "Outdoor and Garden",
    "Art and Crafts",
    "Food and Beverages",
    "Jewelry and Watches",
    "Travel and Luggage",
    "Gifts and Occasions",
    "Industrial and Scientific",
    "Electronics Accessories",
];
