import axios from 'axios';
export class CustomersService{
    baseUrl="http://localhost:8080/api/customers/";

    create(customers){
        return axios.post(this.baseUrl+"customer/",customers).then(res=> res.data);
    }

    findAll(){
        return axios.get(this.baseUrl).then(res=> res.data);
    }

    update(customers){
        return axios.put(this.baseUrl+"customer/"+customers._id,customers).then(res=> res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl+"customer/"+id).then(res=> res.data);
    }
}