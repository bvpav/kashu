import heapq


def print_grid(map):
    for i in range(9, -1, -1):
        for j in range(10):
            print(map[i][j], end=' ')
        print()


def is_valid_move(x, y, grid, just_collected=False):
    if 0 <= x < len(grid) and 0 <= y < len(grid[0]) and grid[x][y] not in ('X', 'B', 'A'):
        if just_collected and grid[x][y] == '1':
            return False
        return True
    return False


def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def a_star(start, goal, grid, just_collected=False):
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
                if (grid[neighbor[0]][neighbor[1]] == '1' and current == start) or \
                   (grid[neighbor[0]][neighbor[1]] == '1' and grid[current[0]][current[1]] != '.'):
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
    items = sorted(items, key=lambda item: heuristic(start, item))

    collected_items = set()

    for item in items:
        if item in collected_items:
            continue

        path_segment = a_star(current_position, item,
                              grid, just_collected=bool(path))

        if not path_segment:
            return []

        for p in path_segment:
            if p in items or grid[p[0]][p[1]] == '1':
                collected_items.add(p)

        if path_segment:
            # Exclude the last position to avoid repetition
            path.extend(path_segment[:-1])
            path.append(item)  # Collect the item
            current_position = item

    return path


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

    # Add a flag indicating if the position is an item
    cleaned_path = [(x[0], x[1], x in items) for x in cleaned_path]

    return cleaned_path
