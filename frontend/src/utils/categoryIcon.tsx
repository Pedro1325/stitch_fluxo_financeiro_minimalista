import type { ReactElement } from "react";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import CloudQueueOutlinedIcon from "@mui/icons-material/CloudQueueOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const ICONS_BY_CATEGORY: Record<string, ReactElement> = {
  "Eletrônicos": <ShoppingBagOutlinedIcon fontSize="small" />,
  "Alimentação": <RestaurantOutlinedIcon fontSize="small" />,
  "Viagem": <FlightOutlinedIcon fontSize="small" />,
  "Receita": <PaymentsOutlinedIcon fontSize="small" />,
  "Mercado": <StorefrontOutlinedIcon fontSize="small" />,
  "Nuvem": <CloudQueueOutlinedIcon fontSize="small" />,
  "Transporte": <DirectionsCarOutlinedIcon fontSize="small" />,
  "Moradia": <HomeOutlinedIcon fontSize="small" />,
  "Saúde": <LocalHospitalOutlinedIcon fontSize="small" />,
  "Lazer": <CelebrationOutlinedIcon fontSize="small" />,
  "Software": <AppsOutlinedIcon fontSize="small" />,
  "Equipamentos": <ReceiptLongOutlinedIcon fontSize="small" />,
};

/** Ícone por categoria, com correspondência parcial (ex.: "Moradia e aluguel" casa com "Moradia"). */
export function getCategoryIcon(categoryLabel: string): ReactElement {
  const matchedKey = Object.keys(ICONS_BY_CATEGORY).find((key) => categoryLabel.includes(key));
  return matchedKey ? ICONS_BY_CATEGORY[matchedKey] : <CategoryOutlinedIcon fontSize="small" />;
}
