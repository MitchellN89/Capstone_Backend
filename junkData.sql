INSERT INTO
    users (
        first_name,
        last_name,
        password,
        email_address,
        phone_number,
        account_type
    )
VALUES (
        'John',
        'Doe',
        'password123',
        'john.doe@email.com',
        '123-456-7890',
        'eventPlanner'
    ), (
        'Jane',
        'Smith',
        'pass456',
        'jane.smith@email.com',
        '987-654-3210',
        'eventPlanner'
    ), (
        'Robert',
        'Johnson',
        'secretPass',
        'robert.j@email.com',
        '555-123-4567',
        'eventPlanner'
    ), (
        'Emily',
        'Brown',
        'userPass123',
        'emily.brown@email.com',
        '789-012-3456',
        'eventPlanner'
    ), (
        'Michael',
        'Lee',
        'myPass789',
        'michael.lee@email.com',
        '234-567-8901',
        'eventPlanner'
    );

INSERT INTO
    users (
        first_name,
        last_name,
        password,
        email_address,
        phone_number,
        company_name,
        website_url,
        account_type
    )
VALUES (
        'Alpha',
        'Industries',
        'alphaPass123',
        'alpha.industries@email.com',
        '111-222-3333',
        'Alpha Co.',
        'http://alpha.co',
        'vendor'
    ), (
        'Beta',
        'Technologies',
        'betaPass456',
        'beta.tech@email.com',
        '444-555-6666',
        'Beta Corp.',
        'http://beta-corp.com',
        'vendor'
    ), (
        'Gamma',
        'Solutions',
        'gammaPass789',
        'gamma.solutions@email.com',
        '777-888-9999',
        'Gamma Ltd.',
        'http://gamma-ltd.com',
        'vendor'
    ), (
        'Delta',
        'Innovations',
        'deltaPass321',
        'delta.innovations@email.com',
        '101-202-3030',
        'Delta Innovations',
        'http://delta-innovations.com',
        'vendor'
    ), (
        'Epsilon',
        'Enterprises',
        'epsilonPass654',
        'epsilon.enterprises@email.com',
        '404-505-6060',
        'Epsilon Group',
        'http://epsilon-group.com',
        'vendor'
    ), (
        'Zeta',
        'Solutions',
        'zetaPass987',
        'zeta.solutions@email.com',
        '707-808-9090',
        'Zeta Corp.',
        'http://zeta-corp.com',
        'vendor'
    ), (
        'Eta',
        'Technologies',
        'etaPass123',
        'eta.tech@email.com',
        '111-121-1313',
        'Eta Solutions',
        'http://eta-solutions.com',
        'vendor'
    ), (
        'Theta',
        'Enterprises',
        'thetaPass456',
        'theta.enterprises@email.com',
        '141-151-1616',
        'Theta Ltd.',
        'http://theta-ltd.com',
        'vendor'
    ), (
        'Iota',
        'Innovations',
        'iotaPass789',
        'iota.innovations@email.com',
        '171-181-1919',
        'Iota Innovations',
        'http://iota-innovations.com',
        'vendor'
    ), (
        'Kappa',
        'Industries',
        'kappaPass321',
        'kappa.industries@email.com',
        '202-212-2222',
        'Kappa Co.',
        'http://kappa.co',
        'vendor'
    );

INSERT INTO locations (city)
VALUES ('Auckland'), ('Wellington'), ('Christchurch'), ('Hamilton'), ('Tauranga'), ('Dunedin'), ('Palmerston North'), ('Napier-Hastings'), ('Rotorua'), ('New Plymouth'), ('Whangarei'), ('Invercargill'), ('Nelson'), ('Lower Hutt'), ('Gisborne'), ('Upper Hutt'), ('Porirua');