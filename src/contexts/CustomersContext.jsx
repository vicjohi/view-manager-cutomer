import React,{createContext,useEffect,useState} from "react";
import { CustomersService } from "../services/CustomersService";

export const CustomersContext = createContext();
const CustomersContextProvider =(props) => {
    const customersServices = new CustomersService();
    const [customers,setCustomers] = useState([]);
    const [editCustomers,setEditCustomer] = useState(null);


    useEffect(()=>{
        customersServices.findAll().then((data) => setCustomers(data));        
    },[]);

    const createCustomers =(customer)=>{
        customersServices.create(customer)
        .then((data) => setCustomers([...customers,data]))
    };

    const deleteCustomers =(id)=>{
        customersServices
        .delete(id)
        .then(() => setCustomers(customers.filter((p)=>p._id !== id)));
    };

    const findCustomers =(id)=>{       
        const customer= customers.find((p)=>p._id === id);
        setEditCustomer(customer);
    };

    const updateCustomers =(customer)=>{
        customersServices
        .update(customer)
        .then((data) => setCustomers(
            customers.map((p)=>(p._id === customer._id ? data : customer))
            )
        );
        setEditCustomer(null);
    };


    return (
        <CustomersContext.Provider
          value={{
            createCustomers,
            deleteCustomers,
            findCustomers,
            updateCustomers,
            editCustomers,
            customers,
          }}
        >
          {props.children}
        </CustomersContext.Provider>
      );
    };


export default CustomersContextProvider;