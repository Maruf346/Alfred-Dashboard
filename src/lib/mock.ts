import type { UserRow, SubRow, Notif, GrowthPeriod } from "@/types";

export const AVATAR_COLORS = ["#dce2f3","#e8e4f0","#f0ece8","#e4f0e8","#f0e4ec","#e4f0f0","#f0f0e4","#e8eef0"];
export const ac = (i: number) => AVATAR_COLORS[i % AVATAR_COLORS.length];

export const userGrowthData = [
  { id: "ug-1", month: "JAN", value: 118 },
  { id: "ug-2", month: "FEB", value: 182 },
  { id: "ug-3", month: "MAR", value: 141 },
  { id: "ug-4", month: "APR", value: 265 },
  { id: "ug-5", month: "MAY", value: 308 },
  { id: "ug-6", month: "JUN", value: 395 },
];

export const userGrowthYear = [
  { id: "uy-01", month: "JAN", value: 88  },
  { id: "uy-02", month: "FEB", value: 124 },
  { id: "uy-03", month: "MAR", value: 104 },
  { id: "uy-04", month: "APR", value: 158 },
  { id: "uy-05", month: "MAY", value: 136 },
  { id: "uy-06", month: "JUN", value: 192 },
  { id: "uy-07", month: "JUL", value: 174 },
  { id: "uy-08", month: "AUG", value: 231 },
  { id: "uy-09", month: "SEP", value: 208 },
  { id: "uy-10", month: "OCT", value: 270 },
  { id: "uy-11", month: "NOV", value: 316 },
  { id: "uy-12", month: "DEC", value: 395 },
];

export const retentionData = [
  { id: "rt-1", month: "Jan", premium: 86, basic: 51 },
  { id: "rt-2", month: "Feb", premium: 68, basic: 79 },
  { id: "rt-3", month: "Mar", premium: 94, basic: 54 },
  { id: "rt-4", month: "Apr", premium: 62, basic: 91 },
  { id: "rt-5", month: "May", premium: 91, basic: 58 },
  { id: "rt-6", month: "Jun", premium: 70, basic: 88 },
];

