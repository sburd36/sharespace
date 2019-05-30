

const Personal = [
    {
        type: 'languages',
        name: 'Language',
        values: ['Amharic', 'Arabic', 'Bengali', 'Cambodian/Khmer', 'Chinese(Cantonese)', 'Chinese(Mandarin)',
        'English', 'French', 'German', 'Hindi', 'Indonesian', 'Japanese', 'Korean', 'Lahnda', 'Laotian', 'Oromo',
        'Portuguese', 'Russian', 'Somali', 'Spanish', 'Tagalog', 'Tamil', 'Telugu', 'Tigrinya', 'Turkish', 'Vietnamese']
    },
    {
        type: 'ethnicities',
        name: 'Ethnicity',
        values: ['African Americans', 'Hispanic', 'Asian', 'White', 'Native/American Indian']
    },
    {
        type: 'religion',
        name: 'Religion',
        values: ['African Traditional and Diasporic', 'Buddhism', 'Catholicism', 'Chinese Traditional Religion', 'Christianity', 'Hinduism', 'Islam', 'Juche', 'Judaism', 'Nonreligious(Secular/Agnostic/Atheist)', 'Primal-indigenous', 'Shinto', 'Sikhism', 'Taoism', 'Other']
    },
]

const Space = [
    {
        type: 'homeType',
        name: 'Home Type',
        values: ["Entire Place", 'Entire Room', 'Hotel Room', 'Shared Room', 'Shelter', 'Living Room', 'Guest House']
    },
    {
        type: 'amenities',
        name: 'Amenities',
        values: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Computer Access', 'Microwave', 'Self-Check in', 'Free Parking', 'Bike Storage', 'Private Bathroom', 'Meals', 'Voicemail']
    },
]


const HomeType = Space[0]

const Needs = {
    type: 'needs',
    name: 'Needs',
    values: ['Crib', 'High Chair', 'Pregnant', 'Pets', 'Service Animal', 'Child-Friendly', 'Near Public Transport', 'Women Only', 'Mental Disability', 'Physical Disability', 'Sensory Disability']
}

