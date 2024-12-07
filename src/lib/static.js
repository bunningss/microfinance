export const sidebarItems = [
  {
    label: "ড্যাশবোর্ড",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "দৈনিক হিসাব",
    href: "/dashboard/daily-report",
    icon: "calendar",
  },
  {
    label: "সঞ্চয়",
    href: "",
    icon: "installment",
    children: [
      {
        label: "সঞ্চয় কিস্তিসমূহ",
        href: "savings/savings-installments",
      },
      {
        label: "সঞ্চয় কিস্তি পরিশোধ",
        href: "savings/search-savings-installment",
      },
    ],
  },
  {
    label: "ঋণ",
    href: "",
    icon: "installment",
    children: [
      {
        label: "ঋণের কিস্তিসমূহ",
        href: "loan/loan-installments",
        icon: "",
      },
      {
        label: "ঋণের কিস্তি পরিশোধ",
        href: "loan/search-loan-installment",
        icon: "",
      },
    ],
  },
  {
    label: "সদস্য তথ্য",
    href: "",
    icon: "members",
    children: [
      {
        label: "সদস্যদের তালিকা দেখুন",
        href: "members",
      },
      {
        label: "সদস্য যোগ করুন",
        href: "members/add",
      },
    ],
  },
  {
    label: "জমা",
    href: "",
    icon: "expense",
    children: [
      {
        label: "জমার তালিকা দেখুন",
        href: "deposits",
        icon: "",
      },
    ],
  },
  {
    label: "খরচ",
    href: "",
    icon: "expense",
    children: [
      {
        label: "খরচ তালিকা দেখুন",
        href: "expenses",
        icon: "",
      },
      {
        label: "বেতন বিবরণী তালিকা",
        href: "expenses/salary-statements",
      },
      {
        label: "টাকা উত্তলোন এর তালিকা",
        href: "withdraw",
        icon: "",
      },
      {
        label: "খরচ যোগ করুন",
        href: "expenses/add",
        icon: "",
      },
    ],
  },
  {
    label: "কর্মী",
    href: "",
    icon: "user",
    children: [
      {
        label: "কর্মীদের তালিকা দেখুন",
        href: "staffs",
        icon: "",
      },
      {
        label: "কর্মী যোগ করুন",
        href: "staffs/add",
        icon: "",
      },
    ],
  },
];

export const savingsTypes = [
  {
    name: "Daily / প্রতিদিন",
    value: "daily",
  },
  {
    name: "Weekly / সাপ্তাহিক",
    value: "weekly",
  },
  {
    name: "Monthly / মাসিক",
    value: "monthly",
  },
];

export const designations = [
  {
    name: "admin",
    value: "admin",
  },
  {
    name: "office manager",
    value: "office manager",
  },
  {
    name: "marketing manager",
    value: "marketing manager",
  },
  {
    name: "marketing officer",
    value: "marketing officer",
  },
  {
    name: "field officer",
    value: "field officer",
  },
  {
    name: "office staff",
    value: "office staff",
  },
  {
    name: "user",
    value: "user",
  },
];

export const availableRoles = [
  "user",
  "admin",
  "office manager",
  "marketing manager",
  "marketing officer",
  "field officer",
  "office staff",
];