export const usersData: UserRow[] = [
  { id:  1, initials:"JD", color:ac(0), name:"Julian Dashwood",  email:"julian@alfred-ai.co",       status:"Active",   plan:"PREMIUM PLUS", planStyle:"black" },
  { id:  2, initials:"SM", color:ac(1), name:"Sarah Miller",     email:"sarah@alfred-ai.co",         status:"Active",   plan:"BUSINESS",     planStyle:"gray"  },
  { id:  3, initials:"TK", color:ac(2), name:"Thomas Kline",     email:"thomas@alfred-ai.co",        status:"Idle",     plan:"FREE",         planStyle:"light" },
  { id:  4, initials:"AL", color:ac(3), name:"Amara Lee",        email:"amara@globaldesign.net",     status:"Active",   plan:"BUSINESS",     planStyle:"gray"  },
  { id:  5, initials:"OB", color:ac(4), name:"Oliver Bennett",   email:"oliver@techventures.io",     status:"Active",   plan:"ELITE",        planStyle:"black" },
  { id:  6, initials:"MP", color:ac(5), name:"Maya Patel",       email:"maya.patel@studio9.co",      status:"Active",   plan:"PREMIUM PLUS", planStyle:"black" },
  { id:  7, initials:"EC", color:ac(6), name:"Ethan Clarke",     email:"ethan.c@designhub.net",      status:"Inactive", plan:"FREE",         planStyle:"light" },
  { id:  8, initials:"SW", color:ac(7), name:"Sophia Wang",      email:"sophia.wang@novatech.com",   status:"Active",   plan:"BUSINESS",     planStyle:"gray"  },
  { id:  9, initials:"LM", color:ac(0), name:"Lucas Martin",     email:"lmartin@creativelab.co",     status:"Idle",     plan:"FREE",         planStyle:"light" },
  { id: 10, initials:"AJ", color:ac(1), name:"Aisha Johnson",    email:"aisha.j@springworks.io",     status:"Active",   plan:"ELITE",        planStyle:"black" },
  { id: 11, initials:"FM", color:ac(2), name:"Felix Müller",     email:"felix.m@alphastudio.de",     status:"Active",   plan:"PREMIUM PLUS", planStyle:"black" },
  { id: 12, initials:"ZA", color:ac(3), name:"Zara Ahmed",       email:"zara@brightedge.co",         status:"Active",   plan:"BUSINESS",     planStyle:"gray"  },
  { id: 13, initials:"NK", color:ac(4), name:"Noah Kim",         email:"noah.kim@finpulse.co",       status:"Inactive", plan:"FREE",         planStyle:"light" },
  { id: 14, initials:"IT", color:ac(5), name:"Isabella Torres",  email:"i.torres@nexgen.mx",         status:"Active",   plan:"ELITE",        planStyle:"black" },
  { id: 15, initials:"LO", color:ac(6), name:"Liam O'Brien",     email:"liam.ob@irishmedia.ie",      status:"Active",   plan:"BUSINESS",     planStyle:"gray"  },
  { id: 16, initials:"PS", color:ac(7), name:"Priya Sharma",     email:"priya.s@quantumleap.in",     status:"Active",   plan:"PREMIUM PLUS", planStyle:"black" },
  { id: 17, initials:"CR", color:ac(0), name:"Caleb Reynolds",   email:"caleb.r@pixelcraft.com",     status:"Idle",     plan:"FREE",         planStyle:"light" },
  { id: 18, initials:"NC", color:ac(1), name:"Natalie Chen",     email:"natalie.c@luminary.io",      status:"Active",   plan:"ELITE",        planStyle:"black" },
  { id: 19, initials:"JW", color:ac(2), name:"Jackson Wright",   email:"j.wright@horizons.co",       status:"Active",   plan:"BUSINESS",     planStyle:"gray"  },
  { id: 20, initials:"EV", color:ac(3), name:"Elena Vasquez",    email:"elena.v@solstice.mx",        status:"Active",   plan:"PREMIUM PLUS", planStyle:"black" },
  { id: 21, initials:"AB", color:ac(4), name:"Aaron Brooks",     email:"aaron.b@northstar.io",       status:"Inactive", plan:"FREE",         planStyle:"light" },
  { id: 22, initials:"MF", color:ac(5), name:"Mia Fontaine",     email:"mia.f@creatif.fr",           status:"Active",   plan:"BUSINESS",     planStyle:"gray"  },
  { id: 23, initials:"DP", color:ac(6), name:"Dylan Park",       email:"dylan.p@gridline.co.kr",     status:"Active",   plan:"ELITE",        planStyle:"black" },
  { id: 24, initials:"CA", color:ac(7), name:"Chloe Anderson",   email:"chloe.a@cloudcraft.com",     status:"Idle",     plan:"FREE",         planStyle:"light" },
  { id: 25, initials:"RC", color:ac(0), name:"Rafael Costa",     email:"rafael.c@solarbyte.br",      status:"Active",   plan:"PREMIUM PLUS", planStyle:"black" },
];

