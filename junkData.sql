-- Active: 1701465498351@@127.0.0.1@3306@eventconnect

DROP DATABASE eventconnect;

CREATE DATABASE eventconnect;

USE eventconnect;

INSERT INTO locations (city)
VALUES ('Auckland'), ('Wellington'), ('Christchurch'), ('Hamilton'), ('Tauranga'), ('Dunedin'), ('Palmerston North'), ('Napier-Hastings'), ('Rotorua'), ('New Plymouth'), ('Whangarei'), ('Invercargill'), ('Nelson'), ('Lower Hutt'), ('Gisborne'), ('Upper Hutt'), ('Porirua');

INSERT INTO services (service)
VALUES ('Caterer'), ('Lighting Technician'), ('Sound Technician'), ('Party Equipment Supplier'), ('Florist'), ('Venue Arrangement Service'), ('Event Planner'), ('Security Service'), ('Photography Service'), ('Transportation Service'), ('Decorator'), ('DJ (Disc Jockey)'), (
        'Audiovisual Equipment Rental'
    ), ('Event Staffing Agency'), ('Stage Manager'), (
        'Graphic Designer (for event materials)'
    ), (
        'Invitation Printing Service'
    ), ('Make-up Artist'), ('Hairstylist'), ('Costume Rental Service'), ('Mobile Bar Service'), ('Furniture Rental Company'), ('Valet Parking Service'), ('Event Cleaning Service'), ('Ice Sculpture Artist'), ('Balloon Artist'), ('Mobile Restroom Rental'), ('Fireworks Display Service'), ('Live Band'), ('Event Insurance Provider');

INSERT INTO event_types (type)
VALUES ('Wedding'), ('Birthday'), ('Corporate Event'), ('Music Festival'), ('Conference'), ('Art Exhibition'), ('Sports Tournament'), ('Product Launch'), ('Baby Shower'), ('Graduation Party');

INSERT INTO
    event_type_services (event_type_id, service_id)
VALUES (1, 9), (1, 16), (1, 24), (1, 35), (1, 21), (1, 37), (1, 34), (2, 22), (2, 9), (2, 15), (2, 5), (2, 25), (2, 35), (2, 3), (3, 9), (3, 2), (3, 35), (3, 24), (3, 30), (3, 12), (4, 31), (4, 29), (4, 28), (4, 8), (4, 33), (4, 11), (5, 2), (5, 9), (5, 35), (5, 30), (5, 24), (5, 32), (6, 36), (6, 17), (6, 19), (6, 28), (6, 9), (6, 1), (6, 23), (7, 36), (7, 28), (7, 7), (7, 20), (7, 27), (7, 10), (8, 36), (8, 2), (8, 9), (8, 24), (8, 26), (8, 32), (9, 35), (9, 9), (9, 14), (9, 25), (9, 6), (9, 4), (10, 9), (10, 35), (10, 2), (10, 13), (10, 24), (10, 18),