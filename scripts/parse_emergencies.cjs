const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('=== PARSING OAKSHOW EMERGENCIES ===');

const emergencies = [
  {
    id: 'coronavirus-outbreak',
    slug: 'coronavirusoutbreak',
    legacyFilename: 'emergency/coronavirusoutbreak.html',
    title: '2019–20 Coronavirus Outbreak (COVID-19)',
    category: 'Public Health Epidemic',
    categoryBadge: 'badge-red',
    alertLevel: 'Global Health Emergency (WHO PHOIC)',
    status: 'Global Pandemic & Public Health Crisis',
    date: '2019 – 2020 (Ongoing Monitoring)',
    location: 'Global / Worldwide',
    poster: 'pics/Emergency/coronavirusoutbreak/1.jpg',
    banner: 'pics/Emergency/coronavirusoutbreak/coronavirusoutbreak-1.jpg',
    summary: 'The 2019–20 Coronavirus (SARS-CoV-2) outbreak was declared a Public Health Emergency of International Concern by the World Health Organization. OakShow maintains verified healthcare advisories, CDC/WHO prevention guidelines, and authoritative medical updates.',
    description: 'Coronaviruses (CoV) are a large family of viruses that cause illness ranging from the common cold to more severe diseases. The novel coronavirus strain (SARS-CoV-2 / COVID-19) spreads predominantly through respiratory droplets. OakShow provides direct access to WHO guidelines, CDC prevention protocols, symptom self-checkers, and global health advisories.',
    helplines: [
      {
        name: 'National Health Authority Helpline (India)',
        number: '1075',
        tel: '1075',
        type: 'Toll-Free Health Helpline',
        desc: 'Central health helpline for COVID-19 consultation and ambulance dispatch.'
      },
      {
        name: 'Disaster Emergency Response',
        number: '112',
        tel: '112',
        type: 'Emergency Unified Line',
        desc: 'National emergency number for urgent ambulance, police, or medical rescue.'
      },
      {
        name: 'Kerala State Health Helpline (DISHA)',
        number: '1056',
        tel: '1056',
        type: 'State Medical Teleconsultation',
        desc: '24x7 psychological support, quarantine coordination, and telemedicine guidance.'
      }
    ],
    rescueActions: [
      {
        title: 'WHO Official Advice for the Public',
        url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public',
        provider: 'World Health Organization',
        badge: 'Official Health Advisory'
      },
      {
        title: 'CDC Coronavirus Disease 2019 Basics & Guidelines',
        url: 'https://www.cdc.gov/coronavirus/2019-ncov/faq.html#basics',
        provider: 'CDC (Centers for Disease Control)',
        badge: 'Clinical Protocol'
      },
      {
        title: 'WHO Global Case Tracking & Hotspot Dashboard',
        url: 'https://covid19.who.int/',
        provider: 'WHO Health Emergency',
        badge: 'Live Data'
      }
    ],
    reliefFunds: [
      {
        title: 'WHO COVID-19 Solidarity Response Fund',
        url: 'https://covid19responsefund.org/',
        provider: 'United Nations Foundation & WHO',
        desc: 'Direct global support to help countries prevent, detect, and respond to the pandemic.'
      },
      {
        title: 'PM CARES Fund for Emergency Situations',
        url: 'https://www.pmcares.gov.in/',
        provider: 'Government of India',
        desc: 'National public charitable trust for healthcare infrastructure and emergency relief.'
      }
    ],
    faqsAndGuidelines: [
      {
        question: 'What is the Coronavirus (COVID-19)?',
        answer: 'Coronaviruses (CoV) are a large family of viruses that cause illness ranging from the common cold to severe acute respiratory syndrome. SARS-CoV-2 is a zoonotic virus that transmits between people primarily via respiratory droplets and contact surfaces.',
        source: 'World Health Organization (WHO)'
      },
      {
        question: 'What are the primary symptoms of COVID-19?',
        answer: 'Common symptoms include fever, dry cough, fatigue, and shortness of breath. Other symptoms may include loss of taste or smell, muscle aches, sore throat, congestion, and digestive distress. Most recover with supportive care, but older adults or individuals with pre-existing conditions require prompt medical monitoring.',
        source: 'World Health Organization (WHO)'
      },
      {
        question: 'How does the virus spread?',
        answer: 'People catch COVID-19 through small droplets expelled from the nose or mouth when an infected individual coughs, sneezes, or talks. Droplets can also land on surfaces where the virus may persist for hours before being transferred to eyes, nose, or mouth.',
        source: 'CDC & WHO'
      },
      {
        question: 'What key precautions prevent infection?',
        answer: '1. Wear a protective mask covering mouth and nose.\n2. Maintain at least 1–2 metres (3–6 feet) physical distance from anyone coughing/sneezing.\n3. Wash hands frequently with soap and water or alcohol-based sanitizer.\n4. Practice respiratory etiquette (cover coughs with bent elbow).\n5. Ensure proper indoor ventilation.',
        source: 'WHO Official Guidelines'
      },
      {
        question: 'Do antibiotics cure COVID-19?',
        answer: 'No. Antibiotics only treat bacterial infections, not viral infections. They should only be taken when prescribed by a physician for secondary bacterial complications.',
        source: 'World Health Organization (WHO)'
      }
    ],
    liveUpdates: [
      {
        headline: 'Coronavirus symptoms: what are they and should I see a doctor?',
        url: 'https://www.theguardian.com/world/2020/mar/09/coronavirus-symptoms-what-doctor-china-covid-19',
        author: 'The Guardian',
        date: '09 March, 2020'
      },
      {
        headline: 'Coronavirus Live Updates: Governments Clamp Down but Virus Still Spreads',
        url: 'https://www.nytimes.com/2020/03/09/world/coronavirus-news.html',
        author: 'The New York Times',
        date: '09 March, 2020'
      }
    ],
    gallery: [
      {
        src: 'pics/Emergency/coronavirusoutbreak/coronavirusoutbreak-1.jpg',
        caption: 'Coronavirus microscopic cross-section diagram (Credit: Scientific Animations/CC BY-SA 4.0)'
      },
      {
        src: 'pics/Emergency/coronavirusoutbreak/coronavirusoutbreak-2.jpg',
        caption: 'Viral structure visualization and surface proteins'
      },
      {
        src: 'pics/Emergency/coronavirusoutbreak/1.jpg',
        caption: 'OakShow Emergency Bulletin Header'
      }
    ],
    videos: [
      {
        title: 'Coronavirus Environmental Sensitivity & Research',
        url: 'https://www.youtube.com/watch?v=fW_sZnIwO28',
        youtubeId: 'fW_sZnIwO28'
      }
    ]
  },
  {
    id: 'kerala-floods-2019',
    slug: 'keralafloods2019',
    legacyFilename: 'emergency/KeralaFloods2019.html',
    title: 'Kerala Floods 2019 Disaster Relief & Rescue Operation',
    category: 'Natural Disaster',
    categoryBadge: 'badge-emerald',
    alertLevel: 'Red Alert Severe Weather & Inundation Emergency',
    status: 'State Disaster Relief & Rehabilitation',
    date: 'August 2019',
    location: 'Kerala, India (All 14 Districts)',
    poster: 'pics/Emergency/KeralaFloods2019/1.jpg',
    banner: 'pics/Emergency/KeralaFloods2019/Kerala-Floods-1.jpg',
    summary: 'Severe monsoon downpours and landslides in August 2019 triggered catastrophic flooding across Kerala, displacing over 145,000 people. OakShow deployed a centralized emergency rescue portal connecting citizens with disaster control rooms, rescue maps, and relief logistics.',
    description: 'During the devastating August 2019 Kerala Floods, heavy monsoon rainfall caused severe landslides in Wayanad and Malappuram and widespread waterlogging across the state. OakShow aggregated official rescue hotlines (112, 1077, 1070), crowdsourced rescue maps, official relief donation links, and live shelter updates to support affected families.',
    helplines: [
      {
        name: 'Unified Emergency Rescue Number',
        number: '112',
        tel: '112',
        type: 'Emergency Call (National Unified Line)',
        desc: 'Immediate dispatch for police, fire, NDRF, and emergency ambulance.'
      },
      {
        name: 'District Control Room (ജില്ലാ കൺട്രോൾ റൂം)',
        number: '1077',
        tel: '1077',
        type: 'Toll-Free District Disaster Coordination',
        desc: 'Direct connection to local District Collectorate disaster management cell (dial with local STD code).'
      },
      {
        name: 'State Disaster Control Room (സംസ്ഥാന കൺട്രോൾ റൂം)',
        number: '1070',
        tel: '1070',
        type: 'State Level Emergency Command Center',
        desc: 'Kerala State Disaster Management Authority (KSDMA) central coordination desk.'
      }
    ],
    rescueActions: [
      {
        title: 'Request Rescue Map Post (രക്ഷാപ്രവർത്തനത്തിനു വേണ്ടി അപേക്ഷിക്കുക)',
        url: 'https://keralarescuemap.ushahidi.io/posts/create/17',
        provider: 'Ushahidi Kerala Rescue Map',
        badge: 'Live Rescue Coordination'
      },
      {
        title: 'Kerala Government Flood & Inundation Map',
        url: 'https://www.microid.in/floodmap/',
        provider: 'Kerala Govt & MicroID',
        badge: 'Satellite Inundation Map'
      },
      {
        title: 'Kerala Rescue Official Volunteer & Needs Portal',
        url: 'https://keralarescue.in/',
        provider: 'Govt of Kerala & Volunteers',
        badge: 'Official Rescue Network'
      }
    ],
    reliefFunds: [
      {
        title: "Chief Minister's Distress Relief Fund (CMDRF)",
        url: 'https://donation.cmdrf.kerala.gov.in/',
        provider: 'Government of Kerala',
        desc: 'Official government relief fund for rebuilding flood-hit infrastructure and supporting affected families.'
      }
    ],
    faqsAndGuidelines: [
      {
        question: 'How do I call for emergency rescue if trapped in floodwaters?',
        answer: '1. Call 112 immediately or dial 1077 with your district STD code.\n2. Submit your exact GPS coordinates and landmark on the Kerala Rescue Portal.\n3. Move to the highest accessible floor or roof with high visibility.\n4. Conserve mobile phone battery and keep a bright cloth for aerial visibility.',
        source: 'Kerala State Disaster Management Authority'
      },
      {
        question: 'What precautions should be taken in landslide-prone zones?',
        answer: 'Evacuate immediately if you notice sudden changes in water flow, new cracks in roads/foundations, or leaning utility poles. Move to designated relief camps identified by district authorities.',
        source: 'KSDMA Emergency Advisory'
      }
    ],
    liveUpdates: [
      {
        headline: 'Kerala floods Live Updates: Kochi airport resumes operations, flight from Abu Dhabi first to land',
        url: 'https://www.indiatoday.in/india/story/flood-monsoon-rains-live-update-kerala-maharashtra-gujarat-karnataka-1579632-2019-08-11',
        author: 'India Today',
        date: '11 August, 2019'
      },
      {
        headline: 'Kerala floods: 46 killed, 1.45 lakh displaced, state to airlift food supplies',
        url: 'https://www.livemint.com/news/india/kerala-floods-42-killed-one-lakh-displaced-state-to-airlift-food-supplies-1565421820431.html',
        author: 'Livemint',
        date: '10 August, 2019'
      }
    ],
    gallery: [
      {
        src: 'pics/Emergency/KeralaFloods2019/Kerala-Floods-1.jpg',
        caption: 'Flooding and river overflow across Kerala districts in August 2019'
      },
      {
        src: 'pics/Emergency/KeralaFloods2019/Kerala-Floods-2.jpg',
        caption: 'Inundated roadways and rescue team operations'
      },
      {
        src: 'pics/Emergency/KeralaFloods2019/Kerala-Floods-3.jpg',
        caption: 'Emergency evacuation boat deployment'
      },
      {
        src: 'pics/Emergency/KeralaFloods2019/Kerala-Floods-4.jpg',
        caption: 'Relief distribution and rehabilitation camp logistics'
      }
    ],
    videos: [
      {
        title: 'Kerala Floods 2019 Rescue & Situation Briefing',
        url: 'https://www.youtube.com/watch?v=fW_sZnIwO28',
        youtubeId: 'fW_sZnIwO28'
      }
    ]
  },
  {
    id: 'kerala-floods-2018',
    slug: 'keralafloods',
    legacyFilename: 'emergency/KeralaFloods.html',
    title: 'Kerala Floods 2018 Century Mega Disaster & Relief Operation',
    category: 'Natural Disaster',
    categoryBadge: 'badge-emerald',
    alertLevel: 'State Level Red Alert Mega Disaster',
    status: 'Historic Rescue & Rebuild Operation',
    date: 'August 2018',
    location: 'Kerala, India',
    poster: 'pics/Emergency/KeralaFloods/1.jpg',
    banner: 'pics/Emergency/KeralaFloods/Kerala-Floods-1.jpg',
    summary: 'The worst flooding in Kerala in nearly a century occurred in August 2018, opening 35 of 54 major dams simultaneously. OakShow launched a 24x7 emergency hub facilitating SOS rescue requests, shelter maps, volunteer mobilization, and direct donations to the Chief Minister Distress Relief Fund.',
    description: 'During the unprecedented August 2018 floods, severe rainfall inundated hundreds of villages and cities across Kerala. OakShow created this dedicated emergency directory to ensure every citizen could quickly access emergency numbers (1077, 112, 122), food & shelter map locators, and transparent direct relief contribution channels.',
    helplines: [
      {
        name: 'District Disaster Rescue Team (1077)',
        number: '1077',
        tel: '1077',
        type: 'District Control Room with Location Tracer',
        desc: 'The rescue teams identify your approximate geographic zone upon dialing (Include local STD code).'
      },
      {
        name: 'Offline Emergency Rescue Calling (No Network Required)',
        number: '122 / 911',
        tel: '122',
        type: 'GSM Hardware Emergency Mode',
        desc: 'Connects to nearest active mobile tower regardless of SIM carrier connectivity.'
      },
      {
        name: 'National Emergency Response Line',
        number: '112',
        tel: '112',
        type: 'Unified Emergency Services',
        desc: 'Central command for armed forces (Army, Navy, Air Force, Coast Guard) & NDRF airlifts.'
      }
    ],
    rescueActions: [
      {
        title: 'Check Food, Drinking Water & Shelter Map Locator',
        url: 'https://www.google.com/maps/d/viewer?mid=19pdXYBAk8RyaMjazX7mjJIJ9EqAyoRs5',
        provider: 'Google Crisis Response & Citizens Collective',
        badge: 'Interactive Map'
      },
      {
        title: 'Send Emergency Request for Trapped Persons',
        url: 'https://keralarescue.in/request/',
        provider: 'Kerala Rescue Official Portal',
        badge: 'SOS Rescue Dispatch'
      },
      {
        title: 'View District Essential Needs & Medicine Requests',
        url: 'https://keralarescue.in/district_needs/',
        provider: 'Kerala Rescue Needs Coordinator',
        badge: 'Material Logistics'
      },
      {
        title: 'Register as a Relief Camp Volunteer',
        url: 'https://keralarescue.in/volunteer/',
        provider: 'Youth & Community Volunteer Cell',
        badge: 'Volunteer Cell'
      }
    ],
    reliefFunds: [
      {
        title: "Donate to Kerala Chief Minister's Distress Relief Fund (CMDRF)",
        url: 'https://donation.cmdrf.kerala.gov.in/#donation',
        provider: 'Govt of Kerala CMDRF',
        desc: 'Primary government channel for transparent flood rebuilding and compensation.'
      },
      {
        title: 'Donate to CMDRF via Paytm Helping Hand',
        url: 'https://paytm.com/helpinghand/kerala-cm-s-distress-relief-fund',
        provider: 'Paytm Disaster Portal',
        desc: 'Instant 0% transaction fee contribution directly mapped to CMDRF.'
      },
      {
        title: 'Contribute Essential Materials via KeralaRescue',
        url: 'https://keralarescue.in/reg_contrib/',
        provider: 'Kerala Rescue Foundation',
        desc: 'Direct provision of packaged foods, water purifiers, medicines, and clothes.'
      }
    ],
    faqsAndGuidelines: [
      {
        question: 'What is the fastest way to communicate location when stranded?',
        answer: 'Dial 1077 with your STD code or call 112. If internet is accessible, submit your precise location on KeralaRescue.in so rescue boats and helicopters can pin your roof.',
        source: 'Kerala Disaster Management Desk'
      }
    ],
    liveUpdates: [
      {
        headline: 'Kerala floods: Massive landslip in Kannur caught on camera',
        url: 'https://www.hindu.com/news/national/kerala/kerala-floods-massive-landslip-in-kannur-caught-on-camera/article24705544.ece',
        author: 'The Hindu',
        date: '16 August, 2018'
      },
      {
        headline: 'SOS videos flood Internet as people in Kerala try to reach out for help',
        url: 'https://www.thenewsminute.com/article/sos-videos-flood-internet-people-kerala-try-reach-out-help-86662',
        author: 'The News Minute',
        date: '16 August, 2018'
      },
      {
        headline: 'Kerala Floods LIVE: Rescue operations underway as death toll nears 80',
        url: 'https://economictimes.indiatimes.com/news/politics-and-nation/kerala-issues-red-alert-flood-death-toll-rises-to-67/articleshow/65418310.cms',
        author: 'Economic Times',
        date: '16 August, 2018'
      },
      {
        headline: "Here's how you can help flood-hit people of Kerala",
        url: 'https://timesofindia.indiatimes.com/city/kochi/heres-how-you-can-help-flood-hit-people-of-kerala/articleshow/65415305.cms',
        author: 'Times of India',
        date: '15 August, 2018'
      }
    ],
    gallery: [
      {
        src: 'pics/Emergency/KeralaFloods/Kerala-Floods-1.jpg',
        caption: 'Historic water levels across Kochi and Aluva in August 2018'
      },
      {
        src: 'pics/Emergency/KeralaFloods/Kerala-Floods-2.jpg',
        caption: 'Fishermen and defense personnel boats conducting rescue runs'
      },
      {
        src: 'pics/Emergency/KeralaFloods/Kerala-Floods-3.jpg',
        caption: 'Airlift operations by Indian Navy & Air Force'
      },
      {
        src: 'pics/Emergency/KeralaFloods/Kerala-Floods-4.jpg',
        caption: 'Community relief centers providing cooked meals and shelter'
      }
    ],
    videos: [
      {
        title: 'Kerala Floods 2018 Ground Reality & Army Rescue',
        url: 'https://www.youtube.com/watch?v=T6ILOmKfAnI',
        youtubeId: 'T6ILOmKfAnI'
      }
    ]
  },
  {
    id: 'climate-change-crisis',
    slug: 'sorandtp',
    legacyFilename: 'sorandtp/index.html',
    title: 'Climate Change Emergency & Global Plantation Campaign',
    category: 'Environmental Emergency',
    categoryBadge: 'badge-gold',
    alertLevel: 'Global Planetary Ecological Crisis',
    status: 'Ongoing Conservation & Action Initiative',
    date: 'Initiated June 2018 (Continuous)',
    location: 'Global / Worldwide',
    poster: 'sorandtp/plant-a-tree.jpg',
    banner: 'sorandtp/plant-a-tree.jpg',
    summary: 'Climate change is an existential crisis escalating at unprecedented rates. OakShow\'s #SaveOurRaceandThePlanet campaign mobilizes citizens worldwide to plant trees on birthdays and milestones, systematically combating global warming through collective environmental action.',
    description: 'Global warming, rising planetary temperatures, and extreme weather events require immediate citizen action. While industrial transition takes time, if millions of people commit to planting and nurturing at least one tree every year, the exponential carbon sequestration directly restores ecological balance. OakShow actively champions the #SaveOurRaceandThePlanet movement.',
    helplines: [
      {
        name: 'OakShow Environmental Desk & Campaign Queries',
        number: 'oakshow0@gmail.com',
        tel: 'mailto:oakshow0@gmail.com',
        type: 'Campaign Coordination',
        desc: 'Direct contact to register tree plantation drives and community green initiatives.'
      }
    ],
    rescueActions: [
      {
        title: 'Plant a Tree & Share with #SaveOurRaceandThePlanet',
        url: 'https://twitter.com/intent/tweet?text=I+planted+a+tree+to+fight+climate+change!+%23SaveOurRaceandThePlanet+%40oak_show',
        provider: 'OakShow Global Green Movement',
        badge: 'Citizen Action'
      },
      {
        title: 'United Nations Climate Action (UNFCCC)',
        url: 'https://unfccc.int/',
        provider: 'United Nations Climate Change',
        badge: 'UN Environmental Action'
      }
    ],
    reliefFunds: [
      {
        title: 'Contribute to Global Reforestation Initiatives',
        url: 'https://www.tree-nation.com/',
        provider: 'Tree-Nation & Global Reforestation Projects',
        desc: 'Sponsor tree plantations in critically deforested ecosystems across the world.'
      }
    ],
    faqsAndGuidelines: [
      {
        question: 'What is the goal of #SaveOurRaceandThePlanet?',
        answer: 'To empower everyday people to take direct, tangible climate action. If everyone plants one tree each year on their birthday, millions of new trees will naturally cool our planet, purify the atmosphere, and fight global warming.',
        source: 'OakShow Editorial & Environmental Initiative'
      }
    ],
    liveUpdates: [],
    gallery: [
      {
        src: 'sorandtp/plant-a-tree.jpg',
        caption: 'Plant a Tree to Fight Climate Change Campaign Banner'
      }
    ],
    videos: []
  }
];

