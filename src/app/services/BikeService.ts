import { Bike } from "../model/Bike";

export class BikeService {
    private bikes: Bike[];

    constructor() {
        // Initialize an empty array to store bikes
        this.bikes = [
            { id: "wegwe", brand: "orbea", size: "L", model: "alma H10" },
            { id: "asd", brand: "GIant", size: "S", model: "Marlin" },
            { id: "oh5", brand: "orbea", size: "L", model: "H50" },
            { id: "oh1", brand: "orbea", size: "L", model: "H10" },
        ];
    }

    // Create a new bike
    createBike(newBike: Bike): void {
        this.bikes.push(newBike);
        console.log(this.bikes)
    }

    // Get all bikes
    getAllBikes(): Bike[] | never {
        return this.bikes;
        // throw new Error(`The are not bikes on the database`)

    }

    // Get a bike by its ID
    getBikeById(id: string): Bike | undefined {
        const bike = this.bikes.find(bike => bike.id === id);

        // ======== Handle from route ======== 
        // if (!bike) {
        //     throw new Error(`Bike with id ${id} doesn't exists`)
        // }
        return bike
    }

    // Update a bike by its ID
    updateBikeById(id: string, updatedBike: Bike): boolean {
        console.log(id)
        const bikeIndex = this.bikes.findIndex(bike => bike.id === id);

        if (bikeIndex !== -1) {
            const tempBike = { ...updatedBike }
            console.log("temp", tempBike)
            this.bikes[bikeIndex] = { ...updatedBike }; // Preserve the ID
            console.log(this.bikes)
            return true;
        }

        return false;
    }

    // Delete a bike by its ID
    deleteBikeById(id: string): boolean {
        const initialLength = this.bikes.length
        this.bikes = this.bikes.filter(bike => bike.id !== id)
        return this.bikes.length !== initialLength
    }
}

// Usage
const bikeService = new BikeService();

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
