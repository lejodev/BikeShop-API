import { Bike } from '../model/Bike'
import { connectToMongoDB } from './mongodb/mongodb';

export class BikeService {

    async getConnection() {
        const db = await connectToMongoDB() // TODO Refactor later
        return db.collection('BikeShop')
    }

    // Create a new bike
    async createBike(newBike: Bike) {
        const collection = await this.getConnection()
        collection.insertOne(newBike)
    }

    // Get all bikes
    async getAllBikes(): Promise<Bike[]> {
        const bikesCollection = await this.getConnection()
        const bikeDocuments = await bikesCollection.find().toArray()

        const bikes: Bike[] = bikeDocuments.map((doc) => ({
            id: doc.id,
            brand: doc.brand,
            size: doc.size,
            model: doc.model,
        }));
        return bikes;
    }

    async deleteBikeById(id: string): Promise<boolean> {
        const bikesCollection = await this.getConnection()
        const result = await bikesCollection.deleteOne({ "id": `${id}` })
        return result.deletedCount === 1
    }

    //     // Get a bike by its ID
    //     getBikeById(id: string): Bike | undefined {
    //         // const bike = bikes.find(bike => bike.id === id);

    //         // ======== Handle from route ======== 
    //         // if (!bike) {
    //         //     throw new Error(`Bike with id ${id} doesn't exists`)
    //         // }
    //         // return bike
    //     }

    //     // Update a bike by its ID
    //     updateBikeById(id: string, updatedBike: Bike): boolean {
    //         console.log(id)
    //         const bikeIndex = bikes.findIndex(bike => bike.id === id);

    //         if (bikeIndex !== -1) {
    //             const tempBike = { ...updatedBike }
    //             console.log("temp", tempBike)
    //             bikes[bikeIndex] = { ...updatedBike }; // Preserve the ID
    //             console.log(bikes)
    //             return true;
    //         }

    //         return false;
    //     }

    // Delete a bike by its ID

}

// // Usage
// const bikeService = new BikeService();

// // Create new bikes
// bikeService.createBike({ id: "1", brand: "Giant", size: "M", model: "Defy" });
// bikeService.createBike({ id: "2", brand: "Trek", size: "L", model: "Domane" });

// // Get all bikes
// const allBikes: Bike[] = bikeService.getAllBikes();
// console.log(allBikes);

// // Get a bike by its ID
// const bikeById: Bike | undefined = bikeService.getBikeById("1");
// console.log(bikeById);

// // Update a bike by its ID
// const updatedBike: Bike = { id: "1", brand: "Specialized", size: "S", model: "Roubaix" };
// const isUpdated: boolean = bikeService.updateBikeById("1", updatedBike);
// console.log(isUpdated);
// console.log(bikeService.getAllBikes());

// // Delete a bike by its ID
// const isDeleted: boolean = bikeService.deleteBikeById("2");
// console.log(isDeleted);
// console.log(bikeService.getAllBikes());
