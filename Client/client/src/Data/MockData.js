import { tokens } from "../theme";


export const operators = [
  { code: "AT&T", name: "AT&T (USA)" },
  { code: "Verizon", name: "Verizon (USA)" },
  { code: "T-Mobile", name: "T-Mobile (USA)" },
  { code: "Rogers", name: "Rogers (Canada)" },
  { code: "Bell", name: "Bell (Canada)" },
  { code: "Telus", name: "Telus (Canada)" },
  { code: "Vodafone", name: "Vodafone (UK)" },
  { code: "EE", name: "EE (UK)" },
  { code: "O2", name: "O2 (UK)" },
  { code: "Optus", name: "Optus (Australia)" },
  { code: "Telstra", name: "Telstra (Australia)" },
  { code: "Vodafone", name: "Vodafone (Australia)" },
  { code: "Airtel", name: "Airtel (India)" },
  { code: "Jio", name: "Jio (India)" },
  { code: "Vi", name: "Vi (India)" },
];


export const mockBarData = [
  {
    country: "USA",
    Verizon: 137,
    ATT: 96,
    "T-Mobile": 72,
    Sprint: 140,
  },
  {
    country: "IN",
    Jio: 55,
    Airtel: 50,
    Vi: 58,
    BSNL: 40,
  },
  {
    country: "AUS",
    Telstra: 109,
    Optus: 100,
    Vodafone: 90,
    Amaysim: 152,
  },
  {
    country: "UK",
    EE: 133,
    Vodafone: 52,
    O2: 43,
    "Three": 83,
  },
  {
    country: "CAN",
    Rogers: 81,
    Bell: 80,
    Telus: 112,
    Freedom: 50,
  },
];


export const mockLineData = [
  {
    id: "Verizon",
    color: tokens("dark").greenAccent[500],
    data: [
      { x: "USA", y: 95 },
      { x: "UK", y: 92 },
      { x: "Canada", y: 90 },
      { x: "Australia", y: 88 },
      { x: "India", y: 85 },
    ],
  },
  {
    id: "AT&T",
    color: tokens("dark").blueAccent[300],
    data: [
      { x: "USA", y: 89 },
      { x: "UK", y: 87 },
      { x: "Canada", y: 91 },
      { x: "Australia", y: 85 },
      { x: "India", y: 80 },
    ],
  },
  {
    id: "T-Mobile",
    color: tokens("dark").redAccent[200],
    data: [
      { x: "USA", y: 93 },
      { x: "UK", y: 90 },
      { x: "Canada", y: 86 },
      { x: "Australia", y: 84 },
      { x: "India", y: 82 },
    ],
  },
];