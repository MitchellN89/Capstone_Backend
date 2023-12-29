-- Active: 1701465498351@@127.0.0.1@3306@eventconnect

DROP DATABASE eventconnect;

CREATE DATABASE eventconnect;

USE eventconnect;

INSERT INTO locations (city)
VALUES ('Auckland'), ('Wellington'), ('Christchurch'), ('Hamilton'), ('Tauranga'), ('Dunedin'), ('Palmerston North'), ('Napier-Hastings'), ('Rotorua'), ('New Plymouth'), ('Whangarei'), ('Invercargill'), ('Nelson'), ('Lower Hutt'), ('Gisborne'), ('Upper Hutt'), ('Porirua');

INSERT INTO services (service)
VALUES ('Catering Services'), ('Floral and Event Design'), ('Event Photography'), ('Audio-Visual Services'), ('Security Services'), ('Party Equipment Rental'), (
        'Event Planning and Coordination'
    ), ('Live Entertainment'), ('Venue Decoration Services'), ('Transportation Services');

INSERT INTO
    events (
        event_name,
        start_date_time,
        end_date_time,
        event_planner_id,
        primary_address,
        location_id,
        end_client_first_name,
        end_client_last_name,
        end_client_email_address,
        end_client_phone_number,
        archived
    )
VALUES (
        'Tech Summit',
        '2024-05-15 09:00:00',
        '2024-05-15 17:00:00',
        1,
        '123 Main Street, Auckland',
        1,
        'John',
        'Smith',
        'john.smith@example.com',
        '555-1234',
        false
    ), (
        'Fashion Show',
        '2024-06-20 14:00:00',
        '2024-06-20 18:00:00',
        2,
        '456 Queen Street, Wellington',
        2,
        'Jane',
        'Doe',
        'jane.doe@example.com',
        '555-5678',
        false
    ), (
        'Business Expo',
        '2024-07-10 10:30:00',
        '2024-07-10 15:30:00',
        1,
        '789 King Street, Christchurch',
        3,
        'Robert',
        'Johnson',
        'robert.j@example.com',
        '555-9876',
        false
    ), (
        'Music Festival',
        '2024-08-05 17:00:00',
        '2024-08-05 23:00:00',
        2,
        '101 Lake Road, Hamilton',
        4,
        'Emily',
        'Brown',
        'emily.brown@example.com',
        '555-4321',
        false
    ), (
        'Food Expo',
        '2024-09-15 12:00:00',
        '2024-09-15 16:00:00',
        1,
        '202 Park Avenue, Tauranga',
        5,
        'Michael',
        'Lee',
        'michael.lee@example.com',
        '555-8765',
        false
    ), (
        'Art Exhibition',
        '2024-10-10 09:30:00',
        '2024-10-10 16:30:00',
        2,
        '303 Gallery Street, Dunedin',
        1,
        'Olivia',
        'Miller',
        'olivia.m@example.com',
        '555-5678',
        true
    ), (
        'Sports Tournament',
        '2024-11-20 13:00:00',
        '2024-11-20 18:00:00',
        1,
        '404 Stadium Avenue, Palmerston North',
        2,
        'Daniel',
        'Taylor',
        'daniel.t@example.com',
        '555-8765',
        false
    ), (
        'Conference',
        '2024-12-05 08:00:00',
        '2024-12-05 17:00:00',
        2,
        '505 Conference Road, Napier-Hastings',
        3,
        'Sophia',
        'Clark',
        'sophia.c@example.com',
        '555-2345',
        false
    ), (
        'Wedding Expo',
        '2025-01-15 11:00:00',
        '2025-01-15 15:00:00',
        1,
        '606 Love Lane, Hamilton',
        4,
        'William',
        'Anderson',
        'william.a@example.com',
        '555-8765',
        true
    ), (
        'Technology Conference',
        '2025-02-10 09:00:00',
        '2025-02-10 18:00:00',
        2,
        '707 Tech Street, Rotorua',
        5,
        'Emma',
        'Davis',
        'emma.d@example.com',
        '555-1234',
        false
    );

INSERT INTO
    event_services (service_id, event_id)
VALUES (1, 1), (2, 6), (3, 2), (4, 7), (5, 3), (6, 8), (7, 4), (8, 9), (9, 5), (10, 10), (1, 6), (2, 2), (3, 7), (4, 3), (5, 8), (6, 4), (7, 9), (8, 5), (9, 10), (10, 1), (1, 3), (2, 8), (3, 4), (4, 9), (5, 5), (6, 10), (7, 1), (8, 6), (9, 7), (10, 2);

INSERT INTO event_types (type)
VALUES ('Wedding'), ('Birthday'), ('Corporate Event'), ('Music Festival'), ('Conference'), ('Art Exhibition'), ('Sports Tournament'), ('Product Launch'), ('Baby Shower'), ('Graduation Party');