// Write data/emergencies.json
fs.writeFileSync('data/emergencies.json', JSON.stringify(emergencies, null, 2), 'utf-8');
console.log(`✓ Wrote ${emergencies.length} official emergencies to data/emergencies.json`);

// Clean movies.json and series.json to ensure NO emergencies or policies are listed as movies/series
const movies = JSON.parse(fs.readFileSync('data/movies.json', 'utf-8'));
const series = JSON.parse(fs.readFileSync('data/series.json', 'utf-8'));

const nonMovieIds = new Set([
  'coronavirusoutbreak',
  'KeralaFloods2019',
  'KeralaFloods',
  'OakShowEmergency',
  'copyrightPolicy',
  'sorandtp'
]);

const cleanedMovies = movies.filter(m => !nonMovieIds.has(m.id) && !m.filename?.includes('Emergency') && !m.filename?.includes('copyrightPolicy'));
const cleanedSeries = series.filter(s => !nonMovieIds.has(s.id) && !s.filename?.includes('Emergency'));

console.log(`✓ Cleaned movies: from ${movies.length} down to ${cleanedMovies.length}`);
console.log(`✓ Cleaned series: from ${series.length} down to ${cleanedSeries.length}`);

fs.writeFileSync('data/movies.json', JSON.stringify(cleanedMovies, null, 2), 'utf-8');
fs.writeFileSync('data/series.json', JSON.stringify(cleanedSeries, null, 2), 'utf-8');

console.log('=== EMERGENCY PARSING COMPLETED SUCCESSFULLY ===');
