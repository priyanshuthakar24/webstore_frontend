import { FilePlus2, Heart, LayoutDashboard, ShoppingBag, UserRound } from "lucide-react";












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
                name: 'products',
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
            className="rounded-xl h-20 md:ml-3"
            src={props.mainImage.url}
            alt="order-item"
        />
    </div>
);
export const gridOrderStatus = (props) => (
    <button
        type="button"
        style={{ background: props.StatusBg }}
        className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
        {props.Status}
    </button>
);
// //! product table grid 
export const ordersGrid = [
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
        field: 'stock',
        headerText: 'Quantity',
        width: '120',
        textAlign: 'Center',
    },

    {
        field: 'category',
        headerText: 'Category',
        width: '150',
        textAlign: 'Center',
    },
];
// export const ordersData = [
//     {
//         OrderID: 10248,
//         CustomerName: 'Vinet',

//         TotalAmount: 32.38,
//         OrderItems: 'Fresh Tomato',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             product6,
//     },
//     {
//         OrderID: 345653,
//         CustomerName: 'Carson Darrin',
//         TotalAmount: 56.34,
//         OrderItems: 'Butter Scotch',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product5,
//     },
//     {
//         OrderID: 390457,
//         CustomerName: 'Fran Perez',
//         TotalAmount: 93.31,
//         OrderItems: 'Candy Gucci',
//         Location: 'New York',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product7,
//     },
//     {
//         OrderID: 893486,
//         CustomerName: 'Anika Viseer',
//         TotalAmount: 93.31,
//         OrderItems: 'Night Lamp',
//         Location: 'Germany',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 748975,
//         CustomerName: 'Miron Vitold',
//         TotalAmount: 23.99,
//         OrderItems: 'Healthcare Erbology',
//         Location: 'Spain',
//         Status: 'rejected',
//         StatusBg: 'red',
//         ProductImage:
//             product1,
//     },
//     {
//         OrderID: 94757,
//         CustomerName: 'Omar Darobe',
//         TotalAmount: 95.99,
//         OrderItems: 'Makeup Lancome Rouge',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product2,
//     },
//     {
//         OrderID: 944895,
//         CustomerName: 'Lulia albu',
//         TotalAmount: 17.99,
//         OrderItems: 'Skincare',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product3,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Penjani',
//         TotalAmount: 59.99,
//         OrderItems: 'Headphone',
//         Location: 'USA',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Jie Yan',
//         TotalAmount: 87.99,
//         OrderItems: 'Shoes',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
//     {
//         OrderID: 38489,
//         CustomerName: 'Miron',
//         TotalAmount: 87.99,
//         OrderItems: 'Ice Cream',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg',
//     },
//     {
//         OrderID: 24546,
//         CustomerName: 'Frank',
//         TotalAmount: 84.99,
//         OrderItems: 'Pan Cake',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
//     {
//         OrderID: 10248,
//         CustomerName: 'Vinet',