export const subsData: SubRow[] = [
  { id:  1, initials:"AR", color:ac(0), name:"Alex Rivera",      email:"alex.rivers@example.com",    plan:"Elite Tier",  planStyle:"black",     billing:"$29.99 / mo",  billingDate:"NOV 07, 2024", status:"Active"    },
  { id:  2, initials:"SC", color:ac(1), name:"Sarah Chen",       email:"s.chen@cloudecom.co",         plan:"Premium",     planStyle:"gray",      billing:"$14.99 / mo",  billingDate:"OCT 07, 2024", status:"Active"    },
  { id:  3, initials:"MT", color:ac(2), name:"Marcus Thorne",    email:"marcus@office.biz",           plan:"Cancelled",   planStyle:"cancelled", billing:"$14.99 / mo",  billingDate:"OCT 07, 2024", status:"Inactive"  },
  { id:  4, initials:"ER", color:ac(3), name:"Elena Rodriguez",  email:"elena@elitedesign.io",        plan:"Elite Tier",  planStyle:"black",     billing:"$259.90 / yr", billingDate:"DEC 07, 2024", status:"Active"    },
  { id:  5, initials:"OB", color:ac(4), name:"Oliver Bennett",   email:"oliver@techventures.io",      plan:"Elite Tier",  planStyle:"black",     billing:"$99.00 / mo",  billingDate:"JAN 12, 2025", status:"Active"    },
  { id:  6, initials:"MP", color:ac(5), name:"Maya Patel",       email:"maya.patel@studio9.co",       plan:"Premium",     planStyle:"gray",      billing:"$14.99 / mo",  billingDate:"FEB 03, 2025", status:"Active"    },
  { id:  7, initials:"EC", color:ac(6), name:"Ethan Clarke",     email:"ethan.c@designhub.net",       plan:"Free",        planStyle:"light",     billing:"—",            billingDate:"—",            status:"Active"    },
  { id:  8, initials:"SW", color:ac(7), name:"Sophia Wang",      email:"sophia.wang@novatech.com",    plan:"Premium",     planStyle:"gray",      billing:"$14.99 / mo",  billingDate:"MAR 15, 2025", status:"Active"    },
  { id:  9, initials:"LM", color:ac(0), name:"Lucas Martin",     email:"lmartin@creativelab.co",      plan:"Expired",     planStyle:"cancelled", billing:"$9.99 / mo",   billingDate:"JAN 01, 2024", status:"Inactive"  },
  { id: 10, initials:"AJ", color:ac(1), name:"Aisha Johnson",    email:"aisha.j@springworks.io",      plan:"Elite Tier",  planStyle:"black",     billing:"$99.00 / mo",  billingDate:"APR 22, 2025", status:"Active"    },
  { id: 11, initials:"FM", color:ac(2), name:"Felix Müller",     email:"felix.m@alphastudio.de",      plan:"Premium",     planStyle:"gray",      billing:"$14.99 / mo",  billingDate:"MAY 05, 2025", status:"Active"    },
  { id: 12, initials:"ZA", color:ac(3), name:"Zara Ahmed",       email:"zara@brightedge.co",          plan:"Free",        planStyle:"light",     billing:"—",            billingDate:"—",            status:"Active"    },
  { id: 13, initials:"NK", color:ac(4), name:"Noah Kim",         email:"noah.kim@finpulse.co",        plan:"Cancelled",   planStyle:"cancelled", billing:"$9.99 / mo",   billingDate:"JUN 10, 2024", status:"Inactive"  },
  { id: 14, initials:"IT", color:ac(5), name:"Isabella Torres",  email:"i.torres@nexgen.mx",          plan:"Elite Tier",  planStyle:"black",     billing:"$259.90 / yr", billingDate:"JUL 01, 2025", status:"Active"    },
  { id: 15, initials:"LO", color:ac(6), name:"Liam O'Brien",     email:"liam.ob@irishmedia.ie",       plan:"Premium",     planStyle:"gray",      billing:"$14.99 / mo",  billingDate:"AUG 14, 2025", status:"Active"    },
  { id: 16, initials:"PS", color:ac(7), name:"Priya Sharma",     email:"priya.s@quantumleap.in",      plan:"Elite Tier",  planStyle:"black",     billing:"$99.00 / mo",  billingDate:"SEP 01, 2025", status:"Active"    },
  { id: 17, initials:"CR", color:ac(0), name:"Caleb Reynolds",   email:"caleb.r@pixelcraft.com",      plan:"Free",        planStyle:"light",     billing:"—",            billingDate:"—",            status:"Active"    },
  { id: 18, initials:"NC", color:ac(1), name:"Natalie Chen",     email:"natalie.c@luminary.io",       plan:"Elite Tier",  planStyle:"black",     billing:"$99.00 / mo",  billingDate:"OCT 20, 2025", status:"Active"    },
  { id: 19, initials:"JW", color:ac(2), name:"Jackson Wright",   email:"j.wright@horizons.co",        plan:"Premium",     planStyle:"gray",      billing:"$14.99 / mo",  billingDate:"NOV 11, 2025", status:"Active"    },
  { id: 20, initials:"EV", color:ac(3), name:"Elena Vasquez",    email:"elena.v@solstice.mx",         plan:"Elite Tier",  planStyle:"black",     billing:"$259.90 / yr", billingDate:"DEC 01, 2025", status:"Active"    },
  { id: 21, initials:"AB", color:ac(4), name:"Aaron Brooks",     email:"aaron.b@northstar.io",        plan:"Expired",     planStyle:"cancelled", billing:"$14.99 / mo",  billingDate:"MAR 01, 2024", status:"Inactive"  },
  { id: 22, initials:"MF", color:ac(5), name:"Mia Fontaine",     email:"mia.f@creatif.fr",            plan:"Premium",     planStyle:"gray",      billing:"$14.99 / mo",  billingDate:"JAN 25, 2025", status:"Active"    },
  { id: 23, initials:"DP", color:ac(6), name:"Dylan Park",       email:"dylan.p@gridline.co.kr",      plan:"Elite Tier",  planStyle:"black",     billing:"$99.00 / mo",  billingDate:"FEB 14, 2025", status:"Active"    },
  { id: 24, initials:"CA", color:ac(7), name:"Chloe Anderson",   email:"chloe.a@cloudcraft.com",      plan:"Cancelled",   planStyle:"cancelled", billing:"$9.99 / mo",   billingDate:"APR 01, 2024", status:"Inactive"  },
  { id: 25, initials:"RC", color:ac(0), name:"Rafael Costa",     email:"rafael.c@solarbyte.br",       plan:"Premium",     planStyle:"gray",      billing:"$14.99 / mo",  billingDate:"MAY 30, 2025", status:"Active"    },
  { id: 26, initials:"HN", color:ac(1), name:"Hana Nakamura",    email:"hana.n@lightwave.jp",         plan:"Elite Tier",  planStyle:"black",     billing:"$99.00 / mo",  billingDate:"JUN 18, 2025", status:"Active"    },
  { id: 27, initials:"BT", color:ac(2), name:"Ben Thompson",     email:"ben.t@archetype.uk",          plan:"Free",        planStyle:"light",     billing:"—",            billingDate:"—",            status:"Active"    },
  { id: 28, initials:"LK", color:ac(3), name:"Lily Kovacs",      email:"lily.k@vortex.hu",            plan:"Expired",     planStyle:"cancelled", billing:"$29.99 / mo",  billingDate:"AUG 01, 2024", status:"Inactive"  },
];

