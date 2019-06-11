import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import OCRResult from "@/pages/OCRResult.vue";
import TableList from "@/pages/TableList.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";

import Notifications from "@/pages/Notifications.vue";


const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "ocr",
        name: "OCR Result",
        component: OCRResult
      },
      {
        path: "table",
        name: "Devices",
        component: TableList
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      }
    ]
  }
];

export default routes;
