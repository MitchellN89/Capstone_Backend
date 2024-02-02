-- Active: 1701465498351@@127.0.0.1@3306@eventconnect

DROP DATABASE eventconnect;

CREATE DATABASE eventconnect;

USE eventconnect;

INSERT INTO locations (city)
VALUES ('Auckland'), ('Wellington'), ('Christchurch'), ('Hamilton'), ('Tauranga'), ('Dunedin'), ('Palmerston North'), ('Napier-Hastings'), ('Rotorua'), ('New Plymouth'), ('Whangarei'), ('Invercargill'), ('Nelson'), ('Lower Hutt'), ('Gisborne'), ('Upper Hutt'), ('Porirua');

INSERT INTO services (service)
VALUES ('Caterer'), ('Lighting Technician'), ('Sound Technician'), ('Party Equipment Supplier'), ('Florist'), ('Venue Arrangement Service'), ('Security Service'), ('Photography Service'), ('Transportation Service'), ('Decorator'), ('DJ (Disc Jockey)'), (
        'Audiovisual Equipment Rental'
    ), ('Event Staffing Agency'), ('Stage Manager'), (
        'Graphic Designer (for event materials)'
    ), (
        'Invitation Printing Service'
    ), ('Make-up Artist'), ('Hairstylist'), ('Costume Rental Service'), ('Mobile Bar Service'), ('Furniture Rental Company'), ('Valet Parking Service'), ('Event Cleaning Service'), ('Ice Sculpture Artist'), ('Balloon Artist'), ('Mobile Restroom Rental'), ('Fireworks Display Service'), ('Live Band'), ('Event Insurance Provider');

INSERT INTO
    events (
        event_name,
        start_Date_Time,
        end_Date_Time,
        primary_Address,
        location_Id,
        end_Client_First_Name,
        end_Client_Last_Name,
        end_Client_Email_Address,
        end_Client_Phone_Number,
        archived,
        event_planner_id
    )
VALUES (
        'Dave & July''s Wedding',
        '2023-01-01 12:30',
        '2023-01-01 16:30',
        'Auckland',
        1,
        'Dave',
        'Pinkerton',
        'pinkerton@gmail.com',
        '123456',
        false,
        1
    ), (
        'Sophie''s 30th Birthday Celebration',
        '2024-05-10 18:00',
        '2024-05-10 22:00',
        '28 Oak Street, Ponsonby',
        3,
        'Sophie',
        'Anderson',
        'sophie.a@example.com',
        '021 777 1234',
        false,
        2
    ), (
        'RockFest 2024',
        '2024-08-20 19:30',
        '2024-08-20 23:00',
        'Vector Arena, Auckland',
        7,
        'Event',
        'Organizer',
        'events@rockfest.com',
        '09 888 5678',
        false,
        1
    ), (
        'Emily & Michael''s Wedding',
        '2024-02-15 14:00',
        '2024-02-15 19:00',
        '42 Rosewood Avenue, Karori',
        5,
        'Emily',
        'Johnson',
        'emily.j@example.com',
        '021 555 6789',
        false,
        2
    );

INSERT INTO
    event_services (
        service_id,
        event_id,
        broadcast
    )
VALUES (1, 1, true), (6, 1, true), (8, 1, true), (10, 1, true), (11, 1, true), (12, 1, true), (1, 2, true), (2, 2, true), (3, 2, true), (4, 2, true), (5, 2, true), (6, 2, true), (8, 2, true), (10, 2, true), (11, 2, true), (12, 2, true), (13, 2, true), (1, 3, true), (2, 3, true), (3, 3, true), (6, 3, true), (8, 3, true), (10, 3, true), (11, 3, true), (12, 3, true), (14, 3, true), (15, 3, true), (28, 3, true), (1, 4, true), (6, 4, true), (8, 4, true), (10, 4, true), (11, 4, true), (12, 4, true), (13, 4, true), (14, 4, true), (16, 4, true), (17, 4, true), (18, 4, true);