import { getCustomers} from "@/controllers/customers";
import express  from "express";
const CustomerRouter= express.Router();


CustomerRouter.get ("/customers", getCustomers)


export  default CustomerRouter