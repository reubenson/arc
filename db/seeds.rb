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
eli_keszler.works.create({
  title: 'Townsley Battery',
  price: 5.00,
  image_url: 'http://static1.squarespace.com/static/55af1d12e4b0f7c1c9b88ce8/t/55be76cce4b057acabb489fe/1438545614914/?format=1500w',
  description: 'Townsley Battery was performed in Mills Valley, CA in Fort Chronkite in August 2012. The piece featured a solo percussion performance accompanied by a mechanized and wind-powered piano wire installation.'
}).pieces.create(
  {
    title: 'Townsley Battery',
    duration: "25:48",
    source_url: "https://s3.amazonaws.com/reubenson-portfolio/Sheet_metal.mp3"
  }
)
eli_keszler.works.create({
  title: 'Railsback Curve',
  price: 5.00,
    image_url:  'http://static1.squarespace.com/static/55af1d12e4b0f7c1c9b88ce8/55be0870e4b0681497fa456a/55be08a7e4b0178bcb42cf8f/1438517416398/EliKeszler4102-original.jpg?format=1500w',
  description: "The term “Railsback Curve” is a measurement developed by O.L. Railsback that expresses the difference between traditional piano tuning and equal-tempered tuning. The installation synthesizes this discrepancy by expressing the piano as a series of morphological variables. These varied strains ask if the piano, as a systematized, industrialized and standardized cultural instrument, can adopt abstracted structures and still retain legibility as a musical object. The canvas at the center of the gallery displays the numerical frequency range of a piano projected out to the second decimal. Acting as an object between score, data set and painting, the silkscreened enamel ink connects the mechanical process of printing to the machinic sound of the installation. The character width expands the numbers and distorts the text, rendering the sequence of numbers as a black mass similar to the finish of the piano itself. This repetitive yet variable structure borders on notation, but also curves and expands typography, thus taking on rhythmic formations that render the individual datums as larger units through the printing process. Throughout the space, mounted black enclosures emit short piano recordings taken from the score and performed by pianist Anthony Coleman. These pianistic glyphs are then fragmented and mediated by the enclosures and hidden vibrational systems located around them. The enclosures contain compositional networks that form abstract fields of sonorities, both amplifying and muffling various aspects of the fragments. The recordings blend with mechanical attacks and strikes from motors encased within the boxes, filtering sounds as the enclosures mask their source. Railsback Curve was an installation at 3S in Portsmouth, NH in May 2015."
}).pieces.create(
  {
    title: 'Railsback Curve',
    duration: "15:48",
    source_url: "https://s3.amazonaws.com/reubenson-portfolio/Sheet_metal.mp3"
  }
)
