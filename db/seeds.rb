# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

eli_keszler = Artist.create(
  first_name: 'Eli',
  last_name: 'Keszler',
  image_url: 'http://www.icareifyoulisten.com/wp-content/uploads/2012/05/Eli-Keszler-Photo-by-Ashley-Paul.jpg',
  bio: "Eli Keszler is a New York based artist, composer and percussionist working at the intersections of performance, installation, notation and composition. His time-based works examine the limits of instruments, drawings, diagrams, score writing and musical experience through various technologies and techniques. Keszler's large-scale installations can be experienced autonomously or alongside an ensemble/solo performance featuring his own aggressively propulsive drumming. These works are often accompanied by collections of visual works, drawings and scores presented in conjunction with installations and compositions."
)

last_signs_of_speed = eli_keszler.works.create({
  title: 'Last Signs of Speed',
  end_date: Date.new(2016,11,17),
  price: 10.00,
  image_url: 'https://static1.squarespace.com/static/55af1d12e4b0f7c1c9b88ce8/57dc21f120099eab7d67089e/57dea44aebbd1a8e834d1486/1474208846554/',
  description: 'Last Signs is Eli’s first solo release since 2012’s <i>Catching Net</i> (PAN Records) and explores a very different side of his unique acoustic universe. One in which the macrocosmic percussive collisions of his earlier work give way to a gradual unfolding of dub-influenced rhythmic constellations. Eli has described <i>Last Signs</i> as his response to playing in club environments over the last few years; an attempt to negotiate a delicate balance between the materiality of his acoustic instrument and the hyper-mediated sonic ecosystem of the club sound system. Coming off like an inspired synthesis between Scientist and Xenakis, <i>Last Signs of Speed</i> is a truly unique work by an artist at the height of his powers.',
  layout: 'squareformat',
  record_label: 'Empty Editions'
}).pieces.create([
  {
    track_number: 0,
    title: 'Sudden Laughter',
    duration: "4:22",
    source_url: "https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/01.mp3"
  },
  {
    track_number: 1,
    title: 'Corresponding Probably to Quant',
    duration: '4:14',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/02.mp3'
  },
  {
    track_number: 2,
    title: 'Streaming Down. Streaming Down',
    duration: '4:56',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/03.mp3'
  },
  {
    track_number: 3,
    title: 'The Immense Endless Belt of Faces',
    duration: '8:08',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/04.mp3'
  },
  {
    track_number: 4,
    title: 'No Iodine, No Breeze',
    duration: '4:56',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/05.mp3'
  },
  {
    track_number: 5,
    title: 'Breaches Breaches',
    duration: '3:36',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/06.mp3'
  },
  {
    track_number: 6,
    title: 'The Next Day, In the Afternoon',
    duration: '6:24',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/07.mp3'
  },
  {
    track_number: 7,
    title: 'Is Strategist',
    duration: '2:01',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/08.mp3'
  },
  {
    track_number: 8,
    title: 'Is Stage Director',
    duration: '5:29',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/09.mp3'
  },
  {
    track_number: 9,
    title: 'Holes, Parts Missing',
    duration: '3:41',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/10.mp3'
  },
  {
    track_number: 10,
    title: 'Willing to be Open',
    duration: '3:48',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/11.mp3'
  },
  {
    track_number: 11,
    title: 'Fusillade of Colors',
    duration: '4:53',
    source_url: 'https://s3.amazonaws.com/arc-test-audio/eli_keszler/last_signs_of_speed/12.mp3'
  }
])


eli_keszler.works.create({
  title: 'Townsley Battery',
  end_date: Date.new(2008),
  price: 5.00,
  image_url: 'http://static1.squarespace.com/static/55af1d12e4b0f7c1c9b88ce8/t/55be76cce4b057acabb489fe/1438545614914/?format=1500w',
  description: 'Townsley Battery was performed in Mills Valley, CA in Fort Chronkite in August 2012. The piece featured a solo percussion performance accompanied by a mechanized and wind-powered piano wire installation.'
}).pieces.create(
  {
    duration: "25:48",
    price: 6.50,
    source_url: "https://s3.amazonaws.com/reubenson-portfolio/Sheet_metal.mp3",
    title: 'Townsley Battery'
  }
)
eli_keszler.works.create({
  title: 'Railsback Curve',
  price: 5.00,
  end_date: Date.new(2012),
  image_url:  'http://static1.squarespace.com/static/55af1d12e4b0f7c1c9b88ce8/55be0870e4b0681497fa456a/55be08a7e4b0178bcb42cf8f/1438517416398/EliKeszler4102-original.jpg?format=1500w',
  description: "The term “Railsback Curve” is a measurement developed by O.L. Railsback that expresses the difference between traditional piano tuning and equal-tempered tuning. The installation synthesizes this discrepancy by expressing the piano as a series of morphological variables. These varied strains ask if the piano, as a systematized, industrialized and standardized cultural instrument, can adopt abstracted structures and still retain legibility as a musical object. The canvas at the center of the gallery displays the numerical frequency range of a piano projected out to the second decimal. Acting as an object between score, data set and painting, the silkscreened enamel ink connects the mechanical process of printing to the machinic sound of the installation. The character width expands the numbers and distorts the text, rendering the sequence of numbers as a black mass similar to the finish of the piano itself. This repetitive yet variable structure borders on notation, but also curves and expands typography, thus taking on rhythmic formations that render the individual datums as larger units through the printing process. Throughout the space, mounted black enclosures emit short piano recordings taken from the score and performed by pianist Anthony Coleman. These pianistic glyphs are then fragmented and mediated by the enclosures and hidden vibrational systems located around them. The enclosures contain compositional networks that form abstract fields of sonorities, both amplifying and muffling various aspects of the fragments. The recordings blend with mechanical attacks and strikes from motors encased within the boxes, filtering sounds as the enclosures mask their source. Railsback Curve was an installation at 3S in Portsmouth, NH in May 2015."
}).pieces.create(
  {
    duration: "15:48",
    price: 5.00,
    source_url: "https://s3.amazonaws.com/reubenson-portfolio/Sheet_metal.mp3",
    title: 'Railsback Curve'
  }
)


#### Faker ####
audio_bucket = "https://s3.amazonaws.com/arc-test-audio/"
10.times do
  artist = Artist.create({
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    bio: Faker::Lorem.sentences(5).join(" ")
  })
  4.times do
    work = artist.works.create({
      title: Faker::Lorem.words(2+rand(3)).map(&:capitalize).join(" "),
      end_date: Date.new(1970 + rand(40)),
      price: Faker::Number.decimal(2),
      description: Faker::Lorem.sentences(5).join(" "),
      image_url: Faker::Placeholdit.image("1600x900", 'jpg')
    })
    number_of_tracks = 2 + rand(8)
    number_of_tracks.times do
      work.pieces.create({
        title: Faker::Lorem.words(2+rand(3)).map(&:capitalize).join(" "),
        duration: Faker::Number.between(1,60).to_s+ ":" + Faker::Number.between(1,60).to_s,
        price: Faker::Number.decimal(2),
        source_url: audio_bucket + (1+rand(19)).to_s + '.mp3',
        description: Faker::Lorem.sentences(6).join(" "),
        track_number: work.pieces.count
      })
    end
  end
end


#### Testing ####
# user.create({
#   user.first_name = "Reuben"
#   user.last_name = "Son"
#   user.email = "test@testing.com"
# })
