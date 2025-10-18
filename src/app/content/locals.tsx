import { FaTree, FaSwimmer } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";

export const LOCATIONS = [
  {
    key: "lago",
    name: "Lago",
    texture: "/lago.jpg",
    hotspots: [
      {
        position: [-7, 3, 0],
        label: "Área de preservação",
        icon: FaTree,
        popupMessage: "Esta área é protegida para preservar a fauna e flora local."
      },
    ]
  },
  {
    key: "praia",
    name: "Praia",
    texture: "/praia.jpg",
    hotspots: [
      {
        position: [2, 0.5, 4],
        label: "Água cristalina",
        icon: MdWaterDrop,
        popupMessage: "A água aqui é incrivelmente limpa e refrescante."
      }
    ]
  },
  {
    key: "piscina",
    name: "Piscina",
    texture: "/piscina.jpg",
    hotspots: [
      {
        position: [2, -1, 0],
        label: "Piscina",
        icon: FaSwimmer,
        popupMessage: "Área ideal para se refrescar e relaxar."
      },
    ]
  },
]