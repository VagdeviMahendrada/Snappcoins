import express from "express";
import {
  generateAllocationId,
  allocateSnappcoins,
  searchSnappcoinAllocations,
  getAllocationHistory,
} from "../controllers/GV-AllocationController.js";

const router = express.Router();

router.get(
  "/get-new-snappcoin-allocationId",
  generateAllocationId
);

router.post("/allocate-snappcoins", allocateSnappcoins);

router.get(
  "/search-snappcoin-allocations/:vendorId/:keyword",
  searchSnappcoinAllocations
);

router.get("/allocation-history/:vendorId", getAllocationHistory);

export default router;
