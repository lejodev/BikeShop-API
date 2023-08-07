import { NextApiRequest, NextApiResponse } from 'next'
import { Bike } from '@/app/model/Bike'
import { BikeService } from '@/app/services/BikeService';



export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const bikeService = new BikeService()
    const { id } = req.query;
    const bikeId = id as string;
    if (req.method === "GET") {
        res.status(200).json(bikeService.getBikeById(bikeId))
    } else if (req.method === "DELETE") {
        bikeService.deleteBikeById(bikeId) ?  // Handle that error properly
            res.status(200).send(`Bike with id${id} deleted successfully`) :
            res.status(400).send(`Error deleteing the bike with id ${id}`)
    } else if(req.method === "PUT"){
        
    }
    else {
        res.status(405).send(`Method ${req.method} not allowed`)
    }
}
