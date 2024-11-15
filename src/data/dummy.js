import { Heart, LayoutDashboard, Package, PackagePlus, Shirt, ShoppingBag, UserRound } from "lucide-react";

import { MdOutlineAddHome } from "react-icons/md";


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
                icon: MdOutlineAddHome,
            },
            {
                name: 'products',
                icon: Shirt,
            },
            {
                name: 'orders',
                icon: Package,
            },
            {
                name: 'newOrder',
                icon: PackagePlus,
            },
            // {
            //     name: 'customers',
            //     icon: Heart,
            // },
        ],
    },
    // {
    //     title: 'Apps',
    //     links: [
    //         {
    //             name: 'calendar',
    //             icon: UserRound,
    //         },
    //         {
    //             name: 'kanban',
    //             icon: UserRound,
    //         },
    //         {
    //             name: 'editor',
    //             icon: UserRound,
    //         },
    //         {
    //             name: 'color-picker',
    //             icon: UserRound,
    //         },
    //     ],
    // },

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
// custom grid templet 

export const gridOrderImage = (props) => (
    <div>
        <img
            className="rounded-xl max-w-20 md:ml-3"
            src={props.mainImage.url}
            alt="order-item"
        />
    </div>
);
export const gridOrderStatus = (props) => {
    const statusColors = {
        Pending: '#FB9678',
        Packed: '#03A9F4',
        Shipping: '#FFC107',
        Delivered: '#4CAF50',
    };

    const backgroundColor = statusColors[props.shippingStatus] || '#000000';

    return (
        <button
            type="button"
            style={{ background: backgroundColor }}
            className="text-white py-1 px-2 capitalize rounded text-md"
        >
            {props.shippingStatus || "Pending"}
        </button>
    );
};

export const gridPaymentStatus = (props) => (
    <div className="flex gap-2 justify-start items-center text-gray-700 capitalize">
        <p
            style={{ background: props.paymentStatus === "paid" ? 'green' : 'red' }}
            className="rounded-full h-3 w-3"
        />
        <p>{props.paymentStatus || "unpaid"}</p>
    </div>
);

export const GridCustomer = (props) => (
    <p className="capitalize">{props.customerName || "Unknown Customer"}</p>
);

export const GridOrder = (props) => (
    <p className="font-sans font-bold"># {props.orderId ? props.orderId.slice(-6) : "N/A"}</p>
);


// //! product table grid 
export const productGrid = [
    {
        headerText: 'Image',
        template: gridOrderImage,
        textAlign: 'Center',
        width: '120',
    },
    {
        field: 'name',
        headerText: 'Item',
        width: '150',
        editType: 'dropdownedit',
        textAlign: 'Center',
    },
    {
        field: 'description',
        headerText: 'Description',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'mrp',
        headerText: 'Total Amount',
        format: 'C2',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
    },
    {
        field: 'salePrice',
        headerText: 'Sale Price',
        format: 'C2',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
    },
    {
        field: 'category',
        headerText: 'Category',
        width: '150',
        textAlign: 'Center',
    },
];

export const ordersGrid = [
    {
        template: GridOrder,
        headerText: 'Order ID',
        width: '150',
    },
    {
        field: 'orderDate',
        headerText: 'Order Date',
        type: "date",
        format: "d/M/y",
        width: '120',
    },
    {
        template: GridCustomer,
        headerText: 'Customer Name',
        width: '100',
    },
    {
        headerText: 'Payment Status',
        template: gridPaymentStatus,
        width: '100',
    },
    {
        field: 'paymentId',
        headerText: 'Payment ID',
        width: '150',
    },
    {
        field: 'totalAmount',
        headerText: 'Total Amount',
        format: 'C2',
        width: '100'
    },
    {
        headerText: 'Shipping Status',
        template: gridOrderStatus,
        textAlign: 'Center',
        width: '120'
    },
];

