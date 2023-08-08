import { NextApiRequest, NextApiResponse } from 'next'
import { Bike } from '@/app/model/Bike'
import { BikeService } from '@/app/services/BikeService';



export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const bikeService = new BikeService()
    const { id } = req.query;
    const bikeId = id as string;

    if (req.method === "GET") {
        const bike = bikeService.getBikeById(bikeId);
        !bike ?
            res.status(400).send(`No bike with id ${bikeId} is available`) :
            res.status(200).json(bike)

    } else if (req.method === "DELETE") {
        bikeService.deleteBikeById(bikeId) ?  // This method return a boolean true if bikes lenght changed false if not
            res.status(200).send(`Bike with id${id} deleted successfully`) :
            res.status(400).send(`Error deleteing the bike with id ${id}`)
    } else if (req.method === "PUT") {
        const { updatedBike } = req.body
        console.log("updatedBike", updatedBike)
        try {
            if (!bikeService.updateBikeById(bikeId, updatedBike)) {
                throw new Error(`Cannot modify the bike with id ${bikeId}`)
            }
            res.status(200).send("Bike updated successfully")

        } catch (error) {
            res.status(400).send(`Error ${error}`)
        }
    }
    else {
        res.status(405).send(`Method ${req.method} not allowed`)
    }
}
