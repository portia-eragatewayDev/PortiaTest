import { Request, Response } from "express";
import { db } from "@/db/db";


export async function getCustomers(req:Request,res:Response) {
    const customers=[
       {name:"Portia", email: "portia@eragateway.com"},
       {name:"Sethu", email:"sethu@eragateway.com"},
       {name:"Sam", email:"sam@eragateway.com"},
    ];

return res.status(200).json(customers);
}