const Location = {
    type: 'location',
    name: 'Location',
    values: ['23rd & Union/Jackson', "Admiral", 'Aurora-Licton Springs', 'Ballard', 'Beacon Hill', 
    'Belltown', 'Bitter Lake/Broadview', 'Capitol Hill', 'Chinatown-International District',
    'Columbia City', 'Crown Hill', 'Delridge', 'Downtown', 'Eastlake', 'First Hill', 'Fremont',
    'Georgetown', 'Green Lake', 'Greenwood-Phinney Ridge', 'Judkins Park', 'Lake City', 'Madison-Miller',
    'Magnolia', 'Montlake', 'Morgan Junction', 'North Ranier/Mount Baker', 'Northgate', 'Othello', 
    'Pioneer Square', 'Queen Anne', 'Rainier Beach', 'Roosevelt', 'Sand Point', 'South Lake Union',
    'South Park', 'University District', 'Uptown', 'Wallingford', 'West Seattle Junction',
    'Westwood Village/Roxhill-Highland Park']
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
            name: "Min Yang",
            description: "I am a working professional who likes cats and yoga.",
            languages: ["English", "Chinese(Mandarin)"],
            religion: ["none"],
            ethnicity: ["White", "Chinese"],
            contact: {
                phone: "(306)142-2093",
                email: "min@gmail.com"
            },
        },
        space:  [
            {
                ID: 1,
                guestID: 3857,
                address: "1234 24th Sunset Bld",
                location: 'FREMONT',
                homeType: 'Entire Home',
                description:'A quiet location in fremont with good access to transit lines and delicious food. Fully furnished',
                amenities: ['Kitchen', 'Private Bathroom', "Computer Access", 'Laundry', 'Refrigerator', 'Bike Storage', 'Microwave'],
                checkinInfo: {
                    time: "10am - 9pm",
                    description: "Please use the lock box on the front door. The access code is 1234. Please return the key when you leave."
                },
                houseRules: ["No Smoking", "No Alcohol"],
                availability: [
                    {
                        start: "Thu May 23 2019 21:01:57 GMT-0700 (Pacific Daylight Time)",
                        end: "Sat May 26 2019 21:01:57 GMT-0700 (Pacific Daylight Time)",
                        booked: false
                    }
                ]
                
            }
        ]
    },
    {
        ID: 2,
        advocate: "Erika Wu",
        information: {
            name: "Stephanie Burd",
            description: "I work with the YWCA to help find housing for women in the Greater Seattle Area. Always here to help!",
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
                homeType: 'Shared Space',
                amenities: ['Parking', 'Kitchen', 'Refrigerator', 'Microwave', 'Wifi', 'Computer Access'],
                checkinInfo: {
                    time: "10am - 9pm",
                    description: "*Have a dog named Benly, he is very friendly but please do not pet him."
                },
                houseRules: ["No Smoking", "No Alcohol"],
                availability: [
                    {
                        start: "Thu May 30 2019 21:01:57 GMT-0700 (Pacific Daylight Time)",
                        end: "Tue June 4 2019 21:01:57 GMT-0700 (Pacific Daylight Time)",
                        booked: false
                    }
                ]
            }
        ]
    },
    {
        ID: 3,
        advocate: "Alice Lopez",
        information: {
            name: "Abby Huang",
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
                homeType: 'Shared Space',
                amenities: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking', 'Bike Storage', 'Meals'],
                checkinInfo: {
                    time: "10am - 9pm",
                    description: "Have a dog named Benly, he is very friendly but please do not pet him."
                },
                houseRules: ["No Smoking", "No Alcohol"],
                availability: [
                    {
                        start: "Thu June 6 2019 21:01:57 GMT-0700 (Pacific Daylight Time)",
                        end: "Mon June 10 2019 21:01:57 GMT-0700 (Pacific Daylight Time)",
                        booked: false
                    }
                ]
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
                homeType: 'Shared Space',
                amenities: ['Parking', 'Women Only', 'Computer Access'],
                checkinInfo: {
                    time: "10am - 9pm",
                    description: "Have a dog named Benly, he is very friendly but please do not pet him."
                },
                houseRules: ["No Smoking", "No Alcohol"],
                availability: [
                    {
                        start: "Fri June 14 2019 21:01:57 GMT-0700 (Pacific Daylight Time)",
                        end: "Wed June 19 2019 21:01:57 GMT-0700 (Pacific Daylight Time)",
                        booked: false
                    }
                ],
            }
        ],
    },
]

export var advocate = [
    {
        ID: 1,
        hosts: [],
        information: {
            name: "Min Yang",
            contact: {
                phone: "(306)142-2093",
                email: "min@gmail.com"
            },
        },
        currentBooking:  [
            {
                ID: 1,
                guestID: 3857,
                address: "1234 24th Sunset Bld",
                location: 'FREMONT',
                homeType: 'Entire Home',
                description:'A quiet location in fremont with good access to transit lines and delicious food. Fully furnished',
                amenities: ['Kitchen', 'Private Bathroom', "Computer Access", 'Laundry', 'Refrigerator', 'Bike Storage', 'Microwave'],
                checkinInfo: {
                    time: "10am - 9pm",
                    description: "Please use the lock box on the front door. The access code is 1234. Please return the key when you leave."
                },
                houseRules: ["No Smoking", "No Alcohol"],
                begin: "2019-05-09",
                end: "2019-05-16",
            }
        ]
    }
]

export var listing = {
    id: "",
    name: "",
    address: "",
    amenities: [],
    description: "",
    instructions: "",
    guestCount: "",
    hostID: "",
    houseRules: [],
    location:"",
    houseType: "",
    zip: "",
    availability: [],
    currentBookings: [],
    pendingBookings: [],
    pastBookings: []
  }

