
export type MeasuredVsEstimatedEmission = {
    label: string;
    estimatedResult: number;
    measuredResult: number;
}

export type EquipmentGroup = {
    equipmentGroupId: number;
    name: string;
}

export type YearAndMonth = {
    year: number;
    month: number;
}

export type EmissionSite = {
    siteId: number;
    name: string;
}

export async function getEstimatedVsMeasuredEmissions(groupBy: string | null): Promise<MeasuredVsEstimatedEmission[]> {
  let response = null;
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/emissions/measured-vs-estimated?groupBy=${groupBy || ''}`, {});
  } catch (error) {
    console.error('Error fetching emissions data:', error);
  }

  if (response == null || !response.ok) {
    throw new Error('Failed to fetch emissions data');
  }
  
  return await response.json();
}

// Maybe get groups, year/months, and sites in a single request. Use that to populate the dropdowns.
export async function getEquipmentGroups(): Promise<EquipmentGroup[]> {
  let response = null;
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/emissions/get-equipment-groups`);
  } catch (error) {
    console.error('Error fetching equipment groups:', error);
  }

  if (response == null || !response.ok) {
    throw new Error('Failed to fetch equipment groups');
  }
  
  return await response.json();
}

export async function getEmissionSites(): Promise<EmissionSite[]> {
  let response = null;
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/emissions/get-emission-sites`);
  } catch (error) {
    console.error('Error fetching emission sites:', error);
  }

  if (response == null || !response.ok) {
    throw new Error('Failed to fetch emission sites');
  }
  
  return await response.json();
}

export async function getYearsAndMonths(): Promise<YearAndMonth[]> {
  let response = null;
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/emissions/get-years-and-months`);
  } catch (error) {
    console.error('Error fetching years and months:', error);
  }

  if (response == null || !response.ok) {
    throw new Error('Failed to fetch years and months');
  }
  
  return await response.json();
}