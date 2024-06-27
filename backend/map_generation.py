from backend.models import Location
import time


def generate_map():
    width = 41
    height = 21

    map = [['.' for _ in range(width)] for _ in range(height)]

    start_time = time.time()
    locations = Location.query.all()

    print("Time taken to query LOCATIONS!!!!: ", time.time() - start_time)

    for location in locations:
        x = location.x
        y = location.y

        if (location.location_id == 'BL'):
            map[y][x] = 'X'
        elif (location.location_id.startswith('P')):
            map[y][x] = 'P'
        elif (location.location_id.startswith('CA')):
            map[y][x] = 'C'
        elif (location.location_id.startswith('S')):
            map[y][x] = 'S'
        elif (location.location_id == 'EN'):
            map[y][x] = 'E'
        elif (location.location_id == 'EX'):
            map[y][x] = 'F'

    return map


def get_start():
    locations = Location.query.all()
    for location in locations:
        if location.location_id == 'EN':
            return (location.y, location.x)


def get_exit():
    locations = Location.query.all()
    for location in locations:
        if location.location_id == 'EX':
            return (location.y, location.x)


def get_checkouts():
    # locations = Location.query.all()
    # checkouts = []
    # for location in locations:
    #     if location.location_id.startswith('CA') or location.location_id.startswith('S'):
    #         checkouts.append((location.y, location.x))

    return [(18, 5), (14, 3)]


if __name__ == '__main__':
    generate_map()


# map = generate_map()
# for i in range(20, -1, -1):
#     for j in range(41):
#         print(map[i][j], end=' ')
#         print()
