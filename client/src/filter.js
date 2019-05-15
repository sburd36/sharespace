

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
