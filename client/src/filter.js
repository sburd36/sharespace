

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
    type: 'homeRules',
    name: "Home Rules",
    values: ['No Smoking', 'No Alcohol', 'No Pets']

}

const Amenities = {
    type: 'amenities',
    name: 'Amenities',
    values: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Computer Access', 'Microwave', 'Self-Check in', 'Parking', 'Bike Storage', 'Private Bathroom', 'Meals', 'Voicemail']
}

export {Personal, Space, Needs, HomeType, Location, Rules, Amenities};
