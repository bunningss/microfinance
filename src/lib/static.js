export const sidebarItems = [
  {
    label: "ড্যাশবোর্ড",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "সঞ্চয় কিস্তি",
    href: "/dashboard/savings-installments",
    icon: "installment",
  },
  {
    label: "ঋণের কিস্তি",
    href: "/dashboard/loan-installments",
    icon: "installment",
  },
  {
    label: "সঞ্চয় কিস্তি পরিশোধ",
    href: "/dashboard/search-savings-installment",
    icon: "money",
  },
  {
    label: "ঋণের কিস্তি পরিশোধ",
    href: "/dashboard/search-loan-installment",
    icon: "expense",
  },
  {
    label: "সদস্য",
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
        label: "কর্মচারী তালিকা দেখুন",
        href: "staffs",
        icon: "",
      },
      {
        label: "কর্মচারী যোগ করুন",
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
    name: "user",
    value: "user",
  },
  {
    name: "staff",
    value: "staff",
  },
  {
    name: "marketing officer",
    value: "marketing officer",
  },
  {
    name: "admin",
    value: "admin",
  },
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
