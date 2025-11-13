import { Request, Response } from "express";
import { searchMasterEventsQuery } from "../apis/eventApi";


export const searchAllEvents = async (req: Request, res: Response) => {
  try {
    // Parse query params
    const params: any = {};

    params.city = req.query.city || "";
    params.search = req.query.searchText || "";

    params.location = req.query.location
      ? JSON.parse(req.query.location as string)
      : null;

    params.nearBy = req.query.nearBy
      ? JSON.parse(req.query.nearBy as string)
      : null;

    params.bounds = req.query.bounds
      ? JSON.parse(req.query.bounds as string)
      : null;

    params.fromDate = req.query.fromDate || null;
    params.toDate = req.query.toDate || null;

    params.categories = req.query.categories
      ? (req.query.categories as string).split(",").filter(Boolean)
      : [];

    params.destinationId = req.query.destinationId || null;

    params.limit = Number(req.query.limit || 20);
    params.page = Number(req.query.page || 1);
    params.offset = (params.page - 1) * params.limit;

    params.priceRange = req.query.priceRange
      ? (req.query.priceRange as string).split(",")
      : [];

    params.landingPage = req.query.landingPage || null;
    params.createdSince = req.query.createdSince || null;
    params.upcomingEvents = req.query.upcomingEvents || null;

    // Call service
    const result = await searchMasterEventsQuery(params);

    return res.status(200).json({
      status: 200,
      params,
      result
    });

  } catch (error: any) {
    console.error("searchAllEvents ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
};
