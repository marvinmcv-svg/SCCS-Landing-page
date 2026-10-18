import type { L } from "@/lib/i18n-types";

/**
 * Where SCCS graduates actually enrolled, Classes of 2023, 2024 and 2025
 * (boldface entries in the High School Profile 2025/26). Shown on the globe.
 * Editable from the admin portal (University destinations).
 */
export type Region = "us" | "europe" | "bolivia";
export type Destination = { id: string; name: string; city: string; country: L; region: Region; lat: number; lng: number };

const US: L = { en: "United States", es: "Estados Unidos" };
const ES: L = { en: "Spain", es: "España" };
const PT: L = { en: "Portugal", es: "Portugal" };
const IT: L = { en: "Italy", es: "Italia" };
const BO: L = { en: "Bolivia", es: "Bolivia" };

/** SCCS, Barrio Las Palmas, Santa Cruz de la Sierra: where every arc starts. */
export const HOME = { lat: -17.7915, lng: -63.1981 };

export const DESTINATIONS: Destination[] = [
  { id: "princeton", name: "Princeton University", city: "Princeton, NJ", country: US, region: "us", lat: 40.3431, lng: -74.6551 },
  { id: "brown", name: "Brown University", city: "Providence, RI", country: US, region: "us", lat: 41.8268, lng: -71.4025 },
  { id: "notre-dame", name: "University of Notre Dame", city: "Notre Dame, IN", country: US, region: "us", lat: 41.7052, lng: -86.2353 },
  { id: "michigan", name: "University of Michigan", city: "Ann Arbor, MI", country: US, region: "us", lat: 42.278, lng: -83.7382 },
  { id: "nyu", name: "New York University", city: "New York, NY", country: US, region: "us", lat: 40.7295, lng: -73.9965 },
  { id: "tulane", name: "Tulane University", city: "New Orleans, LA", country: US, region: "us", lat: 29.9399, lng: -90.1208 },
  { id: "miami", name: "University of Miami", city: "Coral Gables, FL", country: US, region: "us", lat: 25.7215, lng: -80.2793 },
  { id: "davidson", name: "Davidson College", city: "Davidson, NC", country: US, region: "us", lat: 35.5007, lng: -80.8456 },
  { id: "bates", name: "Bates College", city: "Lewiston, ME", country: US, region: "us", lat: 44.1056, lng: -70.2033 },
  { id: "purdue", name: "Purdue University", city: "West Lafayette, IN", country: US, region: "us", lat: 40.4237, lng: -86.9212 },
  { id: "penn-state", name: "Penn State University Park", city: "University Park, PA", country: US, region: "us", lat: 40.7982, lng: -77.8599 },
  { id: "indiana", name: "Indiana University Bloomington", city: "Bloomington, IN", country: US, region: "us", lat: 39.1682, lng: -86.523 },
  { id: "tcu", name: "Texas Christian University", city: "Fort Worth, TX", country: US, region: "us", lat: 32.7096, lng: -97.3628 },
  { id: "asu", name: "Arizona State University", city: "Tempe, AZ", country: US, region: "us", lat: 33.4242, lng: -111.9281 },
  { id: "temple", name: "Temple University", city: "Philadelphia, PA", country: US, region: "us", lat: 39.9812, lng: -75.1554 },
  { id: "bentley", name: "Bentley University", city: "Waltham, MA", country: US, region: "us", lat: 42.3867, lng: -71.2213 },
  { id: "hult", name: "Hult International Business School", city: "Boston, MA", country: US, region: "us", lat: 42.3656, lng: -71.079 },
  { id: "arkansas", name: "University of Arkansas", city: "Fayetteville, AR", country: US, region: "us", lat: 36.0687, lng: -94.1748 },
  { id: "ucf", name: "University of Central Florida", city: "Orlando, FL", country: US, region: "us", lat: 28.6024, lng: -81.2001 },
  { id: "usf", name: "University of South Florida", city: "Tampa, FL", country: US, region: "us", lat: 28.0587, lng: -82.4139 },
  { id: "st-bonaventure", name: "St. Bonaventure University", city: "St. Bonaventure, NY", country: US, region: "us", lat: 42.0798, lng: -78.4747 },
  { id: "wabash", name: "Wabash College", city: "Crawfordsville, IN", country: US, region: "us", lat: 40.0378, lng: -86.907 },
  { id: "william-penn", name: "William Penn University", city: "Oskaloosa, IA", country: US, region: "us", lat: 41.2925, lng: -92.646 },
  { id: "santa-fe", name: "Santa Fe College", city: "Gainesville, FL", country: US, region: "us", lat: 29.6806, lng: -82.4316 },
  { id: "miami-dade", name: "Miami Dade College", city: "Miami, FL", country: US, region: "us", lat: 25.7776, lng: -80.1931 },
  { id: "ie", name: "IE University", city: "Madrid & Segovia", country: ES, region: "europe", lat: 40.438, lng: -3.6863 },
  { id: "navarra", name: "University of Navarra", city: "Pamplona", country: ES, region: "europe", lat: 42.8017, lng: -1.6608 },
  { id: "europea", name: "Universidad Europea", city: "Madrid", country: ES, region: "europe", lat: 40.373, lng: -3.918 },
  { id: "ceu", name: "CEU University Valencia", city: "Valencia", country: ES, region: "europe", lat: 39.545, lng: -0.401 },
  { id: "marangoni", name: "Instituto Marangoni", city: "Milan", country: IT, region: "europe", lat: 45.4746, lng: 9.1838 },
  { id: "beira", name: "Universidade da Beira Interior", city: "Covilhã", country: PT, region: "europe", lat: 40.278, lng: -7.509 },
  { id: "algarve", name: "Universidade do Algarve", city: "Faro", country: PT, region: "europe", lat: 37.0273, lng: -7.9269 },
  { id: "upsa", name: "Universidad Privada de Santa Cruz de la Sierra (UPSA)", city: "Santa Cruz de la Sierra", country: BO, region: "bolivia", lat: -17.77, lng: -63.196 },
  { id: "iusc", name: "International University of Santa Cruz", city: "Santa Cruz de la Sierra", country: BO, region: "bolivia", lat: -17.805, lng: -63.165 },
];
