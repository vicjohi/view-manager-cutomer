import React, { useContext, useState } from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { CustomersContext } from "../contexts/CustomersContext";
import CustomersForm from "./CustomersForm";
const CustomerList = () => {
    const { customers, findCustomers } = useContext(CustomersContext);
  
    const [isVisible, setIsVisible] = useState(false);

    const [globalFilter, setGlobalFilter] = useState(null);

    const saveCustomer = (id) => {
      findCustomers(id);
      setIsVisible(true);
    };

    const renderHeader = () => {
      return (
          <div className="table-header">
            List of Customers
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
              </span>
          </div>
      );
  }
    const footer = (
      <div className="p-clearfix" style={{ width: "100%" }}>
        <Button
          style={{ float: "left" }}
          icon="pi pi-plus"
          label="Add"
          onClick={() => setIsVisible(true)}
        />
      </div>
    );

    const header = renderHeader();

    return (
      <div>
        <Panel header={header} className="p-datatable-customers" dataKey="id" rowHover globalFilter={globalFilter} >
          <DataTable
            value={customers}
            selectionMode="single"
            onSelectionChange={(e) => saveCustomer(e.value._id)}
            footer={footer}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,20,50]}
            
          >
            <Column field="_id" header="Id" />
            <Column field="firstName" header="firstName" />
            <Column field="lastname" header="lastname" />
            <Column field="email" header="email" />
            <Column field="phoneNumber" header="phoneNumber" />
            <Column field="birthDate" header="birthDate" />
          </DataTable>
        </Panel>
        <CustomersForm isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>
    );
  };
  
  export default CustomerList;