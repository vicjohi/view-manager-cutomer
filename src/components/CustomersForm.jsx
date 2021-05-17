import React, { useContext, useState, useEffect } from "react";
import { CustomersContext } from "../contexts/CustomersContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

const CustomersForm = (props) => {
  const { isVisible, setIsVisible } = props;

  const {
    createCustomers,
    deleteCustomers,
    editCustomers,
    updateCustomers,
  } = useContext(CustomersContext);

  const initialCustomersState = {
    _id: null,
    firstName: "",
    lastname: "",
    email:"",
    phoneNumber:"",
    birthDate: null,
  };

  const [CustomersData, setCustomersData] = useState(initialCustomersState);

  useEffect(() => {
    if (editCustomers) setCustomersData(editCustomers);
  }, [editCustomers]);

  const updateField = (data, field) => {
    setCustomersData({
      ...CustomersData,
      [field]: data,
    });

    console.log(CustomersData);
  };

  const _deleteCustomers = () => {
    if (editCustomers) {
      deleteCustomers(CustomersData._id);
      setCustomersData(initialCustomersState);
    }
    setIsVisible(false);
  };

  const saveCustomers = () => {
    if (!editCustomers) {
      createCustomers(CustomersData);
    } else {
      updateCustomers(CustomersData);
    }
    setCustomersData(initialCustomersState);
    setIsVisible(false);
  };

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Delete" icon="pi pi-times" onClick={_deleteCustomers} />
      <Button label="Save" icon="pi pi-check" onClick={saveCustomers} />
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setCustomersData(initialCustomersState);
  };

  return (
    <div>
      <Dialog
        visible={isVisible}
        modal={true}
        style={{ width: "420px" }}
        contentStyle={{ overflow: "visible" }}
        header="Detalles del Customerso"
        onHide={() => clearSelected()}
        footer={dialogFooter}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={CustomersData.firstName}
              onChange={(e) => updateField(e.target.value.trim(), "firstName")}
            />
            <label>firstName:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={CustomersData.lastname}
              onChange={(e) => updateField(e.target.value.trim(), "lastname")}
            />
            <label>lastname:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={CustomersData.email}
              onChange={(e) => updateField(e.target.value.trim(), "email")}
            />
            <label>email:</label>
          </div>
          <br />
          <div className="p-float-label">
          <InputText
              value={CustomersData.phoneNumber}
              onChange={(e) => updateField(e.target.value.trim(), "phoneNumber")}
            />
            <label>phoneNumber:</label>
          </div>
          <br />
          <div className="p-float-label">
            <Calendar
              value={
                CustomersData.birthDate &&
                new Date(CustomersData.birthDate + " ")
              }
              onChange={(e) =>
                updateField(
                  e.target.value.toISOString().substring(0, 10),
                  "birthDate"
                )
              }
              dateFormat="yy-mm-dd"
            />
            <label>birthDate:</label>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  );
};

export default CustomersForm;