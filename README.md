### Table movies
| id | title    | director | release_year | is_available |
|----------|----------|----------|--------------|--------------|
| Number   | String   | String   | Number       | Boolean      |

### SQL

```sql
CREATE database crudapi;
```

```sql
CREATE table movies (
    id bigserial primary key,
    title varchar(255) not null,
    director varchar(255) not null,
    release_year int not null,
    is_available boolean not null
);
```

```sql
INSERT INTO movies (title, director, release_year, is_available) VALUES 
('Eternal Sunshine of the Spotless Mind', 'Michel Gondry', 2004, true),
('Breaking Bad', 'Vince Gilligan', 2008, true),
('Back to the Future', 'Robert Zemeckis', 1985, true),
('The Matrix', 'Lana Wachowski', 1999, true),
('Better Call Saul', 'Vince Gilligan', 2015, true);
```