// List of savings names
export const savingsNames = [
  "রজনীগন্ধা",
  "গোলাপ",
  "পদ্ম",
  "শাপলা",
  "জুঁই",
  "বেলি",
  "চাঁপা",
  "কামিনী",
  "কদম",
  "শেফালি",
  "অপরাজিতা",
  "রাধাচূড়া",
  "কৃষ্ণচূড়া",
  "শিমূল",
  "জারুল",
  "গন্ধরাজ",
  "মাধবীলতা",
  "নয়নতারা",
  "কাঞ্চন ফুল",
  "হলুদ চাঁপা",
  "মাধবী লতা",
  "ধুতুরা",
  "নাগলিঙ্গম",
  "সুর্যমুখী",
  "গাঁদা ফুল",
  "ডালিয়া",
  "জবা",
  "বকুল",
  "করবী",
  "শিউলি",
  "কুঁচি ফুল",
  "পলাশ",
  "অশোক",
  "হিমালয়ান",
  "কস্তুরি",
  "বেলি",
  "হাড়গোজা",
  "গঙ্গা",
  "কুসুম",
  "বনজুঁই",
  "ছাতিম",
  "আকন্দ",
  "আর্কিড",
  "চন্দ্রমল্লিকা",
  "পরুল",
  "সাজিনা",
  "সিম",
  "পুই",
  "বন কুরচি",
  "শিরীষ",
  "হরতকি",
  "গামার",
  "বনফুল",
  "রঙ্গন",
  "কুটিল",
  "ডালিম ফুল",
  "কাঁঠাল ফুল",
  "মেথি",
  "তুলসী",
  "নিম",
  "রাখাল",
  "কড়ই",
  "কাঁটা",
  "পানিফল",
  "হিজল",
  "বরই",
  "ময়ূরপঙ্খি",
  "সাপলুডা",
  "ঝাউ",
  "বনসাই",
  "গুন্দল",
  "মেহগনি",
  "অমলতাস",
  "শিরীষ",
  "কুন্দ",
  "হলদে",
  "তেঁতুল",
  "মেহেদি",
  "মালা",
  "মণিপুরি",
  "তালশাঁস",
  "চন্দন",
  "বেত",
  "পলাশী",
  "কাঞ্চন",
  "দেওয়ান",
  "ধোরা",
  "তীর",
  "মাশরুম",
  "নাগেশ্বর",
  "সোনাঝুরি",
  "জংলি",
  "মালতী",
  "তাম্বুল",
  "পাকুড়",
  "কাঁটা ফুল",
  "লাল শাপলা",
  "আসাম লিলি",
  "গোলাপি পদ্ম",
  "হলুদ জবা",
  "গোল্ডেন লিলি",
  "লাল কৃষ্ণচূড়া",
  "নীল অপরাজিতা",
  "সাদা চাঁপা",
  "গন্ধলতা",
  "অর্কিড ফুল",
  "নাগেশ্বরী ফুল",
  "লাল পলাশ",
  "সাদা গোলাপ",
  "কৃষ্ণচূড়া মালা",
  "কুমুদিনী",
  "গগন শীর্ষা",
  "তিনশিরীষ ফুল",
  "নীলকণ্ঠ ফুল",
  "লাল চন্দ্রমল্লিকা",
  "জলজ ফুল",
  "বন গোলাপ",
  "হলুদ পদ্ম",
  "মাটির শিউলি",
  "নীল শাপলা",
  "লাল কাঞ্চন",
  "বন কৃষ্ণচূড়া",
  "বন্য কাঞ্চন",
  "গোল্ডেন কাঞ্চন",
  "পুষ্প ঝাউ",
  "চিরতা ফুল",
  "রক্তজবা",
  "অরুণপুষ্প",
  "বসন্ত মালতী",
  "রূপসী ফুল",
  "নীল রাধাচূড়া",
  "সোনালী বকুল",
  "পুনম ফুল",
  "পদ্মা",
  "যমুনা",
  "মেঘনা",
  "ব্রহ্মপুত্র",
  "গঙ্গা",
  "করতোয়া",
  "তিস্তা",
  "ধলেশ্বরী",
  "গড়াই",
  "মধুমতি",
  "আরিয়াল",
  "বুড়িগঙ্গা",
  "সুরমা",
  "কুশিয়ারা",
  "চিতলমারী",
  "পাসুর",
  "কর্ণফুলী",
  "সাঙ্গু",
  "ফেনী",
  "তুরাগ",
  "বংশী",
  "ইছামতি",
  "মনু",
  "নবগঙ্গা",
  "গোমতী",
  "আত্রাই",
  "তিতাস",
  "ধানসিঁড়ি",
  "মহানন্দা",
  "হালদা",
  "কালিগঙ্গা",
  "রূপসা",
  "বৈকালি",
  "কাপতাই",
  "শঙ্খ",
  "কালীগঞ্জ",
  "কাটাখালি",
  "পদ্মেশ্বরী",
  "বিসখালি",
  "রায়মঙ্গল",
  "মাতামুহুরী",
  "মোহনন্দী",
  "কুলিখ",
  "চিত্রা",
  "কটিয়া",
  "লাখাই",
  "বন",
  "অন্ধারমানিক",
  "কুমার",
  "গঙ্গাসাগর",
  "নাগর",
  "চেঙ্গী",
  "মালঙ্গী",
  "মাতাই",
  "চাকমা",
  "গাজীপুর",
  "মেঘলা",
  "সালদা",
  "খরস্রোতা",
  "গড়াই-মধুমতি",
  "কপোতাক্ষ",
];

export const roles = {
  "office staff": {
    can: [
      "visit:dashboard",
      "view:dashboard-data",
      "view:members-list",
      "view:member",
      "view:loan",
      "view:loan-installment",
      "view:loan-receipt",
      "view:loan-installments",
      "view:saving",
      "view:saving-installment",
      "view:saving-receipt",
      "view:saving-installments",
    ],
  },
  "marketing manager": {
    can: [
      "visit:dashboard",
      "view:dashboard-data",
      "view:members-list",
      "view:member",
      "view:loan",
      "view:loan-installment",
      "view:loan-receipt",
      "view:loan-installments",
      "view:saving",
      "view:saving-installment",
      "view:saving-receipt",
      "view:saving-installments",
      "update:loan-installment",
      "update:saving-installment",
    ],
  },
  "marketing officer": {
    can: [
      "visit:dashboard",
      "view:dashboard-data",
      "view:members-list",
      "view:member",
      "view:loan",
      "view:loan-installment",
      "view:loan-receipt",
      "view:loan-installments",
      "view:saving",
      "view:saving-installment",
      "view:saving-receipt",
      "view:saving-installments",
      "update:loan-installment",
      "update:saving-installment",
    ],
  },
  "field officer": {
    can: [
      "visit:dashboard",
      "view:dashboard-data",
      "view:members-list",
      "view:member",
      "view:loan",
      "view:loan-installment",
      "view:loan-receipt",
      "view:loan-installments",
      "view:saving",
      "view:saving-installment",
      "view:saving-receipt",
      "view:saving-installments",
      "update:loan-installment",
      "update:saving-installment",
    ],
  },
  "office manager": {
    can: [
      "visit:dashboard",
      "view:dashboard-data",
      "view:members-list",
      "view:member",
      "view:loan",
      "view:loan-installment",
      "view:loan-receipt",
      "view:loan-installments",
      "view:saving",
      "view:saving-installment",
      "view:saving-receipt",
      "view:saving-installments",
      "update:loan-installment",
      "update:saving-installment",
      "add:expense",
      "view:expense",
      "view:salary",
      "view:staff",
    ],
  },
  admin: {
    can: ["visit:dashboard", "manage:all"],
  },
};

// visit:dashboard,
// view:dashboard-data
// view:expense
// add:expense
// view:salary
// add:salary
// add:staff
// view:staff
// update:staff
// add:member
// view:members-list
// view:member
// add:loan
// view:loan
// view:loan-installment
// view:loan-receipt
// view:loan-installments
// update:loan-installment
// add:saving
// view:saving
// view:saving-installment
// view:saving-receipt
// update:saving-installment
// view:saving-installments

// inquiry
// add:withdrawal
// view:withdrawals
// add:deposit
// view:deposit
// view:daily-report
