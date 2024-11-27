import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { productGrid } from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Inject,
  PagerComponent,
  Search,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { message } from "antd";

const ProductTable = () => {
  const navigate = useNavigate();

  const { page, setPage } = useStateContext();

  const [loading, setisLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [productdata, setProductdata] = useState([]);

  //  ! fetchProduct data
  const fetchProduct = async (page) => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/admin/allproduct`,
        {
          withCredentials: true,
          params: {
            page,
            limit: 10,
          },
        }
      );
      if (response.status === 200) {
        setProductdata(response.data.productlist);
        setTotalRecords(response.data.totalCount);
        setisLoading(false);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  //  ! on pagechange again fetch product will call
  const onPageChange = (args) => {
    setPage(args.currentPage);
    fetchProduct(args.currentPage);
  };

  // ! will navigate to single product page
  const handleRowClick = async (arg) => {
    navigate(`/dashbord/productlist/${arg.data._id}`);
  };

  // syncfusion toolbarOption
  const toolbarOptions = ["Search"];

  useEffect(() => {
    fetchProduct(page);
  }, [page]);

  return (
    <div className="lg:mx-12 md:m-3 mt-12 p-2 md:p-5 bg-white rounded-3xl ">
      <div className="flex justify-center items-center mb-5  ">
        <h1 className="text-2xl font-bold text-center text-black">
          Products List
        </h1>
      </div>
      <div className="publishnewsinfo"></div>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div className="md:m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <GridComponent
            id="gridcomp"
            dataSource={productdata}
            enableStickyHeader={true}
            allowSorting
            allowFiltering
            toolbar={toolbarOptions}
            rowSelected={handleRowClick}
          >
            <ColumnsDirective>
              {productGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[Toolbar, Search, Resize, Sort, ContextMenu, Filter]}
            />
          </GridComponent>
          <PagerComponent
            totalRecordsCount={totalRecords}
            pageSize={10}
            currentPage={page}
            click={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductTable;
