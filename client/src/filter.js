

const Personal = [
    {
        type: 'languages',
        name: 'Languages',
        values: ['English', 'Chinese(Mandarin)', 'Chinese(Cantonese)', 'Spanish', 'French', 'Japanese', 'Korean']
    },
    {
        type: 'ethnicities',
        name: 'Ethnicities',
        values: ['African Americans', 'Hispanic', 'Asian', 'White', 'Native/American Indian']
    },
    {
        type: 'religion',
        name: 'Religion',
        values: ['none', 'Christian', 'Catholic', 'Buddism', 'Islam', 'Hinduism', 'Judaism']
    },
]

const Space = [
    {
        type: 'homeType',
        name: 'Home Types',
        values: ["Entire Place", "Private Bedroom", 'Hotel Room', 'Shared Room', 'Shelter']
    },
    {
        type: 'amenities',
        name: 'Amenities',
        values: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Computer Access', 'Microwave', 'Self-Check in', 'Parking', 'Bike Storage', 'Private Bathroom', 'Meals', 'Voicemail']
    },
]


const HomeType = Space[0]

const Needs = {
    type: 'needs',
    name: 'Needs',
    values: ['Crib', 'High Chair', 'Pregnant', 'Pets', 'Child-Friendly', 'Near Public Transport', 'Women Only']
}

const Location = {
    type: 'location',
    name: 'Location',
    values: ["Northgate", "U District", "Westlake", "Ballard", 'South Lake Union', 'Fremont', 'Ravenna', 'Capital Hill', 'International District']
}

const Rules = {
    type: 'rules',
    name: "Home Rules",
    values: ['No Smoking', 'No Alcohol', 'No Pets']

}

const Amenities = {
    type: 'amenities',
    name: 'Amenities',
    values: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Computer Access', 'Microwave', 'Self-Check in', 'Parking', 'Bike Storage', 'Private Bathroom', 'Meals', 'Voicemail']
}

export {Personal, Space, Needs, HomeType, Location, Rules, Amenities};

// dummy data
export var Host =  [
    {
        ID: 1,
        advocate: 'Jenny Chen',
        information: {
            name: "Marry Potter",
            description: "Marry is a working professional who likes cat and yoga.",
            languages: ["English"],
            religion: ["none"],
            ethnicity: ["White"],
            contact: {
                phone: "(306)142-2093",
                email: "mp@gmail.com"
            },
        },
        space:  [
            {
                ID: 1,
                guestID: 3857,
                address: "1234 24th Sunset Bld",
                location: 'FREMONT',
                amenities: ['Kitchen', 'Laundry', 'Refrigerator', 'Bike Storage', 'Meals', 'Voicemail'],
                checkinInfo: {
                    time: "10am - 9pm",
                    description: "Please text my number when arrive. Have a dog named Benly, he is very friendly but please do not pet him."
                },
                houseRules: ["No Smoking", "No Alcohol"],
                begin: "2019-05-09",
                end: "2019-05-16",
            }
        ]
    },
    {
        ID: 2,
        advocate: "Erika Wu",
        information: {
            name: "Marry Potter",
            description: "Marry is a working professional who likes cat and yoga.",
            languages: ["English"],
            religion: ["none"],
            ethnicity: ["White"],
            contact: {
                phone: "(306)142-2093",
                email: "mp@gmail.com"
            },
        },
        space:  [
            {
                ID: 2,
                guestID: 2059,
                address: "1234 24th Sunset Bld",
                location: 'GREEN LAKE',
                amenities: ['Kitchen','Wifi', 'Parking', 'Bike Storage', 'Meals', 'Voicemail'],
                checkinInfo: {
                    time: "10am - 9pm",
                    description: "*Have a dog named Benly, he is very friendly but please do not pet him."
                },
                houseRules: ["No Smoking", "No Alcohol"],
                begin: "2019-05-28",
                end: "2019-06-12",
            }
        ]
    },
    {
        ID: 3,
        advocate: "Alice Lopez",
        information: {
            name: "Marry Potter",
            description: "Marry is a working professional who likes cat and yoga.",
            languages: ["English"],
            religion: ["none"],
            ethnicity: ["White"],
            contact: {
                phone: "(306)142-2093",
                email: "mp@gmail.com"
            },
        },
        space:  [
            {
                ID: 3,
                guestID: 1049,
                address: "1234 24th Sunset Bld",
                location: 'BEACON HILL',
                amenities: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking', 'Bike Storage', 'Meals'],
                checkinInfo: {
                    time: "10am - 9pm",
                    description: "Have a dog named Benly, he is very friendly but please do not pet him."
                },
                houseRules: ["No Smoking", "No Alcohol"],
                begin: "2019-07-29",
                end: "2019-08-13",
            }
        ]
    },
    {
        ID: 4,
        advocate: "Emily Liu",
        information: {
            name: "Marry Potter",
            description: "Marry is a working professional who likes cat and yoga.",
            languages: ["English"],
            religion: ["none"],
            ethnicity: ["White"],
            contact: {
                phone: "(306)142-2093",
                email: "mp@gmail.com"
            },
        },
        space:  [
            {
                ID: 4,
                guestID: 1253,
                address: "1234 24th Sunset Bld",
                location: 'QUEEN ANNE',
                amenities: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking'],
                checkinInfo: {
                    time: "10am - 9pm",
                    description: "Have a dog named Benly, he is very friendly but please do not pet him."
                },
                houseRules: ["No Smoking", "No Alcohol"],
                availability: [
                    {
                        begin: "2019-05-09",
                        end: "2019-05-16",
                        booked: false
                    },
                    {
                        begin: "2019-05-09",
                        end: "2019-05-16",
                        booked: false
                    }
                ],
                currentBooking: [

                ]
            }
        ],
    },
]