export const paymentHistory = [
  { invoice: "INV-2024-011", date: "Nov 14, 2024", amount: "$99.00", status: "PAID" },
  { invoice: "INV-2024-010", date: "Oct 14, 2024", amount: "$99.00", status: "PAID" },
];

export const INITIAL_NOTIFS: Notif[] = [
  { id: "n1", kind: "subscription", title: "New Elite Tier subscription",   body: "Alex Rivera upgraded to Elite Tier.",          time: "2m ago",  read: false },
  { id: "n2", kind: "user",         title: "New user registered",            body: "Hana Nakamura joined Alfred AI.",              time: "18m ago", read: false },
  { id: "n3", kind: "payment",      title: "Payment received",               body: "$99.00 collected from Elena Vasquez.",         time: "1h ago",  read: false },
  { id: "n4", kind: "subscription", title: "Subscription cancelled",         body: "Marcus Thorne cancelled their Premium plan.",  time: "3h ago",  read: true  },
  { id: "n5", kind: "system",       title: "System update deployed",         body: "Alfred AI v2.4.1 is now live.",                time: "6h ago",  read: true  },
];

export const GROWTH_OPTIONS: GrowthPeriod[] = ["Last 6 Months", "Last 1 Year"];

export const filterTabs = ["All", "Free", "Premium", "Elite", "Cancelled", "Expired"];

export const USERS_PER_PAGE = 5;
export const SUBS_PER_PAGE  = 5;

export function matchFilter(tab: string, sub: SubRow): boolean {
  if (tab === "All")       return true;
  if (tab === "Free")      return sub.planStyle === "light";
  if (tab === "Premium")   return sub.plan === "Premium";
  if (tab === "Elite")     return sub.plan === "Elite Tier";
  if (tab === "Cancelled") return sub.planStyle === "cancelled" && sub.plan === "Cancelled";
  if (tab === "Expired")   return sub.plan === "Expired";
  return true;
}