//         TotalAmount: 32.38,
//         OrderItems: 'Fresh Tomato',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             product6,
//     },
//     {
//         OrderID: 345653,
//         CustomerName: 'Carson Darrin',
//         TotalAmount: 56.34,
//         OrderItems: 'Butter Scotch',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product5,
//     },
//     {
//         OrderID: 390457,
//         CustomerName: 'Fran Perez',
//         TotalAmount: 93.31,
//         OrderItems: 'Candy Gucci',
//         Location: 'New York',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product7,
//     },
//     {
//         OrderID: 893486,
//         CustomerName: 'Anika Viseer',
//         TotalAmount: 93.31,
//         OrderItems: 'Night Lamp',
//         Location: 'Germany',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 748975,
//         CustomerName: 'Miron Vitold',
//         TotalAmount: 23.99,
//         OrderItems: 'Healthcare Erbology',
//         Location: 'Spain',
//         Status: 'rejected',
//         StatusBg: 'red',
//         ProductImage:
//             product1,
//     },
//     {
//         OrderID: 94757,
//         CustomerName: 'Omar Darobe',
//         TotalAmount: 95.99,
//         OrderItems: 'Makeup Lancome Rouge',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product2,
//     },
//     {
//         OrderID: 944895,
//         CustomerName: 'Lulia albu',
//         TotalAmount: 17.99,
//         OrderItems: 'Skincare',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product3,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Penjani',
//         TotalAmount: 59.99,
//         OrderItems: 'Headphone',
//         Location: 'USA',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Jie Yan',
//         TotalAmount: 87.99,
//         OrderItems: 'Shoes',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
//     {
//         OrderID: 38489,
//         CustomerName: 'Miron',
//         TotalAmount: 87.99,
//         OrderItems: 'Ice Cream',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg',
//     },
//     {
//         OrderID: 24546,
//         CustomerName: 'Frank',
//         TotalAmount: 84.99,
//         OrderItems: 'Pan Cake',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
//     {
//         OrderID: 10248,
//         CustomerName: 'Vinet',

//         TotalAmount: 32.38,
//         OrderItems: 'Fresh Tomato',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             product6,
//     },
//     {
//         OrderID: 345653,
//         CustomerName: 'Carson Darrin',
//         TotalAmount: 56.34,
//         OrderItems: 'Butter Scotch',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product5,
//     },
//     {
//         OrderID: 390457,
//         CustomerName: 'Fran Perez',
//         TotalAmount: 93.31,
//         OrderItems: 'Candy Gucci',
//         Location: 'New York',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product7,
//     },
//     {
//         OrderID: 893486,
//         CustomerName: 'Anika Viseer',
//         TotalAmount: 93.31,
//         OrderItems: 'Night Lamp',
//         Location: 'Germany',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 748975,
//         CustomerName: 'Miron Vitold',
//         TotalAmount: 23.99,
//         OrderItems: 'Healthcare Erbology',
//         Location: 'Spain',
//         Status: 'rejected',
//         StatusBg: 'red',
//         ProductImage:
//             product1,
//     },
//     {
//         OrderID: 94757,
//         CustomerName: 'Omar Darobe',
//         TotalAmount: 95.99,
//         OrderItems: 'Makeup Lancome Rouge',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product2,
//     },
//     {
//         OrderID: 944895,
//         CustomerName: 'Lulia albu',
//         TotalAmount: 17.99,
//         OrderItems: 'Skincare',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product3,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Penjani',
//         TotalAmount: 59.99,
//         OrderItems: 'Headphone',
//         Location: 'USA',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Jie Yan',
//         TotalAmount: 87.99,
//         OrderItems: 'Shoes',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
//     {
//         OrderID: 38489,
//         CustomerName: 'Miron',
//         TotalAmount: 87.99,
//         OrderItems: 'Ice Cream',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg',
//     },
//     {
//         OrderID: 24546,
//         CustomerName: 'Frank',
//         TotalAmount: 84.99,
//         OrderItems: 'Pan Cake',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
//     {
//         OrderID: 10248,
//         CustomerName: 'Vinet',

