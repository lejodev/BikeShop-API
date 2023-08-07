import { NextApiRequest, NextApiResponse } from 'next'
import { Bike } from '@/app/model/Bike'
import { BikeService } from '@/app/services/BikeService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const bikeService: BikeService = new BikeService();

    if (req.method === "GET") {
        try {
            const bikes: Bike[] = bikeService.getAllBikes()
            res.status(200).json(bikes)
        } catch (error) {
            console.log("first", error)
            res.status(500).send(error)
        }
    } else if (req.method === "POST") {
        const bike: Bike = req.body
        bikeService.createBike(bike)
        res.status(201).send(`Bike with id ${bike.id} was created successfully`) // Handle errors and "\r\n"
    } else {
        res.status(403).send(`Method ${req.method} not allowed`);
    }
}


// export const GET = (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const bikes: Bike[] = getBikes()
//         console.log("CORRECT=====")
//         res.status(200).json(bikes)
//     } catch (error) {
//         console.log("Error=====")
//         res.status(500).send(error)
//     }

// }


// function getBikes(): Bike[] {

//     const bikes: Bike[] = [
//         { id: "wegwe", brand: "orbea", size: "L", model: "alma H10" },
//         { id: "asd", brand: "GIant", size: "S", model: "Marlin" },
//         { id: "f", brand: "orbea", size: "L", model: "H50" }
//     ]

//     return bikes
// }
