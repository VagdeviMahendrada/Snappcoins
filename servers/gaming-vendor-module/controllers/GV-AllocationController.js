import { GVSnappcoinAllocationModel } from "../models/GV-AllocationModel.js";

// Generate a new transaction ID
async function generateAllocationId() {
  try {
    const lastAllocation = await GVSnappcoinAllocationModel.findOne(
      {},
      { snappcoin_allocation_id: 1 },
      { sort: { snappcoin_allocation_id: -1 } }
    ).exec();

    if (lastAllocation) {
      const lastId = parseInt(lastAllocation.snappcoin_allocation_id.slice(7)); // Extract the numeric part and convert it to an integer
      const nextId = lastId + 1;
      return `A-GV-G-${nextId.toString().padStart(7, "0")}`; // Increment the ID and format it with leading zeros
    } else {
      return "A-GV-G-00001"; // If no vendor exists, start with GV001
    }
  } catch (error) {
    throw error;
  }
}

// Add a new transaction
async function allocateSnappcoins(req, res, next) {
  try {
    const allocationDetails = req.body;
    const allocationId = await generateAllocationId();
    const allocation = await GVSnappcoinAllocationModel.create({
      snappcoin_allocation_id: allocationId,
      ...allocationDetails,
    }); // Create a new transaction using the TransactionModel
    res.json({ allocation }); // Return the newly created transaction
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to allocate snappcoins to the gamer" });
  }
}

// Search allocations using keywords for a specific vendor
async function searchSnappcoinAllocations(req, res, next) {
  try {
    const { vendorId, keyword } = req.params;
    const allocations = await GVSnappcoinAllocationModel.find({
      vendor_id: vendorId,
    }); // Find allocations for the specified vendor
    const searchResults = allocations.filter((allocation) => {
      const {
        snappcoin_allocation_id,
        vendor_id,
        vendor_name,
        allocation_date,
        allocation_status,
        snappcoin_count,
      } = allocation;

      // Perform case-insensitive search for allocation ID, date, status, or snappcoin count
      const regex = new RegExp(keyword, "i");
      return (
        regex.test(snappcoin_allocation_id) ||
        regex.test(vendor_id) ||
        regex.test(vendor_name) ||
        regex.test(allocation_date.toString()) ||
        regex.test(allocation_status) ||
        regex.test(snappcoin_count.toString())
      );
    });

    res.json({ searchResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to search allocations" });
  }
}

// Get allocation history by vendor
async function getAllocationHistory(req, res, next) {
  try {
    const { vendorId } = req.params;
    const allocations = await GVSnappcoinAllocationModel.find({
      vendor_id: vendorId,
    }); // Retrieve the allocation history for the specified vendor
    res.json({ allocations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve allocation history" });
  }
}

export {
  generateAllocationId,
  allocateSnappcoins,
  searchSnappcoinAllocations,
  getAllocationHistory,
};
