
export type MeasuredVsEstimatedEmission = {
    label: string;
    estimatedResult: number;
    measuredResult: number;
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
