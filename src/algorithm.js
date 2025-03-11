export  function calculateRideCost(distanceKm, durationMin, vehicleType, isStudent = false) {
    //Base fare and per KM/min rates for each vehicle type
    const pricing = {
        bike: { baseFare: 10, perKm: 5, perMin: 1 },
        SyncRideX: { baseFare: 20, perKm: 10, perMin: 2 },
        SyncRideXL: { baseFare: 30, perKm: 15, perMin: 3 },
        comfort: { baseFare: 50, perKm: 20, perMin: 4 }
    };
aar
    // Student discount rate if you want to avail 
    const studentDiscount = 0.0;

    // Ensure valid vehicle type
    if (!pricing[vehicleType]) {
        throw new Error("Invalid vehicle type. Choose from: bike, carX, carXL, comfort");
    }

    // Calculate total cost
    const { baseFare, perKm, perMin } = pricing[vehicleType];
    let totalCost = baseFare + (distanceKm * perKm) + (durationMin * perMin);

    // Apply student discount
    if (isStudent) {
        totalCost -= totalCost * studentDiscount;
    }

    // Return final cost rounded to 2 decimal places
    return totalCost.toFixed(2);
}


console.log(calculateRideCost(10, 15, "bike", true)); 
console.log(calculateRideCost(10, 15, "SyncRideX", false)); 
console.log(calculateRideCost(5, 10, "", true)); 

