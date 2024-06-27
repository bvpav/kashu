import heapq


def print_grid(map):
    """Helper function to print the grid"""
    for i in range(9, -1, -1):
        for j in range(10):
            print(map[i][j], end=' ')
        print()


def is_valid_move(x, y, grid, just_collected=False):
    """Helper function to check if a move is valid"""
    if 0 <= x < len(grid) and 0 <= y < len(grid[0]) and grid[x][y] != 'X' and grid[x][y] != 'B' and grid[x][y] != 'A':
        if just_collected and grid[x][y] == '1':
            return False
        return True
    return False


def heuristic(a, b):
    """Heuristic function for A* (Manhattan Distance)"""
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def is_adjacent(a, b):
    return abs(a[0] - b[0]) <= 1 and abs(a[1] - b[1]) <= 1


def a_star(start, goal, grid, just_collected=False):
    """A* Pathfinding Algorithm"""
    open_set = []
    heapq.heappush(open_set, (0, start))
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}
    first_move_after_collect = just_collected
    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            path.reverse()
            return path
        neighbors = [(0, 1), (1, 0), (0, -1), (-1, 0),
                     (1, 1), (1, -1), (-1, 1), (-1, -1)]
        for direction in neighbors:
            neighbor = (current[0] + direction[0], current[1] + direction[1])
            if is_valid_move(neighbor[0], neighbor[1], grid, first_move_after_collect):
                # Skip if the neighbor is the goal and the current is the start
                if start == (12, 11):
                    print("YOYOYOYOOY: ", current, goal,
                          start, grid[current[0]][current[1]], neighbor)
                if (grid[neighbor[0]][neighbor[1]] == '1' and current == start) or (grid[neighbor[0]][neighbor[1]] == '1' and grid[current[0]][current[1]] != '.'):
                    print("NEIGHBOR: ", neighbor, current,
                          goal, grid[current[0]][current[1]])
                    continue
                tentative_g_score = g_score[current] + 1
                if neighbor not in g_score or tentative_g_score < g_score[neighbor]:
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g_score
                    f_score[neighbor] = tentative_g_score + \
                        heuristic(neighbor, goal)
                    if first_move_after_collect and grid[neighbor[0]][neighbor[1]] == '.':
                        f_score[neighbor] -= 10  # prioritize empty spaces
                    heapq.heappush(open_set, (f_score[neighbor], neighbor))
        first_move_after_collect = False  # Reset the flag after the first move
    return []


def collect_items(start, items, grid):
    path = []
    current_position = start
    items = list(sorted(items, key=lambda item: heuristic(start, item)))

    collected_items = []

    for item in items:
        if item in collected_items:
            continue

        path_segment = None

        print(grid[current_position[0]][current_position[1]])

        # if grid[current_position[0]][current_position[1]] == '#':
        #     grid[current_position[0]][current_position[1]] = '1'
        #     path_segment = a_star(current_position, item,
        #                           grid, just_collected=bool(path))
        #     grid[current_position[0]][current_position[1]] = '#'
        # else:
        path_segment = a_star(current_position, item,
                              grid, just_collected=bool(path))

        print("PATH SEGMENT: ", path_segment)
        # fill arr with path values

        for p in path_segment:
            if p in items or grid[p[0]][p[1]] == '1':
                #         grid[p[0]][p[1]] = '#'
                collected_items.append(p)
                print("COLLECTED: ", p)
                print(grid[p[0]][p[1]])

        arr = []
        for a in path_segment:
            arr.append(grid[a[0]][a[1]])

        print("ARR: ", arr)

        if path_segment:
            # Exclude the last position to avoid repetition
            path.extend(path_segment)
            path.append(item)  # Collect the item
            current_position = item
        else:
            return []
    return path


# Define the start, end, and items positions
start = (0, 0)
end = (9, 9)
items = [(2, 3), (4, 4), (4, 7), (2, 4)]


def get_path(start, end, items, arr):
    full_path = collect_items(start, items, arr)
    if full_path:
        end_path = a_star(full_path[-1], end, arr)
        if end_path:
            # Avoid repetition of the last position
            full_path.extend(end_path[1:])
        else:
            print("No path found to the end position.")
    else:
        print("No path found to collect all items.")

    # Remove consecutive duplicates
    cleaned_path = [full_path[0]]
    for i in range(1, len(full_path)):
        if full_path[i] != full_path[i - 1]:
            cleaned_path.append(full_path[i])

    # # Print the path
    # print("Path:")
    # for step in cleaned_path:
    #     print(step)

    cleaned_path = [(x[0], x[1], x in items) for x in cleaned_path]

    return cleaned_path