//         TotalAmount: 32.38,
//         OrderItems: 'Fresh Tomato',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             product6,
//     },
//     {
//         OrderID: 345653,
//         CustomerName: 'Carson Darrin',
//         TotalAmount: 56.34,
//         OrderItems: 'Butter Scotch',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product5,
//     },
//     {
//         OrderID: 390457,
//         CustomerName: 'Fran Perez',
//         TotalAmount: 93.31,
//         OrderItems: 'Candy Gucci',
//         Location: 'New York',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product7,
//     },
//     {
//         OrderID: 893486,
//         CustomerName: 'Anika Viseer',
//         TotalAmount: 93.31,
//         OrderItems: 'Night Lamp',
//         Location: 'Germany',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 748975,
//         CustomerName: 'Miron Vitold',
//         TotalAmount: 23.99,
//         OrderItems: 'Healthcare Erbology',
//         Location: 'Spain',
//         Status: 'rejected',
//         StatusBg: 'red',
//         ProductImage:
//             product1,
//     },
//     {
//         OrderID: 94757,
//         CustomerName: 'Omar Darobe',
//         TotalAmount: 95.99,
//         OrderItems: 'Makeup Lancome Rouge',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product2,
//     },
//     {
//         OrderID: 944895,
//         CustomerName: 'Lulia albu',
//         TotalAmount: 17.99,
//         OrderItems: 'Skincare',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product3,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Penjani',
//         TotalAmount: 59.99,
//         OrderItems: 'Headphone',
//         Location: 'USA',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Jie Yan',
//         TotalAmount: 87.99,
//         OrderItems: 'Shoes',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
//     {
//         OrderID: 38489,
//         CustomerName: 'Miron',
//         TotalAmount: 87.99,
//         OrderItems: 'Ice Cream',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg',
//     },
//     {
//         OrderID: 24546,
//         CustomerName: 'Frank',
//         TotalAmount: 84.99,
//         OrderItems: 'Pan Cake',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
//     {
//         OrderID: 10248,
//         CustomerName: 'Vinet',

//         TotalAmount: 32.38,
//         OrderItems: 'Fresh Tomato',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             product6,
//     },
//     {
//         OrderID: 345653,
//         CustomerName: 'Carson Darrin',
//         TotalAmount: 56.34,
//         OrderItems: 'Butter Scotch',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product5,
//     },
//     {
//         OrderID: 390457,
//         CustomerName: 'Fran Perez',
//         TotalAmount: 93.31,
//         OrderItems: 'Candy Gucci',
//         Location: 'New York',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product7,
//     },
//     {
//         OrderID: 893486,
//         CustomerName: 'Anika Viseer',
//         TotalAmount: 93.31,
//         OrderItems: 'Night Lamp',
//         Location: 'Germany',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 748975,
//         CustomerName: 'Miron Vitold',
//         TotalAmount: 23.99,
//         OrderItems: 'Healthcare Erbology',
//         Location: 'Spain',
//         Status: 'rejected',
//         StatusBg: 'red',
//         ProductImage:
//             product1,
//     },
//     {
//         OrderID: 94757,
//         CustomerName: 'Omar Darobe',
//         TotalAmount: 95.99,
//         OrderItems: 'Makeup Lancome Rouge',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             product2,
//     },
//     {
//         OrderID: 944895,
//         CustomerName: 'Lulia albu',
//         TotalAmount: 17.99,
//         OrderItems: 'Skincare',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             product3,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Penjani',
//         TotalAmount: 59.99,
//         OrderItems: 'Headphone',
//         Location: 'USA',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             product4,
//     },
//     {
//         OrderID: 845954,
//         CustomerName: 'Jie Yan',
//         TotalAmount: 87.99,
//         OrderItems: 'Shoes',
//         Location: 'USA',
//         Status: 'pending',
//         StatusBg: '#FB9678',
//         ProductImage:
//             'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
//     {
//         OrderID: 38489,
//         CustomerName: 'Miron',
//         TotalAmount: 87.99,
//         OrderItems: 'Ice Cream',
//         Location: 'USA',
//         Status: 'active',
//         StatusBg: '#03C9D7',
//         ProductImage:
//             'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg',
//     },
//     {
//         OrderID: 24546,
//         CustomerName: 'Frank',
//         TotalAmount: 84.99,
//         OrderItems: 'Pan Cake',
//         Location: 'Delhi',
//         Status: 'complete',
//         StatusBg: '#8BE78B',
//         ProductImage:
//             'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
//     },
//     {
//         OrderID: 874534,
//         CustomerName: 'Danai',
//         TotalAmount: 122.99,
//         OrderItems: 'Watch',
//         Location: 'USA',
//         Status: 'canceled',
//         StatusBg: '#FF5C8E',
//         ProductImage:
//             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
//     },
// ];