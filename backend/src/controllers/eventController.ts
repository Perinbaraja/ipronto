import { Request, Response } from "express";
import { searchMasterEventsQuery } from "../apis/eventApi";
import { SearchMasterEventsResponse } from "../mappers/eventMapper";


export const searchAllEvents = async (req: Request, res: Response) => {
  try {
    // -----------------------------------------
    // Parse incoming query params
    // -----------------------------------------
    const params: any = {
      city: req.query.city || "",
      search: req.query.searchText || "",
      location: req.query.location ? JSON.parse(req.query.location as string) : null,
      nearBy: req.query.nearBy ? JSON.parse(req.query.nearBy as string) : null,
      bounds: req.query.bounds ? JSON.parse(req.query.bounds as string) : null,
      fromDate: req.query.fromDate || null,
      toDate: req.query.toDate || null,
      categories: req.query.categories
        ? (req.query.categories as string).split(",").filter(Boolean)
        : [],
      destinationId: req.query.destinationId || null,
      limit: Number(req.query.limit || 20),
      page: Number(req.query.page || 1),
      priceRange: req.query.priceRange
        ? (req.query.priceRange as string).split(",").map(Number)
        : [],
      landingPage: req.query.landingPage || null,
      createdSince: req.query.createdSince || null,
      upcomingEvents: req.query.upcomingEvents || null
    };

    params.offset = (params.page - 1) * params.limit;

    // -----------------------------------------
    // Call Supabase Query
    // -----------------------------------------
    const result = await searchMasterEventsQuery(params);

    // console.log("RAW SUPABASE RESULT:", JSON.stringify(result, null, 2));

    // -----------------------------------------
    // CASE 1: Supabase multi-category structure
    // -----------------------------------------
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result)
    ) {
      const resultObj = result as Record<string, any>;

      const categoryKeys = Object.keys(resultObj).filter(
        (key) =>
          key !== "minAndMaxDate" &&
          Array.isArray(resultObj[key]?.searchResult)
      );
console.log("Category Keys Found:", categoryKeys);
      if (categoryKeys.length > 0) {
        const finalResponse: any = {
          minAndMaxDate: resultObj.minAndMaxDate || []
        };

        categoryKeys.forEach((categoryKey) => {
          finalResponse[categoryKey] = new SearchMasterEventsResponse(
            resultObj[categoryKey].searchResult ?? [],
            categoryKey
          );
        });

        return res.status(200).json(finalResponse);
      }
    }

    // -----------------------------------------
    // CASE 2: Normal (single category) response
    // -----------------------------------------
    let masterEvents =
      (result as any)?.rows ||
      (result as any)?.data ||
      result ||
      [];

    const minAndMaxDate = (result as any)?.minAndMaxDate || null;

    if (!Array.isArray(masterEvents)) {
      masterEvents = [];
    }

    if (minAndMaxDate) {
      (masterEvents as any).minAndMaxDate = minAndMaxDate;
    }
console.log("Category Info:", params.categories || "");
    const response = new SearchMasterEventsResponse(
      masterEvents,
      params.categories || ""
    );

    return res.status(200).json(response);
  } catch (error: any) {
    console.error("searchAllEvents ERROR >>>", error);
    return res.status(500).json({ error: error.message });
  }
};
