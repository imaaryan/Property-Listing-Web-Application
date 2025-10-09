const propertyToBuy = [
  {
    _id: "6718da0b1e3f8a5a2e1b4c90",
    title: "A detailed step by step guide to manage your lifestyle",
    shortDescription:
      "<h1>A Simple Step-by-Step Guide to Managing Your Lifestyle</h1><p>If you're looking to improve your health, boost productivity, and create a balanced life, managing your lifestyle intentionally is key. Here's a short guide to help you take control of your daily habits and overall well-being.</p><h2>1. Assess Your Current Lifestyle</h2><p>Track your habits for a week. Note your energy levels, sleep, diet, and daily routines. Reflect on what's working and what needs change.</p>",
    images: {
      featuredImage: property1img2,
      imageGallery: [
        property1img3,
        property1img4,
        property1img5,
        property1img1,
      ],
    },
    areaId: "6718da0b1e3f8a5a2e1b4c93",
    amenityIds: ["6718da0b1e3f8a5a2e1b4ca1", "6718da0b1e3f8a5a2e1b4ca2"],
    propertyType: "Residential Plot",
    bedrooms: 0,
    bathrooms: 0,
    propertySize: 2000,
    pricing: {
      askingPrice: 7700000,
      stampDuty: 5,
      advocateFee: 15000,
      receiptFee: 25000,
      brokerCommission: 2,
      priceHistory: [
        { year: 2024, cost: 50000 },
        { year: 2023, cost: 45000 },
        { year: 2022, cost: 30000 },
        { year: 2021, cost: 20000 },
      ],
    },
    khatuniDetails: {
      currentOwner: "Mr. Yashpal Singh & Mr. Divye Malik resident",
      previousOwner: "Mrs. Saumya Bhatt resident & Mrs. Vibha S",
      khasraNumber: 275,
      currentOwnerPhoneNumber: 9898908989,
    },
    propertyDetails: {
      dimension: "20ft x 50ft",
      facing: "South",
      widthOfFacingRoad: "25ft",
      approvedBy: "MDDA",
      allowableConstructionStilt: "+2 Floors",
      ownership: "Free Hold",
      landTitle: "Clear",
      developmentStatus: "Vacant",
      lastLandTransaction: "2024-04-21T07:06:37.508Z",
      underMDDA: true,
      underNagarNigam: true,
      waterSupply: true,
      powerSupply: true,
      loanAvailable: true,
      address:
        "Shiv Shakti Enclave, Rajeshwar Nagar Phase1 Extension, Dehradun Dun",
    },
    locationOnMap: {
      latitude: 30.339395816460264,
      longitude: 78.01859020985364,
    },
    createdAt: "2025-04-21T07:06:37.508Z",
    updatedAt: "2025-04-24T08:26:29.750Z",
    __v: 0,
    isPublished: true,
  },
];

const propertyForRent = [
  {
    _id: "6718da0b1e3f8a5a2e1b4c90",
    title: "A detailed step by step guide to manage your lifestyle",
    shortDescription:
      "<h1>A Simple Step-by-Step Guide to Managing Your Lifestyle</h1><p>If you're looking to improve your health, boost productivity, and create a balanced life, managing your lifestyle intentionally is key. Here's a short guide to help you take control of your daily habits and overall well-being.</p><h2>1. Assess Your Current Lifestyle</h2><p>Track your habits for a week. Note your energy levels, sleep, diet, and daily routines. Reflect on what's working and what needs change.</p>",
    images: {
      featuredImage: "property1img2",
      imageGallery: [
        "property1img3",
        "property1img4",
        "property1img5",
        "property1img1",
      ],
    },
    areaId: "6718da0b1e3f8a5a2e1b4c93",
    amenityIds: ["6718da0b1e3f8a5a2e1b4ca1", "6718da0b1e3f8a5a2e1b4ca2"],
    propertyType: "Residential Apartment",
    bedrooms: 3,
    bathrooms: 2,
    propertySize: 2000,
    pricing: {
      rentPerMonth: 23000,
      securityDeposit: 50000,
    },
    ownerDetails: {
      currentOwner: "Mr. Yashpal Singh & Mr. Divye Malik resident",
      currentOwnerPhoneNumber: 9898908989,
    },
    propertyDetails: {
      furnishing: "Semi Furnished",
      avalabeFor: "Family, Bachelors (Womens Only)",
      availability: "Immediate",
      whyConsider:
        "North-East Facing DPS Indirapuram Nearby Electronic City Noida Nearby FORTIS Nearby",
      features:
        "Security / Fire Alarm, Intercom Facility, Lift(s), Water Purifier",
      society: "Assotech Windsor Park Total 11 Acres (44,452 sq.m)",
      address:
        "Shiv Shakti Enclave Rajeshwar Nagar Phase1 Extension Dehradun Dun",
    },
    locationOnMap: {
      latitude: 30.339395816460264,
      longitude: 78.01859020985364,
    },
    createdAt: "2025-04-21T07:06:37.508Z",
    updatedAt: "2025-04-24T08:26:29.750Z",
    __v: 0,
    isPublished: true,
  },
];

const city = [
  { _id: "6718da0b1e3f8a5a2e1b4c91", name: "Dehradun" },
  { _id: "6718da0b1e3f8a5a2e1b4c92", name: "Rishikesh" },
];

const area = [
  { _id: "6718da0b1e3f8a5a2e1b4c93", name: "Rajpur Road", city: city[0] },
  { _id: "6718da0b1e3f8a5a2e1b4c94", name: "GMS Road", city: city[0] },
  {
    _id: "6718da0b1e3f8a5a2e1b4c95",
    name: "Sahastradhara Road",
    city: city[0],
  },
  { _id: "6718da0b1e3f8a5a2e1b4c96", name: "Govind Vihar", city: city[0] },
  { _id: "6718da0b1e3f8a5a2e1b4c97", name: "Malsi", city: city[0] },
  { _id: "6718da0b1e3f8a5a2e1b4c98", name: "Laxman Jhula", city: city[1] },
  { _id: "6718da0b1e3f8a5a2e1b4c99", name: "Tapovan", city: city[1] },
  { _id: "6718da0b1e3f8a5a2e1b4c9a", name: "Shivpuri", city: city[1] },
  { _id: "6718da0b1e3f8a5a2e1b4c9b", name: "Byasi", city: city[1] },
  { _id: "6718da0b1e3f8a5a2e1b4c9c", name: "Swarg Ashram", city: city[1] },
];

const amenities = [
  {
    amenitie: "Swimming Pool",
    _id: "6718da0b1e3f8a5a2e1b4ca1",
  },
  {
    amenitie: "Play Ground",
    _id: "6718da0b1e3f8a5a2e1b4ca2",
  },
  {
    amenitie: "Indoor Games",
    _id: "6718da0b1e3f8a5a2e1b4ca3",
  },
];

const dashboardData = {
    activePropertiesToSell: 15,
    activePropertiesToRent: 5,
    activeCities: 3,
    activeAreas: 19,
    activeEnquiries: 3,
};

const sellerEnquiries = [
    {
    _id: "671834a0b1e3f8a5a2e1b4c90",
    name: "Aaryan Pandey",
    email: "aaryan@email.com",
    phone: 8899889999,
    address: "056 Smart Town, Rishikesh, Uttrakhand",
    propertyType: "Apartment",
    message: "Want to sell my old flat on your platform",
    isRead: true,
}
];
