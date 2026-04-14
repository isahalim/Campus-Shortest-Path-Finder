import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { BUILDINGS, EDGES, Building, Location } from './campus';
import { shortestPath } from "./dijkstra";

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

// TODO (task 5): use this to store saved paths sent from client
const savedPaths: Array<[Building, Building]> = new Array<[Building, Building]>();

/**
 * Responds with lists of app data including a list of campus buildings and
 *  a list of previously saved paths.
 * @param _req Request object
 * @param res Response object.
 *  - sends 200 with record containing 'buildings' (array of Building objects,
 *    each with a 'shortName' 'longName' and location), and 'savedPaths' (array
 *    of [Building, Building] tuples, the start and end of a saved path)
 */
export const getAppData = (_req: SafeRequest, res: SafeResponse): void => {
  res.json({buildings: BUILDINGS, savedPaths: savedPaths});
};


/**
 * Finds shortest path between given start and end buildings.
 * @param req Request object.
 * @param res Response object.
 */
export const getShortestPath = (req: SafeRequest, res: SafeResponse): void => {
  // TODO (task 4): finish implementing this route to get the shortest path
  console.log(`log to quiet warning about unused variables: ${req} & ${res}. remove!`);
  const building1 = req.query.start;
  const building2 = req.query.end;
  if (typeof building1 !== 'string' || typeof building2 !== 'string') {
    res.status(400).send(`buildings are both not strings: ${building1} ${building2}`);
    return;
  }
  // Change these values manually to test them
  
  const loc1 = findLocation(building1);
  const loc2 = findLocation(building2);
  if (loc1 !== undefined && loc2 !== undefined) {
    const path = shortestPath(loc1, loc2, EDGES);
    res.json(path);
  }
}

const findLocation = (shortName: string): Location | undefined => {
  for (const b of BUILDINGS) {
    if (b.shortName === shortName) {
      return b.location;
    }
  }
  return undefined;
}

// TODO (task 5): add a route to get the shortest path

/**
 * Updates saved paths with a start and end building.
 * @param req Request object.
 * @param res Response object.
 */
export const updateSavedPaths = (req: SafeRequest, res: SafeResponse): void => {
  const building1 = req.body.start;
  const building2 = req.body.end;
  if (typeof building1 !== 'string' || typeof building2 !== 'string') {
    res.status(400).send(`buildings are both not strings: ${building1} ${building2}`);
    return;
  }
  const startBuilding = findBuilding(building1);
  const endBuilding = findBuilding(building2);

  if (startBuilding !== undefined && endBuilding !== undefined) {
    savedPaths.push([startBuilding, endBuilding]);
    res.json({savedPaths: savedPaths});
  }

}

const findBuilding = (shortName: string): Building | undefined => {
  for (const b of BUILDINGS) {
    if (b.shortName === shortName) {
      return b;
    }
  }
  return undefined;
}


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give multiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};